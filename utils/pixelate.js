// Módulo para manipulação de arquivos e caminhos
const fs = require("fs");
const path = require("path");

// Biblioteca para criação de canvas e carregamento de imagens
const { createCanvas, loadImage } = require("canvas");

// Diretório base do projeto
const basePath = process.cwd();

// Diretórios de saída e entrada
const buildDir = `${basePath}/build/pixel_images`;
const inputDir = `${basePath}/build/images`;

// Importação de configurações do arquivo config.js
const { format, pixelFormat } = require(`${basePath}/src/config.js`);

// Objeto de canvas e contexto
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

// Função para configuração inicial
const buildSetup = () => {
  // Remove o diretório de saída se existir
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  // Cria diretório de saída
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

// Função para desenhar a imagem no canvas com pixelização
const draw = (_imgObject) => {
  let size = pixelFormat.ratio;
  let w = canvas.width * size;
  let h = canvas.height * size;

  // Desativa suavização para pixelização
  ctx.imageSmoothingEnabled = false;

  // Desenha a imagem no canvas com pixelização
  ctx.drawImage(_imgObject.loadedImage, 0, 0, w, h);
  ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
};

// Função para salvar imagem pixelizada
const saveImage = (_loadedImageObject) => {
  fs.writeFileSync(
    `${buildDir}/${_loadedImageObject.imgObject.filename}`,
    canvas.toBuffer("image/png")
  );
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
      // Desenha a imagem pixelizada no canvas
      draw(loadedImageObject);

      // Salva a imagem pixelizada
      saveImage(loadedImageObject);

      // Exibe mensagem indicando a pixelização da imagem
      console.log(`Pixelated image: ${loadedImageObject.imgObject.filename}`);
    });
  });
};

// Executa a configuração inicial
buildSetup();

// Inicia o processo de criação
startCreating();
