/**
 * 交易
 * 1btc =  100000000 satoshis
 * 获取完整交易二进制数据 包含hex  https://api.blockcypher.com/v1/btc/test3/txs/28e4304da408611eabe21b4b89b8ef893c00c193ac03b218bea94a0b74f0203f?includeHex=true
 * */
const bitcoin = require('bitcoinjs-lib');
const tinysecp256k1 = require('tiny-secp256k1');
const { Psbt } = bitcoin;
const ECPairFactory = require('ecpair').default;

const ECPair = ECPairFactory(tinysecp256k1);
const TestNet = bitcoin.networks.testnet;

// 创建事务
function createTransaction(keyPair1) {
  const psbt = new Psbt({ network: TestNet , ECPair });

  const amountWeHave = 12882; // satoshis
  const amountToKeep = 10000; // satoshis
  const transactionFee = 1000; // satoshis
  const amountToSend = amountWeHave - amountToKeep - transactionFee;
 // UTXO Transaction 的 HEX 来自区块链浏览器或你的钱包软件
 const utxoTransactionHex = '02000000000101992419dbf8f0e2160af72fb80b1f662d128a25cbe265c5eb9e7111d81e29e1d20100000000fdffffff0252320000000000001976a914ce85e6d03d9fb37c06a465fa4635dabb3269f29888ac1192d81c000000001976a914667c55a640f4a95f89b1d858b42ddd37107a7db388ac0140d89f42e6e3d8077ba92460d4f293852b8bfb76bfa0a94d060b3a6ccfad77d37c2b242e8cced42d64c2d273ace346ba3a9a23e5e16dc4020850432c6d7114eae6c6ed2a00';

  psbt.addInput({
    hash: '16744c1744bbece39189b78080c7746ef97138a8e7a449209526c9597a3ff0d5',
    index: 0,
    nonWitnessUtxo: Buffer.from(utxoTransactionHex, 'hex'),
  });
  const address1 = "mprrAY9xz1suTKzZswNhaZ9ycW32R1VRLc"; // 接收地址
  psbt.addOutput({
    address: address1,
    value: amountToSend,
  });
  
//   const address2 = "mzLwuDcxSfsqbnyuwKfSqLk7TGfUz6niyw"; // 找零地址
  const address2 = bitcoin.payments.p2pkh({ pubkey: keyPair1.publicKey, network: TestNet }).address;
  console.log("address2: ", address2)
  psbt.addOutput({
    address: address2,
    value: amountToKeep,
  });

  psbt.signInput(0, keyPair1);

  // Here we could repeat the signing process for other inputs when necessary
  psbt.validateSignaturesOfAllInputs();
  psbt.finalizeAllInputs();

  const txHex = psbt.extractTransaction().toHex();
  return txHex;
}

const keyPair1 = ECPair.fromWIF("cNPuUauaQ162terQAyKQLiAurhR4haSLB95YXejUaRwvPh3Q9MBX", TestNet); // 将备份的WIF导入为ECPair对象
const transactionHex = createTransaction(keyPair1); // 使用已导入的keyPair签名

console.log('Our beautiful transaction:', transactionHex)

