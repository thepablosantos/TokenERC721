// Importar módulos necessários
const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

// Obter o diretório base do projeto
const basePath = process.cwd();

// Definir os diretórios de saída e entrada
const buildDir = `${basePath}/build/pixel_images`;
const inputDir = `${basePath}/build/images`;

// Importar configurações do arquivo de configuração
const { format, pixelFormat } = require(`${basePath}/src/config.js`);

// Criar um canvas para desenhar as imagens
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

// Configuração inicial do diretório de construção
const buildSetup = () => {
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  fs.mkdirSync(buildDir);
};

// Obter imagens do diretório de entrada
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

// Carregar dados da imagem assincronamente
const loadImgData = async (_imgObject) => {
  return new Promise(async (resolve) => {
    const image = await loadImage(`${_imgObject.path}`);
    resolve({ imgObject: _imgObject, loadedImage: image });
  });
};

// Desenhar a imagem pixelada
const draw = (_imgObject) => {
  let size = pixelFormat.ratio;
  let w = canvas.width * size;
  let h = canvas.height * size;
  
  // Desabilitar suavização para criar um efeito pixelado
  ctx.imageSmoothingEnabled = false;
  
  // Desenhar a imagem ampliada no canvas
  ctx.drawImage(_imgObject.loadedImage, 0, 0, w, h);
  
  // Reduzir a imagem para o tamanho original para obter o efeito pixelado
  ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
};

// Salvar a imagem pixelada
const saveImage = (_loadedImageObject) => {
  fs.writeFileSync(
    `${buildDir}/${_loadedImageObject.imgObject.filename}`,
    canvas.toBuffer("image/png")
  );
};

// Iniciar o processo de criação das imagens pixeladas
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
      saveImage(loadedImageObject);
      console.log(`Imagem pixelada: ${loadedImageObject.imgObject.filename}`);
    });
  });
};

// Configuração inicial do diretório de construção
buildSetup();

// Iniciar o processo de criação
startCreating();
