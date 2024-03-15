// hardhat.config.js
require('dotenv').config();

module.exports = {
  solidity: {
    version: "0.8.20", // Versão do compilador Solidity
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    optimism: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  
  etherscan: {
    apiKey: process.env.ALCHEMY_API_KEY|| "", // Chave da API Etherscan (opcional, se necessário)
  },
  paths: {
    artifacts: "./build/artifacts", 
    sources: "./contracts", // Caminho para a pasta de contratos
  },
};
