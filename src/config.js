<<<<<<< HEAD
// Obtém o diretório base do projeto
const basePath = process.cwd();

// Importa constantes relacionadas ao modo de mesclagem de camadas
const { MODE } = require(`${basePath}/constants/blend_mode.js`);

// Importa constantes relacionadas à rede (eth ou sol)
const { NETWORK } = require(`${basePath}/constants/network.js`);

// Define a rede como Ethereum
const network = NETWORK.eth;

// Metadados gerais para Ethereum
const namePrefix = "Your Collection"; // Prefixo para o nome da coleção
const description = "Remember to replace this description"; // Descrição da coleção
const baseUri = "ipfs://NewUriToReplace"; // URI base para os metadados

// Metadados específicos para Solana
const solanaMetadata = {
  symbol: "YC", // Símbolo para Solana
  seller_fee_basis_points: 1000, // Define a porcentagem que você deseja nas vendas secundárias (1000 = 10%)
  external_url: "", // URL externa para Solana (substitua com a URL desejada)
  creators: [
    {
      address: "0x53bf7cf96a431d23B974F2884c5AC97F88c6785B", // Endereço do criador
      share: 100, // Porcentagem da participação do criador
=======
const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

// Define a rede de destino (Ethereum, Solana, etc.)
const network = NETWORK.eth;

// Metadados gerais para Ethereum
const namePrefix = "Contract Bank";
const description = "Teste de descrição";
const baseUri = "ipfs://NewUriToReplace";

// Configurações específicas para Solana
const solanaMetadata = {
  symbol: "CTB",
  seller_fee_basis_points: 1000, // Define a porcentagem que você deseja das vendas no mercado secundário (1000 = 10%)
  external_url: "",
  creators: [
    {
      address: "0x53bf7cf96a431d23B974F2884c5AC97F88c6785B",
      share: 100,
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
    },
  ],
};

<<<<<<< HEAD
// Se Solana for selecionado, a coleção começa do 0 automaticamente
const layerConfigurations = [
  {
    growEditionSizeTo: 10, // Define até que edição a coleção crescerá
    layersOrder: [
      { name: "Background" }, // Ordem das camadas (por exemplo, "Background", "Body", "Eye", etc.)
      // { name: "" }, // Outras camadas (descomente e preencha conforme necessário)
      // { name: "" },
      // { name: "" },
      // { name: "" },
=======
// Configuração das camadas para criar a NFT
const layerConfigurations = [
  {
    growEditionSizeTo: 100,
    layersOrder: [
      { name: "Background" },
      // { name: "" },
      // { name: "" },
      // { name: "" },
      // { name: "" }, 
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
    ],
  },
];

<<<<<<< HEAD
const shuffleLayerConfigurations = false; // Define se as camadas devem ser embaralhadas

const debugLogs = false; // Ativa ou desativa logs de depuração

const format = {
  width: 1800, // Largura da imagem gerada
  height: 2500, // Altura da imagem gerada
  smoothing: false, // Ativa ou desativa suavização da imagem
};

const gif = {
  export: false, // Ativa ou desativa a exportação de GIFs
  repeat: 0, // Número de repetições no GIF
  quality: 100, // Qualidade do GIF (0 a 100)
  delay: 500, // Atraso entre os quadros do GIF (em milissegundos)
};

const text = {
  only: false, // Ativa ou desativa a adição de texto à imagem
  color: "#ffffff", // Cor do texto
  size: 20, // Tamanho do texto
  xGap: 40, // Espaçamento horizontal entre o texto e a borda
  yGap: 40, // Espaçamento vertical entre o texto e a borda
  align: "left", // Alinhamento do texto (por exemplo, "left", "center", "right")
  baseline: "top", // Alinhamento da linha de base do texto
  weight: "regular", // Peso da fonte do texto
  family: "Courier", // Família da fonte do texto
  spacer: " => ", // Separador entre elementos de texto
};

const pixelFormat = {
  ratio: 2 / 128, // Taxa de pixel
};

const background = {
  generate: true, // Ativa ou desativa a geração de fundo
  brightness: "80%", // Luminosidade do fundo
  static: false, // Se verdadeiro, usa a cor padrão como fundo; caso contrário, gera um fundo aleatório
  default: "#000000", // Cor padrão do fundo
};

const extraMetadata = {}; // Metadados adicionais

const rarityDelimiter = "#"; // Delimitador para a raridade

const uniqueDnaTorrance = 10; // Tolerância para DNA único

const preview = {
  thumbPerRow: 5, // Número de miniaturas por linha na visualização
  thumbWidth: 50, // Largura da miniatura
  imageRatio: format.height / format.width, // Proporção da imagem na visualização
  imageName: "preview.png", // Nome do arquivo da imagem de visualização
};

const preview_gif = {
  numberOfImages: 5, // Número de imagens no GIF de visualização
  order: "ASC", // Ordem das imagens (ASC, DESC, MIXED)
  repeat: 0, // Número de repetições no GIF de visualização
  quality: 100, // Qualidade do GIF de visualização (0 a 100)
  delay: 500, // Atraso entre os quadros do GIF de visualização (em milissegundos)
  imageName: "preview.gif", // Nome do arquivo do GIF de visualização
};

// Exporta todas as configurações para uso em outros módulos
=======
// Define se as configurações das camadas devem ser embaralhadas
const shuffleLayerConfigurations = false;

// Configurações de debug
const debugLogs = false;

// Configurações de formato da imagem
const format = {
  width: 1150,
  height: 1150,
  smoothing: false,
};

// Configurações de texto nas imagens
const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

// Configurações de formato de pixel
const pixelFormat = {
  ratio: 2 / 128,
};

// Configurações de fundo das imagens
const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

// Metadados adicionais (podem ser usados para qualquer finalidade)
const extraMetadata = {};

// Delimitador de raridade
const rarityDelimiter = "#";

// Tolerância para DNA único
const uniqueDnaTorrance = 10000;

// Configurações para pré-visualização de imagens
const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

// Configurações para pré-visualização de GIF
const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

// Exporta todas as configurações para serem usadas em outros arquivos
>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};
