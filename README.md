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