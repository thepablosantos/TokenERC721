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
    },
  ],
};

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
    ],
  },
];

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
