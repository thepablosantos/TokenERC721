<<<<<<< HEAD
// Obtém o diretório base do projeto
const basePath = process.cwd();

// Importa constantes relacionadas à rede (eth ou sol)
const { NETWORK } = require(`${basePath}/constants/network.js`);

// Importa módulos do sistema de arquivos e criptografia SHA-1
const fs = require("fs");
const sha1 = require(`${basePath}/node_modules/sha1`);

// Importa funcionalidades relacionadas ao desenho em canvas
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`);

// Define diretórios de construção e camadas
const buildDir = `${basePath}/build`;
const layersDir = `${basePath}/layers`;

// Importa configurações do arquivo de configuração
const {
=======
// Importação de módulos e definição de caminhos
const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs = require("fs");
const sha1 = require(`${basePath}/node_modules/sha1`);
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`);
const buildDir = `${basePath}/build`;
const layersDir = `${basePath}/layers`;
const {
  // Importação de configurações
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
} = require(`${basePath}/src/config.js`);
<<<<<<< HEAD

// Cria o canvas para desenhar
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = format.smoothing;

// Inicializa listas de metadados, atributos e DNA
var metadataList = [];
var attributesList = [];
var dnaList = new Set();

// Delimitador para o DNA
const DNA_DELIMITER = "-";

// Importa a classe HashlipsGiffer
const HashlipsGiffer = require(`${basePath}/modules/HashlipsGiffer.js`);

// Inicializa o objeto HashlipsGiffer
let hashlipsGiffer = null;

