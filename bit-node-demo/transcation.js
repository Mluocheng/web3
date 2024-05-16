/**
 * 创建交易
 * 签名交易
 * 1btc =  100000000 satoshis
 * 获取完整交易二进制数据 包含hex  https://api.blockcypher.com/v1/btc/test3/txs/16744c1744bbece39189b78080c7746ef97138a8e7a449209526c9597a3ff0d5?includeHex=true
 * */
const bitcoin = require('bitcoinjs-lib')
const tinysecp256k1 = require('tiny-secp256k1')
const { Psbt } = bitcoin
const ECPairFactory = require('ecpair').default
const ecc = require('tiny-secp256k1')

// const ECPair = ECPairFactory(tinysecp256k1)
const TestNet = bitcoin.networks.testnet

const ECPair = ECPairFactory(ecc)
// 确保使用tiny-secp256k1库注册ECDSA方法
const psbt = new Psbt({
  network: TestNet,
  validateSignatures: true, // 需要设置 validateSignatures 为 true
  ecPairOptions: { network: TestNet },
})

const validator = (pubkey, msghash, signature) =>
  ECPair.fromPublicKey(pubkey).verify(msghash, signature)

// 创建事务
function createTransaction(keyPair1) {
  const amountWeHave = 12882 // satoshis
  const amountToKeep = 10000 // satoshis
  const transactionFee = 1000 // satoshis
  const amountToSend = amountWeHave - amountToKeep - transactionFee
  // UTXO Transaction 的 HEX 来自区块链浏览器或你的钱包软件
  const utxoTransactionHex =
    '02000000000101992419dbf8f0e2160af72fb80b1f662d128a25cbe265c5eb9e7111d81e29e1d20100000000fdffffff0252320000000000001976a914ce85e6d03d9fb37c06a465fa4635dabb3269f29888ac1192d81c000000001976a914667c55a640f4a95f89b1d858b42ddd37107a7db388ac0140d89f42e6e3d8077ba92460d4f293852b8bfb76bfa0a94d060b3a6ccfad77d37c2b242e8cced42d64c2d273ace346ba3a9a23e5e16dc4020850432c6d7114eae6c6ed2a00'

  psbt.addInput({
    hash: '16744c1744bbece39189b78080c7746ef97138a8e7a449209526c9597a3ff0d5',
    index: 0,
    nonWitnessUtxo: Buffer.from(utxoTransactionHex, 'hex'),
  })
  const address1 = 'mprrAY9xz1suTKzZswNhaZ9ycW32R1VRLc' // 接收地址
  psbt.addOutput({
    address: address1,
    value: amountToSend,
  })

  //   const address2 = "mzLwuDcxSfsqbnyuwKfSqLk7TGfUz6niyw"; // 找零地址
  const address2 = bitcoin.payments.p2pkh({
    pubkey: keyPair1.publicKey,
    network: TestNet,
  }).address
  console.log('address2: ', address2)
  psbt.addOutput({
    address: address2,
    value: amountToKeep,
  })

  psbt.signInput(0, keyPair1) // 验签

  // Here we could repeat the signing process for other inputs when necessary
  psbt.validateSignaturesOfAllInputs(validator)
  psbt.finalizeAllInputs()

  const txHex = psbt.extractTransaction().toHex()
  return txHex
}

const keyPair1 = ECPair.fromWIF(
  'cNPuUauaQ162terQAyKQLiAurhR4haSLB95YXejUaRwvPh3Q9MBX',
  TestNet
) // 将备份的WIF导入为ECPair对象
const transactionHex = createTransaction(keyPair1) // 使用已导入的keyPair签名

console.log('Our beautiful transaction:', transactionHex)

// 0200000001d5f03f7a59c926952049a4e7a83871f96e74c78080b78991e3ecbb44174c7416000000006a473044022033b930fa91fc0dbd358dff4454b8f49102c5774d2b63707b7b5eb4cfa5d543a00220330ef510a7e2b4f1b4aaa4b1288c1ee5c7305449dea236e1c75858904d1da21f0121024800d32d2676c7f4b9fedf0677afebeffbe5cf8621e423c1391491ffc9530223ffffffff025a070000000000001976a914667c55a640f4a95f89b1d858b42ddd37107a7db388ac10270000000000001976a914ce85e6d03d9fb37c06a465fa4635dabb3269f29888ac00000000




