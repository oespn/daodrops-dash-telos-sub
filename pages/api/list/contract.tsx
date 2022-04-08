import { supabase } from '../../../utils/supabaseClient'

export default async function handler(req, res) {
    let addresses: any = [];
    let result: any;
    // addresses.push(
    //   "0x84f46686b5b76f04e7b13b44c8e38d2f90a5f120",
    //   "0x0bb8fa3a3684ce13d6be7e42ce988b75fe65c3de",
    //   "0xa0d439cf0729736a4061b5c0a3f59a29a7bc7f55",
    //   "0xf90b108640564336adecf0cdddeca8890df39ccf",
    //   "0x88f9961ab0573a3830ea2c53d9120b71057252f4",
    //   "0x6d298c837998be7180fce5b93199b382eaf81db1",
    //   "0x69eb8b0353a5dfa8414966b0207769aefbf0627d",
    //   "0xc577ef224f94f6e2c2491bb4930e5e67b93ff10c",
    //   "0x5c13370a43fe7150104195c86a4bc8d6148f67dd",
    //   "0xb9ea5a22fd7de4aebc97d05ef9276a3f635d12c3",
    // );

    const getInitAddressList = async () => {
        const user_id = "19b68d16-7363-4f56-bd24-fe711ea63577";
        await supabase
            .from('targetlist')
            .select('*')
            .eq('created_by', user_id)
            .then(val => {
                result = val.data;
            })
    }

    await getInitAddressList()
    result[0]?.targets?.lists.map((row, index) => {
        addresses.push(row.address);
    })

    let recipients = "";
    recipients = "\n" + addresses.join("\n");

    let airDropContract = `
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
    let tidy = airDropContract.replace("\r\n", String.fromCharCode(13));
    const datestamp = new Date().toISOString();
    const filename = req.query.name + "_" + datestamp + ".txt";

    res.setHeader('Cache-control', 's-maxage=6000, stale-while-revalidate=30')
    res.setHeader('Content-type', 'text/plain')
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    res.status(200).end(tidy)

}