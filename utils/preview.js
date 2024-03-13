<<<<<<< HEAD
// Módulo para manipulação de arquivos e caminhos
=======
// Importar módulos necessários
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
const basePath = process.cwd();
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

<<<<<<< HEAD
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
=======
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
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
  const previewCanvasWidth = thumbWidth * thumbPerRow;
  const previewCanvasHeight =
    thumbHeight * Math.ceil(_data.length / thumbPerRow);

<<<<<<< HEAD
  // Exibe mensagem indicando a preparação da imagem de visualização
  console.log(
    `Preparing a ${previewCanvasWidth}x${previewCanvasHeight} project preview with ${_data.length} thumbnails.`
  );

  // Inicializa o canvas agora que calculamos tudo
=======
  // Iniciar o canvas agora que tudo foi calculado
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
  const previewPath = `${buildDir}/${imageName}`;
  const previewCanvas = createCanvas(previewCanvasWidth, previewCanvasHeight);
  const previewCtx = previewCanvas.getContext("2d");

<<<<<<< HEAD
  // Itera sobre todas as NFTs e insere a miniatura na imagem de visualização
  // Não queremos depender do "edition" para assumir o índice
  for (let index = 0; index < _data.length; index++) {
    const nft = _data[index];
    await loadImage(`${buildDir}/images/${nft.edition}.png`).then((image) => {
=======
  // Iterar sobre todas as NFTs e inserir miniatura na imagem de prévia
  for (let index = 0; index < _data.length; index++) {
    const nft = _data[index];
    await loadImage(`${buildDir}/images/${nft.edition}.png`).then((image) => {
      // Desenhar miniatura na posição apropriada no canvas
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
      previewCtx.drawImage(
        image,
        thumbWidth * (index % thumbPerRow),
        thumbHeight * Math.trunc(index / thumbPerRow),
        thumbWidth,
        thumbHeight
      );
    });
  }

<<<<<<< HEAD
  // Escreve a imagem de visualização do projeto no arquivo
  fs.writeFileSync(previewPath, previewCanvas.toBuffer("image/png"));
  console.log(`Project preview image located at: ${previewPath}`);
};

// Chama a função para salvar a imagem de visualização do projeto
=======
  // Escrever a imagem de prévia do projeto em um arquivo
  fs.writeFileSync(previewPath, previewCanvas.toBuffer("image/png"));
  console.log(`Imagem de prévia do projeto localizada em: ${previewPath}`);
};

// Chamar a função para criar a imagem de prévia do projeto
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
saveProjectPreviewImage(metadataList);
