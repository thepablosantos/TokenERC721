// Módulo para manipulação de arquivos e caminhos
const basePath = process.cwd();
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

// Diretórios de saída e entrada
const buildDir = `${basePath}/build`;

// Importação de configurações do arquivo config.js
const { preview } = require(`${basePath}/src/config.js`);

// Lê os dados do arquivo _metadata.json
const rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
const metadataList = JSON.parse(rawdata);

// Função para salvar a imagem de visualização do projeto
const saveProjectPreviewImage = async (_data) => {
  // Extrai configurações da visualização
  const { thumbWidth, thumbPerRow, imageRatio, imageName } = preview;

  // Calcula a altura das miniaturas dinamicamente
  const thumbHeight = thumbWidth * imageRatio;

  // Largura e altura do canvas de visualização
  const previewCanvasWidth = thumbWidth * thumbPerRow;
  const previewCanvasHeight =
    thumbHeight * Math.ceil(_data.length / thumbPerRow);

  // Exibe mensagem indicando a preparação da imagem de visualização
  console.log(
    `Preparing a ${previewCanvasWidth}x${previewCanvasHeight} project preview with ${_data.length} thumbnails.`
  );

  // Inicializa o canvas agora que calculamos tudo
  const previewPath = `${buildDir}/${imageName}`;
  const previewCanvas = createCanvas(previewCanvasWidth, previewCanvasHeight);
  const previewCtx = previewCanvas.getContext("2d");

  // Itera sobre todas as NFTs e insere a miniatura na imagem de visualização
  // Não queremos depender do "edition" para assumir o índice
  for (let index = 0; index < _data.length; index++) {
    const nft = _data[index];
    await loadImage(`${buildDir}/images/${nft.edition}.png`).then((image) => {
      previewCtx.drawImage(
        image,
        thumbWidth * (index % thumbPerRow),
        thumbHeight * Math.trunc(index / thumbPerRow),
        thumbWidth,
        thumbHeight
      );
    });
  }

  // Escreve a imagem de visualização do projeto no arquivo
  fs.writeFileSync(previewPath, previewCanvas.toBuffer("image/png"));
  console.log(`Project preview image located at: ${previewPath}`);
};

// Chama a função para salvar a imagem de visualização do projeto
saveProjectPreviewImage(metadataList);
