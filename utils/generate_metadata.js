// Módulo para manipulação de arquivos e caminhos
const fs = require("fs");
const path = require("path");

// Biblioteca para criação de canvas e carregamento de imagens
const { createCanvas, loadImage } = require("canvas");

// Diretório base do projeto
const basePath = process.cwd();

// Diretórios de saída e entrada
const buildDir = `${basePath}/build/json`;
const inputDir = `${basePath}/build/images`;

// Importação de configurações do arquivo config.js
const {
  format,
  namePrefix,
  description,
  baseUri,
} = require(`${basePath}/src/config.js`);

// Objeto de canvas e contexto
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

// Lista para armazenar metadados
const metadataList = [];

// Função para configuração inicial
const buildSetup = () => {
  // Remove o diretório de saída se existir
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  // Cria diretórios necessários
  fs.mkdirSync(buildDir);
};

// Função para obter imagens de um diretório
const getImages = (_dir) => {
  try {
    return fs
      .readdirSync(_dir)
      .filter((item) => {
        let extension = path.extname(`${_dir}${item}`);
        if (extension == ".png" || extension == ".jpg") {
          return item;
        }
      })
      .map((i) => {
        return {
          filename: i,
          path: `${_dir}/${i}`,
        };
      });
  } catch {
    return null;
  }
};

// Função para carregar dados de imagem de forma assíncrona
const loadImgData = async (_imgObject) => {
  return new Promise(async (resolve) => {
    const image = await loadImage(`${_imgObject.path}`);
    resolve({ imgObject: _imgObject, loadedImage: image });
  });
};

// Função para desenhar a imagem no canvas
const draw = (_imgObject) => {
  let w = canvas.width;
  let h = canvas.height;
  ctx.drawImage(_imgObject.loadedImage, 0, 0, w, h);
};

// Função para adicionar raridade com base na média de cores
const addRarity = () => {
  // Implementação da lógica de determinação de raridade
  // ...
};

// Função para salvar metadados
const saveMetadata = (_loadedImageObject) => {
  // Obtenção do nome curto do arquivo
  let shortName = _loadedImageObject.imgObject.filename.replace(
    /\.[^/.]+$/,
    ""
  );

  // Array temporário para armazenar atributos
  let tempAttributes = [];
  tempAttributes.push(addRarity());

  // Objeto temporário de metadados
  let tempMetadata = {
    name: `${namePrefix} #${shortName}`,
    description: description,
    image: `${baseUri}/${shortName}.png`,
    edition: Number(shortName),
    attributes: tempAttributes,
    compiler: "HashLips Art Engine",
  };

  // Salva metadados em arquivo JSON
  fs.writeFileSync(
    `${buildDir}/${shortName}.json`,
    JSON.stringify(tempMetadata, null, 2)
  );

  // Adiciona metadados à lista
  metadataList.push(tempMetadata);
};

// Função para escrever os metadados em um arquivo único
const writeMetaData = (_data) => {
  fs.writeFileSync(`${buildDir}/_metadata.json`, _data);
};

// Função principal para iniciar o processo de criação
const startCreating = async () => {
  // Obtém lista de imagens no diretório de entrada
  const images = getImages(inputDir);

  // Verifica se existem imagens
  if (images == null) {
    console.log("Please generate collection first.");
    return;
  }

  // Array para armazenar objetos de imagem carregados
  let loadedImageObjects = [];

  // Carrega os dados de todas as imagens de forma assíncrona
  images.forEach((imgObject) => {
    loadedImageObjects.push(loadImgData(imgObject));
  });

  // Aguarda o carregamento de todas as imagens
  await Promise.all(loadedImageObjects).then((loadedImageObjectArray) => {
    // Processa cada imagem carregada
    loadedImageObjectArray.forEach((loadedImageObject) => {
      // Desenha a imagem no canvas
      draw(loadedImageObject);

      // Salva os metadados da imagem
      saveMetadata(loadedImageObject);

      // Exibe mensagem indicando a criação dos metadados
      console.log(
        `Created metadata for image: ${loadedImageObject.imgObject.filename}`
      );
    });
  });

  // Escreve os metadados em um arquivo único
  writeMetaData(JSON.stringify(metadataList, null, 2));
};

// Executa a configuração inicial
buildSetup();

// Inicia o processo de criação
startCreating();
