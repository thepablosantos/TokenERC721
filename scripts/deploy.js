const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {
  // Certifique-se de que você está interagindo com a rede de teste da Optimism
  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);
  const [signer] = await ethers.getSigners();
  const network = await provider.getNetwork();

  if (network.name !== "optimism") {
    throw new Error("Este script deve ser executado na rede de teste da Optimism (optimistic-kovan).");
  }

  // Carregue os contratos e outros artefatos
  const ContractBank = await ethers.getContractFactory("ContractBank");
  
  // Passando o endereço do signer como o initialOwner
  const contractBank = await ContractBank.connect(signer).deploy(signer.address);
  await contractBank.deployed();

  console.log("Contrato implantado em:", contractBank.address);
}

// Execute a função main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
