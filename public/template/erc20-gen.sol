// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract DAODrops is ERC20 {
    constructor() ERC20("DAO_TOKEN", "TOKEN_SYMBOL") {}
        //18 decimals, so 1000 x 10 TOKEN 
    function issueToken() public  {
        _mint(msg.sender, 1000*10**18);
    }
}


contract Airdrop {
    function drop(ERC20 DAODrops, address[] memory recipients, uint256[] memory values) public {
        for (uint256 i = 0; i < recipients.length; i++) {
            token.transfer(recipients[i], values[i]);
        }
    }
}  

/**
  CONTRACT FOR DEMO PURPOSES ONLY
  Deliberate security issues - not for production.
  This is just a guide and suggest employing your developer to set security for your needs and deploy. 
  SEE: https://docs.openzeppelin.com/contracts/3.x/erc20

  DAO Drops pass you the receipient list to load into a Drop that will look something like below:
*/
  