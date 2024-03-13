// contracts/MyNFT.sol
// Adapte conforme necessário
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Contract Bank", "CNTB") {
        // Deixe o construtor vazio por enquanto
    }

    // Implementar funções adicionais conforme necessário
    // ...

    // Função para mintar uma nova NFT d
    function mint(address to) public onlyOwner {
        _mint(to, _tokenIdCounter.current());
        _tokenIdCounter.increment();
    }
}