// Configuração inicial do diretório de construção
const buildSetup = () => {
=======
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = format.smoothing;
var metadataList = [];
var attributesList = [];
var dnaList = new Set();
const DNA_DELIMITER = "-";
const HashlipsGiffer = require(`${basePath}/modules/HashlipsGiffer.js`);

let hashlipsGiffer = null;

// Configuração inicial da construção
const buildSetup = () => {
  // Remover diretório de construção se existir
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/json`);
  fs.mkdirSync(`${buildDir}/images`);
  if (gif.export) {
    fs.mkdirSync(`${buildDir}/gifs`);
  }
};

<<<<<<< HEAD
// Obtém o peso de raridade de um elemento a partir do nome do arquivo
=======
// Função auxiliar para obter o peso de raridade a partir do nome do arquivo
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const getRarityWeight = (_str) => {
  let nameWithoutExtension = _str.slice(0, -4);
  var nameWithoutWeight = Number(
    nameWithoutExtension.split(rarityDelimiter).pop()
  );
  if (isNaN(nameWithoutWeight)) {
    nameWithoutWeight = 1;
  }
  return nameWithoutWeight;
};

<<<<<<< HEAD
// Limpa o DNA de um elemento removendo opções e retornando apenas o valor numérico
=======
// Função para limpar o DNA de opções
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const cleanDna = (_str) => {
  const withoutOptions = removeQueryStrings(_str);
  var dna = Number(withoutOptions.split(":").shift());
  return dna;
};

<<<<<<< HEAD
// Limpa o nome de um elemento removendo o peso de raridade
=======
// Função para limpar o nome do arquivo de opções de raridade
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const cleanName = (_str) => {
  let nameWithoutExtension = _str.slice(0, -4);
  var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
  return nameWithoutWeight;
};

<<<<<<< HEAD
// Obtém elementos de um diretório
=======
// Obter elementos de um diretório
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const getElements = (path) => {
  return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      return {
        id: index,
        name: cleanName(i),
        filename: i,
        path: `${path}${i}`,
        weight: getRarityWeight(i),
      };
    });
};

<<<<<<< HEAD
// Configuração das camadas com base na ordem fornecida
=======
// Configuração das camadas
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const layersSetup = (layersOrder) => {
  const layers = layersOrder.map((layerObj, index) => ({
    id: index,
    elements: getElements(`${layersDir}/${layerObj.name}/`),
    name:
      layerObj.options?.["displayName"] != undefined
        ? layerObj.options?.["displayName"]
        : layerObj.name,
    blend:
      layerObj.options?.["blend"] != undefined
        ? layerObj.options?.["blend"]
        : "source-over",
    opacity:
      layerObj.options?.["opacity"] != undefined
        ? layerObj.options?.["opacity"]
        : 1,
    bypassDNA:
      layerObj.options?.["bypassDNA"] !== undefined
        ? layerObj.options?.["bypassDNA"]
        : false,
  }));
  return layers;
};

<<<<<<< HEAD
// Salva a imagem gerada no diretório de construção
=======
// Salvar imagem gerada
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const saveImage = (_editionCount) => {
  fs.writeFileSync(
    `${buildDir}/images/${_editionCount}.png`,
    canvas.toBuffer("image/png")
  );
};

<<<<<<< HEAD
// Gera uma cor de fundo com base nas configurações
=======
// Gerar cor para o fundo
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const genColor = () => {
  let hue = Math.floor(Math.random() * 360);
  let pastel = `hsl(${hue}, 100%, ${background.brightness})`;
  return pastel;
};

<<<<<<< HEAD
// Desenha o fundo no canvas
=======
// Desenhar fundo
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const drawBackground = () => {
  ctx.fillStyle = background.static ? background.default : genColor();
  ctx.fillRect(0, 0, format.width, format.height);
};

<<<<<<< HEAD
// Adiciona metadados ao array de metadados
=======
// Adicionar metadados
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const addMetadata = (_dna, _edition) => {
  let dateTime = Date.now();
  let tempMetadata = {
    name: `${namePrefix} #${_edition}`,
    description: description,
    image: `${baseUri}/${_edition}.png`,
    dna: sha1(_dna),
    edition: _edition,
    date: dateTime,
    ...extraMetadata,
    attributes: attributesList,
<<<<<<< HEAD
    compiler: "",
  };
  if (network == NETWORK.sol) {
    tempMetadata = {
      name: tempMetadata.name,
      symbol: solanaMetadata.symbol,
      description: tempMetadata.description,
      seller_fee_basis_points: solanaMetadata.seller_fee_basis_points,
      image: `image.png`,
=======
    compiler: "HashLips Art Engine",
  };
  if (network == NETWORK.sol) {
    tempMetadata = {
      // Adicionando metadados para Solana
      name: tempMetadata.name,
      symbol: solanaMetadata.symbol,
      description: tempMetadata.description,
      // Adicionando metadados para Solana
      seller_fee_basis_points: solanaMetadata.seller_fee_basis_points,
      image: `image.png`,
      // Adicionando metadados para Solana
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
      external_url: solanaMetadata.external_url,
      edition: _edition,
      ...extraMetadata,
      attributes: tempMetadata.attributes,
      properties: {
        files: [
          {
            uri: "image.png",
            type: "image/png",
          },
        ],
        category: "image",
        creators: solanaMetadata.creators,
      },
    };
  }
  metadataList.push(tempMetadata);
  attributesList = [];
};

<<<<<<< HEAD
// Adiciona atributos ao array de atributos
=======
// Adicionar atributos
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const addAttributes = (_element) => {
  let selectedElement = _element.layer.selectedElement;
  attributesList.push({
    trait_type: _element.layer.name,
    value: selectedElement.name,
  });
};

<<<<<<< HEAD
// Carrega uma imagem de camada de forma assíncrona
=======
// Carregar imagem da camada
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const loadLayerImg = async (_layer) => {
  return new Promise(async (resolve) => {
    const image = await loadImage(`${_layer.selectedElement.path}`);
    resolve({ layer: _layer, loadedImage: image });
  });
};

<<<<<<< HEAD
// Adiciona texto ao canvas ou desenha a imagem da camada
=======
// Adicionar texto à imagem
const addText = (_sig, x, y, size) => {
  ctx.fillStyle = text.color;
  ctx.font = `${text.weight} ${size}pt ${text.family}`;
  ctx.textBaseline = text.baseline;
  ctx.textAlign = text.align;
  ctx.fillText(_sig, x, y);
};

// Desenhar elemento na imagem
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const drawElement = (_renderObject, _index, _layersLen) => {
  ctx.globalAlpha = _renderObject.layer.opacity;
  ctx.globalCompositeOperation = _renderObject.layer.blend;
  text.only
    ? addText(
        `${_renderObject.layer.name}${text.spacer}${_renderObject.layer.selectedElement.name}`,
        text.xGap,
        text.yGap * (_index + 1),
        text.size
      )
    : ctx.drawImage(
        _renderObject.loadedImage,
        0,
        0,
        format.width,
        format.height
      );

  addAttributes(_renderObject);
};

<<<<<<< HEAD
// Mapeia o DNA para as camadas e elementos correspondentes
=======
// Construir mapeamento de DNA para camadas
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const constructLayerToDna = (_dna = "", _layers = []) => {
  let mappedDnaToLayers = _layers.map((layer, index) => {
    let selectedElement = layer.elements.find(
      (e) => e.id == cleanDna(_dna.split(DNA_DELIMITER)[index])
    );
    return {
      name: layer.name,
      blend: layer.blend,
      opacity: layer.opacity,
      selectedElement: selectedElement,
    };
  });
  return mappedDnaToLayers;
};

<<<<<<< HEAD
// Filtra opções do DNA, removendo aquelas que não devem ser armazenadas
=======
/**
 * Em alguns casos, uma string de DNA pode conter parâmetros de consulta opcionais
 * para opções como ignorar a verificação de DNA único. Essa função filtra esses
 * itens sem modificar o DNA armazenado.
 *
 * @param {String} _dna Nova string de DNA
 * @returns Nova string de DNA com itens que devem ser filtrados, removidos.
 */
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const filterDNAOptions = (_dna) => {
  const dnaItems = _dna.split(DNA_DELIMITER);
  const filteredDNA = dnaItems.filter((element) => {
    const query = /(\?.*$)/;
    const querystring = query.exec(element);
    if (!querystring) {
      return true;
    }
    const options = querystring[1].split("&").reduce((r, setting) => {
      const keyPairs = setting.split("=");
      return { ...r, [keyPairs[0]]: keyPairs[1] };
    }, []);

    return options.bypassDNA;
  });

  return filteredDNA.join(DNA_DELIMITER);
};

<<<<<<< HEAD
// Remove parâmetros de consulta de um DNA
=======
/**
 * Função de limpeza para strings de DNA. Quando as strings de DNA incluem uma opção,
 * ela é adicionada ao nome do arquivo com uma string de consulta ?setting=value. É
 * necessário removê-la para acessar corretamente o nome do arquivo antes do desenho.
 *
 * @param {String} _dna A string newDNA completa
 * @returns String de DNA limpa sem parâmetros de string de consulta.
 */
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const removeQueryStrings = (_dna) => {
  const query = /(\?.*$)/;
  return _dna.replace(query, "");
};

<<<<<<< HEAD
// Verifica se o DNA é único na lista fornecida
const isDnaUnique = (_DnaList = new Set(), _dna = "") => {
  return true; // Implemente a lógica para verificar a unicidade do DNA
};

// Cria um novo DNA com base nas camadas fornecidas
=======
// Verificar se o DNA é único
const isDnaUnique = (_DnaList = new Set(), _dna = "") => {
  const _filteredDNA = filterDNAOptions(_dna);
  return !_DnaList.has(_filteredDNA);
};

// Criar uma string de DNA
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const createDna = (_layers) => {
  let randNum = [];
  _layers.forEach((layer) => {
    var totalWeight = 0;
    layer.elements.forEach((element) => {
      totalWeight += element.weight;
    });
<<<<<<< HEAD
    let random = Math.floor(Math.random() * totalWeight);
    for (var i = 0; i < layer.elements.length; i++) {
=======
    // número entre 0 - totalWeight
    let random = Math.floor(Math.random() * totalWeight);
    for (var i = 0; i < layer.elements.length; i++) {
      // subtrair o peso atual do peso aleatório até atingir um valor abaixo de zero.
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
      random -= layer.elements[i].weight;
      if (random < 0) {
        return randNum.push(
          `${layer.elements[i].id}:${layer.elements[i].filename}${
            layer.bypassDNA ? "?bypassDNA=true" : ""
          }`
        );
      }
    }
  });
  return randNum.join(DNA_DELIMITER);
};

<<<<<<< HEAD
// Escreve os metadados em um arquivo JSON
=======
// Escrever metadados
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const writeMetaData = (_data) => {
  fs.writeFileSync(`${buildDir}/json/_metadata.json`, _data);
};

<<<<<<< HEAD
// Salva os metadados para uma edição específica em um arquivo JSON
=======
// Salvar metadados em um único arquivo
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const saveMetaDataSingleFile = (_editionCount) => {
  let metadata = metadataList.find((meta) => meta.edition == _editionCount);
  debugLogs
    ? console.log(
<<<<<<< HEAD
        `Writing metadata for ${_editionCount}: ${JSON.stringify(metadata)}`
=======
        `Escrevendo metadados para ${_editionCount}: ${JSON.stringify(metadata)}`
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
      )
    : null;
  fs.writeFileSync(
    `${buildDir}/json/${_editionCount}.json`,
    JSON.stringify(metadata, null, 2)
  );
};

<<<<<<< HEAD
// Função de embaralhamento de um array
=======
// Função para embaralhar um array
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

<<<<<<< HEAD
// Inicia o processo de criação das edições
=======
// Iniciar o processo de criação
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const startCreating = async () => {
  let layerConfigIndex = 0;
  let editionCount = 1;
  let failedCount = 0;
  let abstractedIndexes = [];
<<<<<<< HEAD

  // Preenche o array de índices abstratos
=======
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
  for (
    let i = network == NETWORK.sol ? 0 : 1;
    i <= layerConfigurations[layerConfigurations.length - 1].growEditionSizeTo;
    i++
  ) {
    abstractedIndexes.push(i);
  }
<<<<<<< HEAD

  // Embaralha os índices, se necessário
  if (shuffleLayerConfigurations) {
    abstractedIndexes = shuffle(abstractedIndexes);
  }

  debugLogs
    ? console.log("Editions left to create: ", abstractedIndexes)
    : null;

  // Itera sobre as configurações de camadas
=======
  if (shuffleLayerConfigurations) {
    abstractedIndexes = shuffle(abstractedIndexes);
  }
  debugLogs
    ? console.log("Edições restantes para criar: ", abstractedIndexes)
    : null;
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
  while (layerConfigIndex < layerConfigurations.length) {
    const layers = layersSetup(
      layerConfigurations[layerConfigIndex].layersOrder
    );
<<<<<<< HEAD

    // Itera sobre o número total de edições a serem criadas
=======
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
    while (
      editionCount <= layerConfigurations[layerConfigIndex].growEditionSizeTo
    ) {
      let newDna = createDna(layers);
<<<<<<< HEAD

      // Verifica se o DNA é único
=======
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
      if (isDnaUnique(dnaList, newDna)) {
        let results = constructLayerToDna(newDna, layers);
        let loadedElements = [];

<<<<<<< HEAD
        // Carrega as imagens assincronamente
=======
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
        results.forEach((layer) => {
          loadedElements.push(loadLayerImg(layer));
        });

<<<<<<< HEAD
        // Aguarda o carregamento de todas as imagens
        await Promise.all(loadedElements).then((renderObjectArray) => {
          debugLogs ? console.log("Clearing canvas") : null;
          ctx.clearRect(0, 0, format.width, format.height);

          // Inicia a criação de um GIF, se necessário
=======
        await Promise.all(loadedElements).then((renderObjectArray) => {
          debugLogs ? console.log("Limpando canvas") : null;
          ctx.clearRect(0, 0, format.width, format.height);
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
          if (gif.export) {
            hashlipsGiffer = new HashlipsGiffer(
              canvas,
              ctx,
              `${buildDir}/gifs/${abstractedIndexes[0]}.gif`,
              gif.repeat,
              gif.quality,
              gif.delay
            );
            hashlipsGiffer.start();
          }
<<<<<<< HEAD

          // Desenha o fundo, se necessário
          if (background.generate) {
            drawBackground();
          }

          // Desenha os elementos na ordem especificada
=======
          if (background.generate) {
            drawBackground();
          }
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
          renderObjectArray.forEach((renderObject, index) => {
            drawElement(
              renderObject,
              index,
              layerConfigurations[layerConfigIndex].layersOrder.length
            );
<<<<<<< HEAD

            // Adiciona ao GIF, se necessário
=======
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
            if (gif.export) {
              hashlipsGiffer.add();
            }
          });
<<<<<<< HEAD

          // Para o GIF, se necessário
          if (gif.export) {
            hashlipsGiffer.stop();
          }

          debugLogs
            ? console.log("Editions left to create: ", abstractedIndexes)
            : null;

          // Salva a imagem gerada
          saveImage(abstractedIndexes[0]);

          // Adiciona metadados e salva em um arquivo JSON
          addMetadata(newDna, abstractedIndexes[0]);
          saveMetaDataSingleFile(abstractedIndexes[0]);

          console.log(
            `Created edition: ${abstractedIndexes[0]}, with DNA: ${sha1(
=======
          if (gif.export) {
            hashlipsGiffer.stop();
          }
          debugLogs
            ? console.log("Edições restantes para criar: ", abstractedIndexes)
            : null;
          saveImage(abstractedIndexes[0]);
          addMetadata(newDna, abstractedIndexes[0]);
          saveMetaDataSingleFile(abstractedIndexes[0]);
          console.log(
            `Edição criada: ${abstractedIndexes[0]}, com DNA: ${sha1(
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
              newDna
            )}`
          );
        });
<<<<<<< HEAD

        // Adiciona o DNA à lista
=======
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
        dnaList.add(filterDNAOptions(newDna));
        editionCount++;
        abstractedIndexes.shift();
      } else {
<<<<<<< HEAD
        console.log("DNA exists!");
        failedCount++;

        // Sai se o limite de falhas for atingido
        if (failedCount >= uniqueDnaTorrance) {
          console.log(
            `You need more layers or elements to grow your edition to ${layerConfigurations[layerConfigIndex].growEditionSizeTo} artworks!`
=======
        console.log("DNA já existe!");
        failedCount++;
        if (failedCount >= uniqueDnaTorrance) {
          console.log(
            `Você precisa de mais camadas ou elementos para aumentar sua edição para ${layerConfigurations[layerConfigIndex].growEditionSizeTo} obras de arte!`
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
          );
          process.exit();
        }
      }
    }
<<<<<<< HEAD

    // Move para a próxima configuração de camadas
    layerConfigIndex++;
  }

  // Escreve os metadados finais em um arquivo JSON
  writeMetaData(JSON.stringify(metadataList, null, 2));
};

// Exporta as funções necessárias para outros módulos
=======
    layerConfigIndex++;
  }
  writeMetaData(JSON.stringify(metadataList, null, 2));
};

>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
module.exports = { startCreating, buildSetup, getElements };
