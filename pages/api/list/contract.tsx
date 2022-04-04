import { supabase } from '../../../utils/supabaseClient'
import fs from 'fs';
import path from 'path';

// domain.com/api/list/contract?type=erc20&listId=0

export default async function handler(req, res) {
  
   
    console.log('request Query:', req.query);

    // load from Supabase
    // get data for listId x

    var recipients = "";     

    var addresses = [];
    addresses.push(
      "0x84f46686b5b76f04e7b13b44c8e38d2f90a5f120",
      "0x0bb8fa3a3684ce13d6be7e42ce988b75fe65c3de",
      "0xa0d439cf0729736a4061b5c0a3f59a29a7bc7f55",
      "0xf90b108640564336adecf0cdddeca8890df39ccf",
      "0x88f9961ab0573a3830ea2c53d9120b71057252f4",
      "0x6d298c837998be7180fce5b93199b382eaf81db1",
      "0x69eb8b0353a5dfa8414966b0207769aefbf0627d",
      "0xc577ef224f94f6e2c2491bb4930e5e67b93ff10c",
      "0x5c13370a43fe7150104195c86a4bc8d6148f67dd",
      "0xb9ea5a22fd7de4aebc97d05ef9276a3f635d12c3",
    );

    recipients = addresses.join(","); 

    // try {
    //   await airdrop(recipients, "TEST", 0.001, 0.01, "dao_ac", "dao_key");
    //   //(recipients, token_symbol, token_amount, token_total_supply, dao_account, dao_key ) 
  
    // } catch (error) {
    //   res.status(200).send( { error } );
    // }

      
    var airDropContract = `
    // SPDX-License-Identifier: GPL-3.0
    // NOT DESIGNED FOR PRODUCTION
    // THIS FILE CONTAINS OBVIOUS SECURITY ISSUES
    // YOUR DEVELOPER MUST REVIEW AND CUSTOMISE

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
    
      // TARGET ADDRESSES FOLLOW IN RAW COMMA SEPARATED FORMAT 
      // PASS INTO Airdrop Contract or load into a tool for processing:
    `;

    airDropContract += recipients;
  

    const datestamp = new Date().toISOString();
    const filename = req.query.name+"_"+datestamp+".txt";

    res.setHeader('Content-Type', 'application/text');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

      let tidy = airDropContract.replace("\r\n", String.fromCharCode(13));
      
    res.status(200).send( { tidy } );

}