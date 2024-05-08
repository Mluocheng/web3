/**
 * 查询地址详情
 * 包含余额 address  pubkey 等
 * 测试充值地址： https://coinfaucet.eu/en/btc-testnet/
 * 余额 https://api.blockcypher.com/v1/btc/test3/addrs/mvoSHA4eRhRpPRcRjzZxNNrfX8fbKqPhCV/full?limit=50
 * hex https://api.blockcypher.com/v1/btc/test3/txs/b901c0ca75d19853fba17c2965821e6b9761b4230f9c782365d6ed912875bda9?includeHex=true
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