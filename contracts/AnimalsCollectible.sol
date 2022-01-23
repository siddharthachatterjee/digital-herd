// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract AnimalsCollectible is ERC721URIStorage, Ownable {
    uint256 public tokenCount = 0;

    enum CollectionState{YetToDrop, Dropped}
    struct User {
        string username;
        uint256[] tokens;
    }
    CollectionState state;
    mapping(address => User) users;
    mapping (uint => uint) price;

    modifier ifDropped {
        require(state == CollectionState.Dropped);
        _;
    }


    constructor() ERC721("DigitalHerdAnimal", "DHA")  {
        tokenCount = 0;
        state = CollectionState.YetToDrop;
    }

    function getUser(address addr) public view returns (User memory) {
        return users[addr];
    }


    function createCollectible(string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
       address receiver = address(this);
        uint256 newItemId = tokenCount;
        _mint(receiver, newItemId);
        users[receiver].tokens.push(newItemId);
        _setTokenURI(newItemId, tokenURI);
        price[newItemId] = 1e18 * 0.01;
        tokenCount++;
      //  cidExists[]
        return newItemId;
    }

    function  createCollectibles(string[] memory uris) public onlyOwner {
        for (uint i = 0; i < uris.length; i++) 
            createCollectible(uris[i]);
    }

    function dropCollection() public onlyOwner {
        state = CollectionState.Dropped;
    }

   function purchaseToken(uint256 _tokenId) public payable ifDropped {
        require(_tokenId < tokenCount, "Token does not exist");
        require(msg.value >= price[_tokenId], "Insufficient funds");
       address itemOwner = ownerOf(_tokenId);
      // approve(owner, _tokenId);
      //  setApprovalForAll(msg.sender, true);
        this.safeTransferFrom(itemOwner, msg.sender, _tokenId);
        users[msg.sender].tokens.push(_tokenId);
        uint idx = 0;
        for (uint i = 0; i < users[itemOwner].tokens.length; i++) {
            if (users[itemOwner].tokens[i] == _tokenId) {
                idx = i;
                break;
            }
        }
        users[itemOwner].tokens[idx] = users[itemOwner].tokens[users[itemOwner].tokens.length - 1];
        users[itemOwner].tokens.pop();
        payable(owner()).transfer(msg.value);
    }
}
