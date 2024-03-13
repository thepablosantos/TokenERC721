<<<<<<< HEAD
// Módulo para manipulação de arquivos e caminhos
=======
// Importar módulos necessários
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs = require("fs");

<<<<<<< HEAD
// Importação de configurações do arquivo config.js
=======
// Importar configurações do arquivo de configuração
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const {
  baseUri,
  description,
  namePrefix,
  network,
  solanaMetadata,
} = require(`${basePath}/src/config.js`);

<<<<<<< HEAD
// Lê os dados do arquivo _metadata.json
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

// Atualiza os dados de cada item no arquivo de metadados individual e no _metadata.json
data.forEach((item) => {
  if (network == NETWORK.sol) {
=======
// Ler dados do arquivo JSON de metadados
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);

// Iterar sobre cada item nos dados de metadados
data.forEach((item) => {
  // Verificar o tipo de rede para atualizar os dados de acordo
  if (network == NETWORK.sol) {
    // Atualizar campos para Solana
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.creators = solanaMetadata.creators;
  } else {
<<<<<<< HEAD
=======
    // Atualizar campos para outras redes
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
    item.name = `${namePrefix} #${item.edition}`;
    item.description = description;
    item.image = `${baseUri}/${item.edition}.png`;
  }
<<<<<<< HEAD
=======

  // Escrever o arquivo JSON atualizado para cada item
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
  fs.writeFileSync(
    `${basePath}/build/json/${item.edition}.json`,
    JSON.stringify(item, null, 2)
  );
});

<<<<<<< HEAD
=======
// Escrever o arquivo JSON principal atualizado
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
fs.writeFileSync(
  `${basePath}/build/json/_metadata.json`,
  JSON.stringify(data, null, 2)
);

<<<<<<< HEAD
// Exibe mensagens indicando as atualizações nas configurações
if (network == NETWORK.sol) {
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);
  console.log(
    `Updated creators for images to ===> ${JSON.stringify(
=======
// Exibir mensagens de atualização com base no tipo de rede
if (network == NETWORK.sol) {
  console.log(`Descrição atualizada para as imagens ===> ${description}`);
  console.log(`Prefixo de nome atualizado para as imagens ===> ${namePrefix}`);
  console.log(
    `Criadores atualizados para as imagens ===> ${JSON.stringify(
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
      solanaMetadata.creators
    )}`
  );
} else {
<<<<<<< HEAD
  console.log(`Updated baseUri for images to ===> ${baseUri}`);
  console.log(`Updated description for images to ===> ${description}`);
  console.log(`Updated name prefix for images to ===> ${namePrefix}`);
}
=======
  console.log(`baseUri atualizado para as imagens ===> ${baseUri}`);
  console.log(`Descrição atualizada para as imagens ===> ${description}`);
  console.log(`Prefixo de nome atualizado para as imagens ===> ${namePrefix}`);
}

// Este script lê os dados de metadados de um projeto e atualiza os campos relevantes com base no tipo de rede (Solana ou outra). 
// Ele também exibe mensagens informativas no console sobre as atualizações realizadas..
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
