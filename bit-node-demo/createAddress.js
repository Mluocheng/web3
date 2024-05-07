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
var encoded=wif.encode(0x80,Buffer.from(private_key,'hex'),false);
console.log('WIF编码 = '+encoded);

//利用公钥生成地址
const { address }=Btc.payments.p2pkh({pubkey:keyPair.publicKey, network: TestNet });
console.log('address = '+address); // mmJs1C5xf9c4tGbdFgBpkvC2TfCz6PHhQ5


