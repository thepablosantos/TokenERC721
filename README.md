<<<<<<< HEAD
# NFT ContractBank Project

Este projeto consiste em um contrato inteligente (smart contract) para a criação e mintagem de NFTs (Tokens Não Fungíveis) utilizando a rede de teste da Optimism.

## Configuração Inicial

### Requisitos..

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Hardhat](https://hardhat.org/)
- [Metamask](https://metamask.io/)

### Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/contractbank.git
    cd contractbank
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configuração do Metamask:

    - Abra o Metamask e conecte-se à rede de teste da Optimism (optimistic-kovan).
    - Obtenha ETH de teste na [faucet da Optimism](https://gateway.optimism.io/kovan/faucet).
    - Importe sua conta do Metamask no ambiente de desenvolvimento.

## Compilação e Implantação

1. Compile os contratos:

    ```bash
    npx hardhat compile
    ```

2. Implante o contrato na rede de teste da Optimism:

    ```bash
    npx hardhat run scripts/deploy.js --network optimistic-kovan
    ```

## Mintagem de NFT

Para mintar um NFT, você pode usar o script `mint.js`. Certifique-se de ajustar os endereços necessários no script antes de executá-lo.

```bash
npx hardhat run scripts/mint.js --network optimism
```

## Testes

Execute os testes automatizados para garantir a integridade do contrato:

```bash
npx hardhat test
```

## Contribuições
Contribuições são bem-vindas! Se encontrar algum problema ou tiver sugestões de melhorias, abra uma `issue` ou envie um pull request.

## Licença
Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE.md para mais detalhes.
=======
# Bem-vindo

```sh
yarn install
```

Alternativamente, você pode executar este comando se tiver o Node instalado.

```sh
npm install
```

## Uso ℹ️
Crie diferentes camadas como pastas no diretório 'layers' e adicione todos os ativos da camada nessas pastas. Você pode nomear os ativos como quiser, desde que tenha um peso de raridade anexado ao nome do arquivo, como: exemplo elemento#70.png. Opcionalmente, você pode alterar o delimitador # para qualquer coisa que desejar usando a variável rarityDelimiter no arquivo src/config.js.

Depois de ter todas as suas camadas, vá para src/config.js e atualize a matriz layersOrder dos objetos layerConfigurations para ser o nome das suas pastas de camadas na ordem da camada traseira para a camada frontal.

Exemplo: Se você estiver criando um design de retrato, poderá ter um plano de fundo, depois uma cabeça, uma boca, olhos, acessórios para os olhos e, em seguida, acessórios para a cabeça. Assim, sua layersOrder ficaria algo assim:

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 100,
    layersOrder: [
      { name: "Background" },
    ],
  },
];

```

O `name` de cada objeto de camada representa o nome da pasta (in `/layers/`) onde as imagens residem.

Opcionalmente, você pode agora adicionar várias `layerConfigurations` diferentes à sua coleção. Cada configuração pode ser única e ter ordens de camadas diferentes, usar as mesmas camadas ou introduzir novas. Isso dá ao artista flexibilidade na hora de ajustar suas coleções às suas necessidades.

Exemplo: Se você estiver criando um design de retrato, poderá ter um plano de fundo, depois uma cabeça, uma boca, olhos, acessórios para os olhos e, em seguida, acessórios para a cabeça, e você deseja criar uma nova raça ou simplesmente reorganizar as camadas ou até mesmo introduzir novas camadas. Então, suas `layerConfigurations` e `layersOrder` ficariam algo assim:

```js
const layerConfigurations = [
  {
    // Cria até 50 obras de arte
    growEditionSizeTo: 50,
    layersOrder: [
      { name: "Plano de Fundo" },
    ],
  },
  {
    // Cria mais 100 obras de arte
    growEditionSizeTo: 150,
    layersOrder: [
      { name: "Plano de Fundo" },
    ],
  },
];

```

Atualize o tamanho do `format`, ou seja, o tamanho da imagem produzida, e o `growEditionSizeTo` em cada objeto `layerConfigurations`, que é a quantidade de variação produzida.

Você pode misturar a ordem das `layerConfigurations` na forma como as imagens são salvas definindo a variável `shuffleLayerConfigurations` no arquivo `config.js` como verdadeira. Ela é falsa por padrão e salvará todas as imagens em ordem numérica.

Se você quiser ter logs para depurar e ver o que está acontecendo quando gera imagens, pode definir a variável `debugLogs` no arquivo `config.js` como verdadeira. Ela é falsa por padrão, então você verá apenas logs gerais.

Se quiser brincar com diferentes modos de mistura, pode adicionar um campo `blend: MODE.colorBurn` ao objeto `options` de `layersOrder`.

Se precisar que camadas tenham uma opacidade diferente, pode adicionar o campo `opacity: 0.7` ao objeto `options` de `layersOrder` também.

Se quiser que uma camada _ignorada_ na verificação de singularidade do DNA, pode definir `bypassDNA: true` no objeto `options`. Isso tem o efeito de garantir que o restante dos traços seja único sem considerar as camadas de `Plano de Fundo`, por exemplo. As camadas _são_ incluídas na imagem final.

Para usar um nome de atributo de metadados diferente, pode adicionar `displayName: "Cor Incrível dos Olhos"` ao objeto `options`. Todas as opções são opcionais e podem ser adicionadas à mesma camada se desejar.

Aqui está um exemplo de como brincar com ambos os campos de filtro:

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 5,
    layersOrder: [
      { name: "Plano de Fundo" , {
        options: {
          bypassDNA: false;
        }
      }},
      { name: "Olho" },
      {
        name: "Cor dos Olhos",
        options: {
          blend: MODE.destinationIn,
          opacity: 0.2,
          displayName: "Cor Incrível dos Olhos",
        },
      },
      { name: "Íris" },
      { name: "Brilho" },
      { name: "Pálpebra Inferior", options: { blend: MODE.overlay, opacity: 0.7 } },
      { name: "Pálpebra Superior" },
    ],
  },
];

Aqui está uma lista dos diferentes modos de mistura que você pode usar opcionalmente.

const MODE = {
  sourceOver: "source-over",
  sourceIn: "source-in",
  sourceOut: "source-out",
  sourceAtop: "source-out",
  destinationOver: "destination-over",
  destinationIn: "destination-in",
  destinationOut: "destination-out",
  destinationAtop: "destination-atop",
  lighter: "lighter",
  copy: "copy",
  xor: "xor",
  multiply: "multiply",
  screen: "screen",
  overlay: "overlay",
  darken: "darken",
  lighten: "lighten",
  colorDodge: "color-dodge",
  colorBurn: "color-burn",
  hardLight: "hard-light",
  softLight: "soft-light",
  difference: "difference",
  exclusion: "exclusion",
  hue: "hue",
  saturation: "saturation",
  color: "color",
  luminosity: "luminosity",
};

```

Quando estiver pronto, execute o seguinte comando e sua arte produzida estará no diretório `build/images` e o JSON no diretório `build/json`:

npm run build

ou

node index.js

O programa produzirá todas as imagens no diretório `build/images`, junto com os arquivos de metadados no diretório `build/json`. Cada coleção terá um arquivo _metadata.json que consiste em todos os metadados na coleção dentro do diretório `build/json`. A pasta `build/json` também conterá todos os arquivos JSON individuais que representam cada arquivo de imagem. O arquivo JSON único de uma imagem terá algo parecido com isso:

```js

{
  "dna": "d956cdf4e460508b5ff90c21974124f68d6edc34",
  "name": "#1",
  "description": "Esta é a descrição do seu projeto NFT",
  "image": "",
  "edition": 1,
  "date": 1731990799975,
  "attributes": [
    { "trait_type": "Plano de Fundo", "value": "Preto" },
    { "trait_type": "Olho", "value": "Vermelho" },
    { "trait_type": "Cor dos Olhos", "value": "Amarelo" },
    { "trait_type": "Íris", "value": "Pequena" },
    { "trait_type": "Brilho", "value": "Formas" },
    { "trait_type": "Pálpebra Inferior", "value": "Baixa" },
    { "trait_type": "Pálpebra Superior", "value": "Média" }
  ],
  "compiler": 
}

```

Você também pode adicionar metadados extras a cada arquivo de metadados adicionando seus itens extras, (chave: valor), à variável `extraMetadata` no arquivo `config.js`.

```js

const extraMetadata = {
  criador: "Pablo Santos",
};

>>>>>>> ca3b36319edb0bf3d997cc817b821d501caf8630
