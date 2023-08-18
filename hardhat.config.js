require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: process.env.ALCHEMY_MATIC_URL,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 35000000000,
      gas: 2100000,
      saveDeployments: true,
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_KEY
  }
};
