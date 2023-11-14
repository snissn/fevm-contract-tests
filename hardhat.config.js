require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-web3')
require('@nomicfoundation/hardhat-chai-matchers')
require("hardhat-gas-reporter");
require('./tasks');

const defaultNodeUrl = "http://localhost:8545";

module.exports = {
  solidity: "0.8.15",
  defaultNetwork: "local",
  networks: {
    local: {
      url: defaultNodeUrl,
      accounts: [
        process.env.ROOT_PRIVATE_KEY,
        process.env.ACCOUNT1_PRIVATE_KEY || process.env.ROOT_PRIVATE_KEY,
        process.env.ACCOUNT2_PRIVATE_KEY || process.env.ROOT_PRIVATE_KEY,
        process.env.ACCOUNT3_PRIVATE_KEY || process.env.ROOT_PRIVATE_KEY,
        process.env.ACCOUNT4_PRIVATE_KEY || process.env.ROOT_PRIVATE_KEY,
      ],
    },
    hardhat: {
      mining: {
        auto: false,
        interval: 1000,
      },
      accounts: [
        {
          privateKey: process.env.ROOT_PRIVATE_KEY,
          balance: "1000000000000000000",
        },
        {
          privateKey: process.env.ACCOUNT1_PRIVATE_KEY || process.env.ROOT_PRIVATE_KEY,
          balance: "1000000000000000000",
        }
      ],
    },
  },
  gasReporter: {
    enabled: true,
    noColors: true,
    outputFile: './gasreport/gas.txt',
  }
};
