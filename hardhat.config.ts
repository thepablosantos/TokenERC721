import fs from 'fs';
import * as dotenv from 'dotenv';
import { HardhatUserConfig, task } from 'hardhat/config';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import CollectionConfig from './config/CollectionConfig';

dotenv.config();

const DEFAULT_GAS_MULTIPLIER: number = 1;

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Ethereum Mainnet
    mainnet: {
      url: process.env.NETWORK_MAINNET_URL || 'http://localhost:8545', // Substituir pelo URL do seu nó Ethereum principal
      accounts: [process.env.NETWORK_MAINNET_PRIVATE_KEY!],
      gasMultiplier: DEFAULT_GAS_MULTIPLIER,
    },
    // Ethereum Testnet
    ropsten: {
      url: process.env.NETWORK_ROPSTEN_URL || 'http://localhost:8545', // Substituir pelo URL do seu nó Ethereum Testnet (Ropsten)
      accounts: [process.env.NETWORK_ROPSTEN_PRIVATE_KEY!],
      gasMultiplier: DEFAULT_GAS_MULTIPLIER,
    },
    // Solana
    devnet: {
      url: 'https://api.devnet.solana.com',
      accounts: [process.env.SOLANA_DEVNET_PRIVATE_KEY!],
    },
    // Optimism Testnet (Kovan) using Sepolia
    optimismKovanSepolia: {
      url: process.env.NETWORK_OPTIMISM_KOVAN_URL || 'https://optimism-kovan--rpc.datahub.figment.io/apikey/YOUR_OPTIMISM_API_KEY',
      accounts: [process.env.NETWORK_OPTIMISM_KOVAN_PRIVATE_KEY!],
      gasMultiplier: DEFAULT_GAS_MULTIPLIER,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
    coinmarketcap: process.env.GAS_REPORTER_COIN_MARKET_CAP_API_KEY,
  },
  etherscan: {
    apiKey: {
      goerli: process.env.BLOCK_EXPLORER_API_KEY,
      mainnet: process.env.BLOCK_EXPLORER_API_KEY,
      rinkeby: process.env.BLOCK_EXPLORER_API_KEY,
      polygon: process.env.BLOCK_EXPLORER_API_KEY,
      polygonMumbai: process.env.BLOCK_EXPLORER_API_KEY,
    },
  },
};

// Configurações adicionais...

export default config;
