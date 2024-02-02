require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

//eth-sepolia url
const URL =
  "https://eth-sepolia.g.alchemy.com/v2/0rB3wMRxU-UjADpRz6S2xyChrSry8Bkr";

// wallet private key (SepoliaETH private key:)
const KEY = "5d02339091a47c8399e8382b951213f3727d8ce6fc61d0ce3c64ff778dceb556";

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: URL,
      accounts: [`0x${KEY}`],
    },
  },
};
