// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AnimalsCollectible is ERC721URIStorage {
    uint public tokenCount;
    
    constructor() ERC721("AnimalsCollectible", "ZOO") {
        tokenCount = 0;
    }

    function createCollectible(address receiver, string memory tokenURI) public returns (uint256) {
        uint256 newItemId = tokenCount;
        _mint(receiver, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCount++;
        return newItemId;
    }
}