/**
 * 广播交易 将签名后的交易发送至比特币网络，使矿工可以将其包含进区块链中
 * 确认交易 等待矿工将交易打包进一个新的区块，并且该区块被添加到区块链上。这个过程通常需要一些时间，取决于当前网络的拥堵程度和您支付的交易费
 * */ 

const fetch = require('node-fetch'); // 需要安装 node-fetch 或是使用 node 的内建 http/https 模块

// 创建交易 签名交易 后得到
const transactionHex = "0200000001d5f03f7a59c926952049a4e7a83871f96e74c78080b78991e3ecbb44174c7416000000006a473044022033b930fa91fc0dbd358dff4454b8f49102c5774d2b63707b7b5eb4cfa5d543a00220330ef510a7e2b4f1b4aaa4b1288c1ee5c7305449dea236e1c75858904d1da21f0121024800d32d2676c7f4b9fedf0677afebeffbe5cf8621e423c1391491ffc9530223ffffffff025a070000000000001976a914667c55a640f4a95f89b1d858b42ddd37107a7db388ac10270000000000001976a914ce85e6d03d9fb37c06a465fa4635dabb3269f29888ac00000000";

async function broadcastTransaction(transactionHex) {
  const response = await fetch('https://api.blockcypher.com/v1/btc/test3/txs/push', {
    method: 'POST',
    body: JSON.stringify({ tx: transactionHex }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  if (data.error) {
    console.error('Error broadcasting transaction:', data.error);
  } else {
    console.log('Broadcasted transaction:', data.tx.hash);
    // 0807787f68a64d7ce9ae2fb369f92aa01060e64196b091a2b2d4ffe0ebfc9b90 交易成功
  }
}

// 使用此函数广播你的交易
broadcastTransaction(transactionHex);
