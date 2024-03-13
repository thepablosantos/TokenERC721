<<<<<<< HEAD
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
=======
// Importar módulos necessários
const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

// Obter o diretório base do projeto
const basePath = process.cwd();

// Definir os diretórios de saída e entrada
const buildDir = `${basePath}/build/json`;
const inputDir = `${basePath}/build/images`;

// Importar configurações do arquivo de configuração
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const {
  format,
  namePrefix,
  description,
  baseUri,
} = require(`${basePath}/src/config.js`);

<<<<<<< HEAD
// Objeto de canvas e contexto
=======
// Criar um canvas para desenhar as imagens
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

// Lista para armazenar metadados
const metadataList = [];

<<<<<<< HEAD
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
=======
// Configuração inicial do diretório de construção
const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
};

// Obter imagens do diretório de entrada
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
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

<<<<<<< HEAD
// Função para carregar dados de imagem de forma assíncrona
=======
// Carregar dados da imagem assincronamente
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const loadImgData = async (_imgObject) => {
  return new Promise(async (resolve) => {
    const image = await loadImage(`${_imgObject.path}`);
    resolve({ imgObject: _imgObject, loadedImage: image });
  });
};

<<<<<<< HEAD
// Função para desenhar a imagem no canvas
=======
// Desenhar a imagem no canvas
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const draw = (_imgObject) => {
  let w = canvas.width;
  let h = canvas.height;
  ctx.drawImage(_imgObject.loadedImage, 0, 0, w, h);
};

<<<<<<< HEAD
// Função para adicionar raridade com base na média de cores
const addRarity = () => {
  // Implementação da lógica de determinação de raridade
  // ...
};

// Função para salvar metadados
const saveMetadata = (_loadedImageObject) => {
  // Obtenção do nome curto do arquivo
=======
// Adicionar raridade com base nas cores da imagem
const addRarity = () => {
  let w = canvas.width;
  let h = canvas.height;
  let i = -4;
  let count = 0;
  let imgdata = ctx.getImageData(0, 0, w, h);
  let rgb = imgdata.data;
  let newRgb = { r: 0, g: 0, b: 0 };
  const tolerance = 15;
  const rareColorBase = "NOT a Hot Dog";
  const rareColor = [
    { name: "Hot Dog", rgb: { r: 192, g: 158, b: 131 } },
    { name: "Hot Dog", rgb: { r: 128, g: 134, b: 90 } },
    { name: "Hot Dog", rgb: { r: 113, g: 65, b: 179 } },
    { name: "Hot Dog", rgb: { r: 162, g: 108, b: 67 } },
  ];

  while ((i += 10 * 4) < rgb.length) {
    ++count;
    newRgb.r += rgb[i];
    newRgb.g += rgb[i + 1];
    newRgb.b += rgb[i + 2];
  }

  newRgb.r = ~~(newRgb.r / count);
  newRgb.g = ~~(newRgb.g / count);
  newRgb.b = ~~(newRgb.b / count);

  let rarity = rareColorBase;

  rareColor.forEach((color) => {
    if (isNeighborColor(newRgb, color.rgb, tolerance)) {
      rarity = color.name;
    }
  });

  console.log(newRgb);
  console.log(rarity);

  return [
    {
      trait_type: "average color",
      value: `rgb(${newRgb.r},${newRgb.g},${newRgb.b})`,
    },
    {
      trait_type: "What is this?",
      value: rarity,
    },
    {
      trait_type: "date",
      value: randomIntFromInterval(1500, 1900),
    },
  ];
};

// Função auxiliar para gerar número aleatório dentro de um intervalo
randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Função auxiliar para verificar se duas cores são vizinhas dentro de uma tolerância
isNeighborColor = (color1, color2, tolerance) => {
  return (
    Math.abs(color1.r - color2.r) <= tolerance &&
    Math.abs(color1.g - color2.g) <= tolerance &&
    Math.abs(color1.b - color2.b) <= tolerance
  );
};

// Salvar metadados da imagem
const saveMetadata = (_loadedImageObject) => {
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
  let shortName = _loadedImageObject.imgObject.filename.replace(
    /\.[^/.]+$/,
    ""
  );

<<<<<<< HEAD
  // Array temporário para armazenar atributos
  let tempAttributes = [];
  tempAttributes.push(addRarity());

  // Objeto temporário de metadados
=======
  let tempAttributes = [];
  tempAttributes.push(addRarity());

>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
  let tempMetadata = {
    name: `${namePrefix} #${shortName}`,
    description: description,
    image: `${baseUri}/${shortName}.png`,
    edition: Number(shortName),
    attributes: tempAttributes,
    compiler: "HashLips Art Engine",
  };
<<<<<<< HEAD

  // Salva metadados em arquivo JSON
=======
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
  fs.writeFileSync(
    `${buildDir}/${shortName}.json`,
    JSON.stringify(tempMetadata, null, 2)
  );
<<<<<<< HEAD

  // Adiciona metadados à lista
  metadataList.push(tempMetadata);
};

// Função para escrever os metadados em um arquivo único
=======
  metadataList.push(tempMetadata);
};

// Escrever metadados gerais
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const writeMetaData = (_data) => {
  fs.writeFileSync(`${buildDir}/_metadata.json`, _data);
};

<<<<<<< HEAD
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
=======
// Iniciar o processo de criação
const startCreating = async () => {
  const images = getImages(inputDir);
  if (images == null) {
    console.log("Por favor, gere a coleção primeiro.");
    return;
  }
  let loadedImageObjects = [];
  images.forEach((imgObject) => {
    loadedImageObjects.push(loadImgData(imgObject));
  });
  await Promise.all(loadedImageObjects).then((loadedImageObjectArray) => {
    loadedImageObjectArray.forEach((loadedImageObject) => {
      draw(loadedImageObject);
      saveMetadata(loadedImageObject);
      console.log(
        `Metadados criados para a imagem: ${loadedImageObject.imgObject.filename}`
      );
    });
  });
  writeMetaData(JSON.stringify(metadataList, null, 2));
};

// Configuração inicial do diretório de construção
buildSetup();

// Iniciar o processo de criação
startCreating();


// Este script é um gerador de metadados para as imagens geradas pelo script principal main.js. 
// Ele calcula a raridade com base nas cores médias das imagens e adiciona metadados como nome, descrição, imagem, edição, atributos e compilador. 
// Os metadados são então salvos em arquivos JSON no diretório de saída.
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
