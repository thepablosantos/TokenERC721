// Módulo para manipulação de arquivos e caminhos
const basePath = process.cwd();
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

// Diretórios de saída e entrada
const buildDir = `${basePath}/build`;
const imageDir = `${buildDir}/images`;

// Importação de configurações do arquivo config.js
const { format, preview_gif } = require(`${basePath}/src/config.js`);

// Objeto de canvas e contexto
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

// Importação do módulo HashlipsGiffer
const HashlipsGiffer = require(`${basePath}/modules/HashlipsGiffer.js`);
let hashlipsGiffer = null;

// Função para carregar uma imagem de forma assíncrona
const loadImg = async (_img) => {
  return new Promise(async (resolve) => {
    const loadedImage = await loadImage(`${_img}`);
    resolve({ loadedImage: loadedImage });
  });
};

// Array para armazenar promessas de carregamento de imagens
const imageList = [];

// Lê os caminhos das imagens no diretório e inicia o carregamento assíncrono
const rawdata = fs.readdirSync(imageDir).forEach((file) => {
  imageList.push(loadImg(`${imageDir}/${file}`));
});

// Função para salvar o GIF de visualização do projeto
const saveProjectPreviewGIF = async (_data) => {
  // Extrai configurações do GIF de visualização
  const { numberOfImages, order, repeat, quality, delay, imageName } =
    preview_gif;

  // Extrai configurações de formato
  const { width, height } = format;

  // Largura e altura do canvas de visualização
  const previewCanvasWidth = width;
  const previewCanvasHeight = height;

  // Verifica se há imagens suficientes para criar o GIF
  if (_data.length < numberOfImages) {
    console.log(
      `You do not have enough images to create a gif with ${numberOfImages} images.`
    );
  } else {
    // Exibe mensagem indicando a preparação do GIF
    console.log(
      `Preparing a ${previewCanvasWidth}x${previewCanvasHeight} project preview with ${_data.length} images.`
    );

    // Caminho para salvar o GIF de visualização
    const previewPath = `${buildDir}/${imageName}`;

    // Limpa o contexto do canvas
    ctx.clearRect(0, 0, width, height);

    // Inicializa o objeto HashlipsGiffer
    hashlipsGiffer = new HashlipsGiffer(
      canvas,
      ctx,
      `${previewPath}`,
      repeat,
      quality,
      delay
    );
    hashlipsGiffer.start();

    // Aguarda o carregamento de todas as imagens
    await Promise.all(_data).then((renderObjectArray) => {
      // Determina a ordem das imagens antes de criar o GIF
      if (order == "ASC") {
        // Do nothing
      } else if (order == "DESC") {
        renderObjectArray.reverse();
      } else if (order == "MIXED") {
        renderObjectArray = renderObjectArray.sort(() => Math.random() - 0.5);
      }

      // Reduz o tamanho do array de imagens para a quantidade desejada
      if (parseInt(numberOfImages) > 0) {
        renderObjectArray = renderObjectArray.slice(0, numberOfImages);
      }

      // Desenha cada imagem no canvas e adiciona ao GIF
      renderObjectArray.forEach((renderObject, index) => {
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(
          renderObject.loadedImage,
          0,
          0,
          previewCanvasWidth,
          previewCanvasHeight
        );
        hashlipsGiffer.add();
      });
    });

    // Finaliza o GIF
    hashlipsGiffer.stop();
  }
};

// Chama a função para salvar o GIF de visualização do projeto
saveProjectPreviewGIF(imageList);
