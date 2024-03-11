// Importar módulos necessários
const basePath = process.cwd();
const fs = require("fs");
const layersDir = `${basePath}/layers`;

// Importar configurações do arquivo de configuração
const { layerConfigurations } = require(`${basePath}/src/config.js`);
const { getElements } = require("../src/main.js");

// Ler dados do arquivo JSON de metadados
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
let data = JSON.parse(rawdata);
let editionSize = data.length;

let rarityData = [];

// Inicializar camadas para o gráfico
layerConfigurations.forEach((config) => {
  let layers = config.layersOrder;

  layers.forEach((layer) => {
    // Obter elementos para cada camada
    let elementsForLayer = [];
    let elements = getElements(`${layersDir}/${layer.name}/`);
    elements.forEach((element) => {
      // Obter apenas nome e peso para cada elemento
      let rarityDataElement = {
        trait: element.name,
        weight: element.weight.toFixed(0),
        occurrence: 0, // Inicializar em 0
      };
      elementsForLayer.push(rarityDataElement);
    });
    let layerName =
      layer.options?.["displayName"] != undefined
        ? layer.options?.["displayName"]
        : layer.name;
    // Não incluir camadas duplicadas
    if (!rarityData.includes(layer.name)) {
      // Adicionar elementos para cada camada ao gráfico
      rarityData[layerName] = elementsForLayer;
    }
  });
});

// Preencher o gráfico de raridade com ocorrências dos metadados
data.forEach((element) => {
  let attributes = element.attributes;
  attributes.forEach((attribute) => {
    let traitType = attribute.trait_type;
    let value = attribute.value;

    let rarityDataTraits = rarityData[traitType];
    rarityDataTraits.forEach((rarityDataTrait) => {
      if (rarityDataTrait.trait == value) {
        // Manter o controle das ocorrências
        rarityDataTrait.occurrence++;
      }
    });
  });
});

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
  for (var trait in rarityData[layer]) {
    console.log(rarityData[layer][trait]);
  }
  console.log();
}

// Este script analisa os metadados de um projeto e gera dados de raridade com base nos atributos presentes nos metadados. 
// Ele considera as configurações de camadas do projeto e conta as ocorrências de cada traço em relação
// ao número total de edições, exibindo as informações formatadas no console.