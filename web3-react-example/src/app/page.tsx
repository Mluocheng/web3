"use client"

import styles from "./page.module.css";
import Web3, { Numbers } from "web3";
import { abi } from "./abi";
import { useEffect } from "react";

export default function Home() {

  const infuraUrl = "https://mainnet.infura.io/v3/a6e194e3ee6f4c89ad3f092540bff92c" // 主网
  // const infuraUrl = "https://sepolia.infura.io/v3/a6e194e3ee6f4c89ad3f092540bff92c" // 测试网
  const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
  useEffect(() => {
    getBlockNumber()
  }, [web3.eth])

  async function getBlockNumber() {
    const latestBlockNumber = await web3.eth.getBlockNumber()
    console.log("latestBlockNumber: ", latestBlockNumber)
    const latestBlock = await web3.eth.getBlock('latest', false)
    console.log("latestBlock: ", latestBlock)
  }

  async function getBalance() {
    console.log("查询")
    const address = "0x105cb19ba40384a8f2985816DA7883b076969cA7";
    try {
      const wei = await web3.eth.getBalance(address, "latest");
      console.log("余额 wei: ", wei);
      const balance = web3.utils.fromWei(wei, "ether");
      console.log("转换为以太币 balance: ", balance);
    } catch (err) {
      console.error("Error fetching balance: ", err);
    }
  }

  const handleCreate = async () => {
    console.log("线上合约实例")
    const address = "0x105cb19ba40384a8f2985816DA7883b076969cA7";
    const contract = await new web3.eth.Contract(abi, address);
    console.log("contract: ", contract)
    if (contract && contract.methods) {
      try {
        // const name = await contract.methods.name().call()
        console.log(" contract.defaultBlock: ",  contract.defaultBlock)
        console.log(" contract.defaultHardfork : ",  contract.defaultHardfork )
      } catch (error) {
        console.log("error: ", error)
      }

    }
  }

  return (
    <main className={styles.main}>
      <button onClick={getBalance}>查看</button>
      <button onClick={handleCreate}>创建</button>
    </main>
  );
}
