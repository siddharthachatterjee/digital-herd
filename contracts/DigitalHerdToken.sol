// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DigitalHerdToken is ERC20, Ownable {
    constructor(uint256 initialSupply) public ERC20("DigitalHerdToken", "DHT") {
        _mint(msg.sender, initialSupply);
    }

    function mint(uint256 amt) public onlyOwner {
        _mint(msg.sender, amt);
    }
}
