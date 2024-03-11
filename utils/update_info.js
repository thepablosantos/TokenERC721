// Importar módulos necessários
const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs = require("fs");

// Importar configurações do arquivo de configuração
const {
  baseUri,
  description,
  namePrefix,
  network,
  solanaMetadata,
} = require(`${basePath}/src/config.js`);

// Ler dados do arquivo JSON de metadados
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

// Iterar sobre cada item nos dados de metadados
data.forEach((item) => {
  // Verificar o tipo de rede para atualizar os dados de acordo
  if (network == NETWORK.sol) {
    // Atualizar campos para Solana
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.creators = solanaMetadata.creators;
  } else {
    // Atualizar campos para outras redes
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.image = `${baseUri}/${item.edition}.png`;
  }

  // Escrever o arquivo JSON atualizado para cada item
  fs.writeFileSync(
    `${basePath}/build/json/${item.edition}.json`,
    JSON.stringify(item, null, 2)
  );
});

// Escrever o arquivo JSON principal atualizado
fs.writeFileSync(
  `${basePath}/build/json/_metadata.json`,
  JSON.stringify(data, null, 2)
);

// Exibir mensagens de atualização com base no tipo de rede
if (network == NETWORK.sol) {
  console.log(`Descrição atualizada para as imagens ===> ${description}`);
  console.log(`Prefixo de nome atualizado para as imagens ===> ${namePrefix}`);
  console.log(
    `Criadores atualizados para as imagens ===> ${JSON.stringify(
      solanaMetadata.creators
    )}`
  );
} else {
  console.log(`baseUri atualizado para as imagens ===> ${baseUri}`);
  console.log(`Descrição atualizada para as imagens ===> ${description}`);
  console.log(`Prefixo de nome atualizado para as imagens ===> ${namePrefix}`);
}

// Este script lê os dados de metadados de um projeto e atualiza os campos relevantes com base no tipo de rede (Solana ou outra). 
// Ele também exibe mensagens informativas no console sobre as atualizações realizadas..