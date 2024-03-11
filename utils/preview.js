// Importar módulos necessários
const basePath = process.cwd();
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

// Diretório de construção do projeto
const buildDir = `${basePath}/build`;

// Importar configurações de prévia do arquivo de configuração
const { preview } = require(`${basePath}/src/config.js`);

// Ler dados do arquivo JSON de metadados
const rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
const metadataList = JSON.parse(rawdata);

// Função para salvar a imagem de prévia do projeto
const saveProjectPreviewImage = async (_data) => {
  // Extrair configurações da prévia
  const { thumbWidth, thumbPerRow, imageRatio, imageName } = preview;

  // Calcular a altura com base na proporção da imagem
  const thumbHeight = thumbWidth * imageRatio;

  // Preparar o canvas
  const previewCanvasWidth = thumbWidth * thumbPerRow;
  const previewCanvasHeight =
    thumbHeight * Math.ceil(_data.length / thumbPerRow);

  // Iniciar o canvas agora que tudo foi calculado
  const previewPath = `${buildDir}/${imageName}`;
  const previewCanvas = createCanvas(previewCanvasWidth, previewCanvasHeight);
  const previewCtx = previewCanvas.getContext("2d");

  // Iterar sobre todas as NFTs e inserir miniatura na imagem de prévia
  for (let index = 0; index < _data.length; index++) {
    const nft = _data[index];
    await loadImage(`${buildDir}/images/${nft.edition}.png`).then((image) => {
      // Desenhar miniatura na posição apropriada no canvas
      previewCtx.drawImage(
        image,
        thumbWidth * (index % thumbPerRow),
        thumbHeight * Math.trunc(index / thumbPerRow),
        thumbWidth,
        thumbHeight
      );
    });
  }

  // Escrever a imagem de prévia do projeto em um arquivo
  fs.writeFileSync(previewPath, previewCanvas.toBuffer("image/png"));
  console.log(`Imagem de prévia do projeto localizada em: ${previewPath}`);
};

// Chamar a função para criar a imagem de prévia do projeto
saveProjectPreviewImage(metadataList);
