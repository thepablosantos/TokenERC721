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
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
let editionSize = data.length;

let rarityData = [];

// Inicializa as camadas no gráfico
layerConfigurations.forEach((config) => {
  let layers = config.layersOrder;

  layers.forEach((layer) => {
    // Obtém elementos para cada camada
    let elementsForLayer = [];
    let elements = getElements(`${layersDir}/${layer.name}/`);
    elements.forEach((element) => {
      // Obtém apenas nome e peso de cada elemento
      let rarityDataElement = {
        trait: element.name,
        weight: element.weight.toFixed(0),
        occurrence: 0, // inicializa em 0
      };
      elementsForLayer.push(rarityDataElement);
    });
    let layerName =
      layer.options?.["displayName"] != undefined
        ? layer.options?.["displayName"]
        : layer.name;
    // Não inclui camadas duplicadas
    if (!rarityData.includes(layer.name)) {
      // Adiciona elementos para cada camada ao gráfico
      rarityData[layerName] = elementsForLayer;
    }
  });
});

// Preenche o gráfico de raridade com ocorrências dos metadados
data.forEach((element) => {
  let attributes = element.attributes;
  attributes.forEach((attribute) => {
    let traitType = attribute.trait_type;
    let value = attribute.value;

    let rarityDataTraits = rarityData[traitType];
    rarityDataTraits.forEach((rarityDataTrait) => {
      if (rarityDataTrait.trait == value) {
        // Acompanha as ocorrências
        rarityDataTrait.occurrence++;
      }
    });
  });
});

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
  for (var trait in rarityData[layer]) {
    console.log(rarityData[layer][trait]);
  }
  console.log();
}
