const { ethers } = require("hardhat");

async function main() {
  // Certifique-se de que você está interagindo com a rede de teste da Optimism
  const provider = new ethers.providers.JsonRpcProvider("https://opt-sepolia.g.alchemy.com/v2/1wF1Zh-xn_MWvt6b1Vuqrb5cL0-VunsZ");
  const [signer] = await ethers.getSigners();
  const network = await provider.getNetwork();

  if (network.name !== "optimism") {
    throw new Error("Este script deve ser executado na rede de teste da Optimism (optimistic-kovan).");
  }

  // Carregue os contratos e outros artefatos
  const ContractBank = await ethers.getContractFactory("ContractBank");
  
  // Deploy do contrato
  const contractBank = await ContractBank.connect(signer).deploy();
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
