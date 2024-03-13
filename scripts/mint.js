// scripts/mint.js
const { ethers } = require("hardhat");

async function main() {
  // Certifique-se de que você está interagindo com a rede de teste da Optimism
  const network = await ethers.provider.getNetwork();
  if (network.name !== "optimism") {
    throw new Error("Este script deve ser executado na rede de teste da Optimism (optimistic-kovan).");
  }

  // Carregue os contratos e outros artefatos
  const ContractBank = await ethers.getContractFactory("ContractBank");
  
  // Conecte-se ao contrato implantado
  const contractBankAddress = "COLOQUE_O_ENDERECO_DO_SEU_CONTRATO_AQUI"; // Substitua pelo endereço do seu contrato implantado
  const contractBank = await ContractBank.attach(contractBankAddress);

  // Endereço do destinatário para quem você deseja realizar o minting
  const recipientAddress = "COLOQUE_O_ENDERECO_DO_DESTINATARIO_AQUI"; // Substitua pelo endereço do destinatário

  // Execute o minting
  await contractBank.safeMint(recipientAddress);

  console.log("NFT minted com sucesso!");
}

// Execute a função main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
