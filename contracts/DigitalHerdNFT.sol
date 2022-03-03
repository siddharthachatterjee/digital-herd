// SPDX-License-Identifier: MIT
// Copyright Siddhartha Chatterjee
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DigitalHerdNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCount = 0;

    enum CollectionState {
        YetToDrop,
        Dropped
    }

    struct User {
        string username;
        uint256[] tokens;
    }
    CollectionState public state;
    mapping(address => User) users;
    mapping(uint256 => uint256) price;

    modifier ifDropped() {
        require(state == CollectionState.Dropped);
        _;
    }

    modifier ifNotDropped() {
        require(state == CollectionState.YetToDrop);
        _;
    }

    constructor() ERC721("DigitalHerdNFT", "HRD") {
        tokenCount = 0;
        state = CollectionState.YetToDrop;
    }

    function getUser(address addr) public view returns (User memory) {
        return users[addr];
    }

    function createCollectible(string memory tokenURI, address receiver)
        public
        payable
        returns (uint256)
    {

        uint256 newItemId = tokenCount;
        _mint(receiver, newItemId);
        users[receiver].tokens.push(newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCount++;
        payable(owner()).transfer(msg.value);
        price[newItemId] = 5 * 1e16;
        return newItemId;
    }

    function createCollectibles(string[] memory uris, address receiver) public onlyOwner {
        for (uint256 i = 0; i < uris.length; i++) createCollectible(uris[i], receiver);
    }

    function dropCollection() public onlyOwner {
        state = CollectionState.Dropped;
    }

    function purchaseToken(uint256 _tokenId) public payable  {
        
        require(_tokenId < tokenCount, "Token does not exist");
        require(msg.value >= price[_tokenId], "Insufficient funds");
        address itemOwner = ownerOf(_tokenId);
        // approve(owner, _tokenId);
        //  setApprovalForAll(msg.sender, true);
        this.safeTransferFrom(itemOwner, msg.sender, _tokenId);
        users[msg.sender].tokens.push(_tokenId);
        uint256 idx = 0;
        for (uint256 i = 0; i < users[itemOwner].tokens.length; i++) {
            if (users[itemOwner].tokens[i] == _tokenId) {
                idx = i;
                break;
            }
        }
        users[itemOwner].tokens[idx] = users[itemOwner].tokens[
            users[itemOwner].tokens.length - 1
        ];
        users[itemOwner].tokens.pop();
        payable(owner()).transfer(msg.value);
    }

    function totalSupply() public view returns (uint256) {
        return tokenCount;
    }

    
}
