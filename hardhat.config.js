// hardhat.config.js
const { alchemyApiKey, privateKey } = require("./secrets.json");

module.exports = {
  solidity: {
    version: "0.8.19", // Versão do compilador Solidity
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    optimism: {
      url: "https://opt-sepolia.g.alchemy.com/v2/1wF1Zh-xn_MWvt6b1Vuqrb5cL0-VunsZ",
      accounts: [privateKey],
    },
  },
  
  etherscan: {
    apiKey: alchemyApiKey, // Chave da API Etherscan (opcional, se necessário)
  },
  paths: {
    artifacts: "./build/artifacts", 
    sources: "./contracts", // Caminho para a pasta de contratos
  },
};
