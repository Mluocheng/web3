/**
 * 查询地址详情
 * 包含余额 address  pubkey 等
 * 测试充值地址： https://coinfaucet.eu/en/btc-testnet/
 * 余额 https://live.blockcypher.com/btc-testnet/address/mmJs1C5xf9c4tGbdFgBpkvC2TfCz6PHhQ5/
 * 余额 https://blockstream.info/testnet/address/mmJs1C5xf9c4tGbdFgBpkvC2TfCz6PHhQ5
 * */ 

const request = require('request');
let addr = 'mmJs1C5xf9c4tGbdFgBpkvC2TfCz6PHhQ5'
let apiUrl = 'https://testnet.blockexplorer.com/api/addr/'

// log unspent transactions
request.get(apiUrl + addr + '/utxo', (err, req, body) => {

  console.log('utxo => ', err, req, body)
 }
);
// log balance
request.get(apiUrl + addr + '/balance', (err, req, body) => {
  console.log('balance => ', err,  req, body)
 }
);