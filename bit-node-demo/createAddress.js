/**
 * 创建地址
*/

const Btc = require('bitcoinjs-lib')
const ecpair=require('ecpair');
const ecc=require('tiny-secp256k1');
const ECPair=ecpair.ECPairFactory(ecc);

// 引入测试链
const TestNet = Btc.networks.testnet;
console.log("TestNet: ", TestNet)
/**
 * 创建比特币地址
 * 每个比特币地址都对应一对密钥（私钥和公钥），因此我们首先用BitcoinJS创建密钥对并从密钥对推导出地址
 * */ 
let keyPair = ECPair.makeRandom({ network: TestNet })

//16进制表示的私钥和公钥
var private_key=keyPair.privateKey.toString('hex');
var public_key=keyPair.publicKey.toString('hex');
console.log('pri_key = '+private_key);
console.log('pub_key = '+public_key);

//WIF编码
const wif=require('wif');
var encoded=wif.encode(TestNet.wif,Buffer.from(private_key,'hex'),true); //* 0x80 主网前缀， 0xEF 测试网前缀
console.log('WIF编码 = '+encoded);

//利用公钥生成地址
const { address }=Btc.payments.p2pkh({pubkey:keyPair.publicKey, network: TestNet });
console.log('address = '+address);


// TestNet:  {
//     messagePrefix: '\x18Bitcoin Signed Message:\n',
//     bech32: 'tb',
//     bip32: { public: 70617039, private: 70615956 },
//     pubKeyHash: 111,
//     scriptHash: 196,
//     wif: 239
//   }
//   pri_key = 184892af951593ee024c5491d5ae990ec41205a7e07e62dec522a49f055c5b19
//   pub_key = 024800d32d2676c7f4b9fedf0677afebeffbe5cf8621e423c1391491ffc9530223
//   WIF编码 = cNPuUauaQ162terQAyKQLiAurhR4haSLB95YXejUaRwvPh3Q9MBX
//   address = mzLwuDcxSfsqbnyuwKfSqLk7TGfUz6niyw
