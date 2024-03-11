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
    },
  ],
};

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
    ],
  },
];

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
