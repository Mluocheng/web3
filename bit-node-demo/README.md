# 比特币测试项目
    
## 项目介绍

该项目是使用bit-node框架搭建的比特币测试项目，该项目包含以下功能：

/**
 * 查询地址详情
 * 包含余额 address  pubkey 等
 * 测试充值地址： https://coinfaucet.eu/en/btc-testnet/
 * 余额 https://api.blockcypher.com/v1/btc/test3/addrs/mvoSHA4eRhRpPRcRjzZxNNrfX8fbKqPhCV/full?limit=50
 * hex https://api.blockcypher.com/v1/btc/test3/txs/b901c0ca75d19853fba17c2965821e6b9761b4230f9c782365d6ed912875bda9?includeHex=true
 * */ 
  
- createAddress 创建地址  
- transcation 创建交易 签名交易
- broadcastTransaction 广播交易

## 项目运行

1. 安装依赖

```bash
pnpm i
```
## 注意
    * WIF编码前缀要分清楚  0x80 主网前缀， 0xEF 测试网前缀
    * transcation 创建交易和签名时要加验证方法validator
    * 广播后才能看到交易