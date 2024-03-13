<<<<<<< HEAD
// Módulo para manipulação de arquivos e caminhos
const basePath = process.cwd();
const fs = require("fs");

// Diretório das camadas
const layersDir = `${basePath}/layers`;

// Importação de configurações do arquivo config.js
const { layerConfigurations } = require(`${basePath}/src/config.js`);

// Importação da função getElements do arquivo main.js
const { getElements } = require("../src/main.js");

// Lê os dados do arquivo _metadata.json
=======
// Importar módulos necessários
const basePath = process.cwd();
const fs = require("fs");
const layersDir = `${basePath}/layers`;

// Importar configurações do arquivo de configuração
const { layerConfigurations } = require(`${basePath}/src/config.js`);
const { getElements } = require("../src/main.js");

// Ler dados do arquivo JSON de metadados
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
let editionSize = data.length;

let rarityData = [];

<<<<<<< HEAD
// Inicializa as camadas no gráfico
=======
// Inicializar camadas para o gráfico
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
layerConfigurations.forEach((config) => {
  let layers = config.layersOrder;

  layers.forEach((layer) => {
<<<<<<< HEAD
    // Obtém elementos para cada camada
    let elementsForLayer = [];
    let elements = getElements(`${layersDir}/${layer.name}/`);
    elements.forEach((element) => {
      // Obtém apenas nome e peso de cada elemento
      let rarityDataElement = {
        trait: element.name,
        weight: element.weight.toFixed(0),
        occurrence: 0, // inicializa em 0
=======
    // Obter elementos para cada camada
    let elementsForLayer = [];
    let elements = getElements(`${layersDir}/${layer.name}/`);
    elements.forEach((element) => {
      // Obter apenas nome e peso para cada elemento
      let rarityDataElement = {
        trait: element.name,
        weight: element.weight.toFixed(0),
        occurrence: 0, // Inicializar em 0
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
      };
      elementsForLayer.push(rarityDataElement);
    });
    let layerName =
      layer.options?.["displayName"] != undefined
        ? layer.options?.["displayName"]
        : layer.name;
<<<<<<< HEAD
    // Não inclui camadas duplicadas
    if (!rarityData.includes(layer.name)) {
      // Adiciona elementos para cada camada ao gráfico
=======
    // Não incluir camadas duplicadas
    if (!rarityData.includes(layer.name)) {
      // Adicionar elementos para cada camada ao gráfico
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
      rarityData[layerName] = elementsForLayer;
    }
  });
});

<<<<<<< HEAD
// Preenche o gráfico de raridade com ocorrências dos metadados
=======
// Preencher o gráfico de raridade com ocorrências dos metadados
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
data.forEach((element) => {
  let attributes = element.attributes;
  attributes.forEach((attribute) => {
    let traitType = attribute.trait_type;
    let value = attribute.value;

    let rarityDataTraits = rarityData[traitType];
    rarityDataTraits.forEach((rarityDataTrait) => {
      if (rarityDataTrait.trait == value) {
<<<<<<< HEAD
        // Acompanha as ocorrências
=======
        // Manter o controle das ocorrências
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
        rarityDataTrait.occurrence++;
      }
    });
  });
});

<<<<<<< HEAD
// Converte ocorrências para string de ocorrência
for (var layer in rarityData) {
  for (var attribute in rarityData[layer]) {
    // Obtém a chance
    let chance =
      ((rarityData[layer][attribute].occurrence / editionSize) * 100).toFixed(2);

    // Mostra duas casas decimais em percentual
    rarityData[layer][attribute].occurrence =
      `${rarityData[layer][attribute].occurrence} in ${editionSize} editions (${chance} %)`;
  }
}

// Imprime os dados de raridade
for (var layer in rarityData) {
  console.log(`Trait type: ${layer}`);
=======
// Converter ocorrências para string de ocorrência
for (var layer in rarityData) {
  for (var attribute in rarityData[layer]) {
    // Obter chance
    let chance =
      ((rarityData[layer][attribute].occurrence / editionSize) * 100).toFixed(2);

    // Mostrar duas casas decimais em percentual
    rarityData[layer][attribute].occurrence =
      `${rarityData[layer][attribute].occurrence} em ${editionSize} edições (${chance} %)`;
  }
}

// Exibir dados de raridade
for (var layer in rarityData) {
  console.log(`Tipo de traço: ${layer}`);
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
  for (var trait in rarityData[layer]) {
    console.log(rarityData[layer][trait]);
  }
  console.log();
}
<<<<<<< HEAD
=======

// Este script analisa os metadados de um projeto e gera dados de raridade com base nos atributos presentes nos metadados. 
// Ele considera as configurações de camadas do projeto e conta as ocorrências de cada traço em relação
// ao número total de edições, exibindo as informações formatadas no console.
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
