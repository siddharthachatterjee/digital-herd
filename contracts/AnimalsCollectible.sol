// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AnimalsCollectible is ERC721URIStorage {
    uint256 public tokenCount;

    struct User {
        string username;
        uint256[] tokens;
    }
    mapping(address => User) users;

    constructor() ERC721("AranyaToken", "ARA") {
        tokenCount = 0;
    }

    function setUsername(string memory val) public {
        users[msg.sender].username = val;
    }

    function getUser(address addr) public view returns (User memory) {
        return users[addr];
    }

    function createCollectible(address receiver, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = tokenCount;
        _mint(receiver, newItemId);
        users[receiver].tokens.push(newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCount++;
        return newItemId;
    }

    function purchaseToken(uint256 _tokenId) public payable {
        require(_tokenId < tokenCount);
        require(msg.value >= 0);
        address owner = ownerOf(_tokenId);
        safeTransferFrom(owner, msg.sender, _tokenId);
    }
}
