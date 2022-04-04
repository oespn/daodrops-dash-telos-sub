// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 >0.8.0;


contract DAODrop_OfferWhitelist {

    //Users on the Whitelist
    struct User {
        address user; // wallet local 
        string uuid; // hashed identifier of users mobile device  

        // UUID must be unique per whitelist

        uint256 created_time; // epoch time
        uint256 user_idx; 
        bool init;//  default = false so it can be used for result checks
    }

    enum OfferType { NFT, BADGE, TOKEN }

    struct Offer {
        address project_owner; // wallet addr of dao/project/signer  
        OfferType offer_type;

        string title;
        string metadata; // onchain info 
        string link;  // offchain info about offer 

        uint256 created_time; // epoch time

        uint256 nUsers; 
        mapping (address => User) Users; // List of Entries 
        mapping (uint256 => address) User_by_idx;
        mapping (string => address) User_by_uuid; // Lookup User address in list by the uuid 
    }


    uint256 public nOffers; 
    mapping (uint256 => Offer) public offers; // List of Offers 
    mapping (address => uint256) public offer_by_user; // Look up Offer Id by user address

    address public validator;

    constructor() {
        // one contract per project
        validator = msg.sender;
        nOffers = 0;  // Starts with 0.  Projects can have multiple offers
    }


    function getOfferCount() public view returns(uint256) {
        return nOffers;
    }


    function createOffer(       
        address _user,
        string memory _title,
        OfferType _offer_type,
        string memory _metadata,
        string memory _link
    ) onlyValidators public {
        require(validator == _user, "Only validators can create offers");
        
        nOffers = nOffers + 1;  // Create new Offer;

        Offer storage newOffer = offers[nOffers-1];
        
        newOffer.project_owner = validator;
        newOffer.title = _title;
        newOffer.offer_type = _offer_type;
        newOffer.metadata = _metadata;
        newOffer.link = _link;
        newOffer.created_time = block.timestamp;

        newOffer.nUsers = 0;
        //offer_by_user[_user] = nUsers;
    }

    function addUserToOffer(       
        address _user,
        uint256 _offer_id,
        string memory _uuid
      
    ) public noDupe(_offer_id, _user, _uuid)
    {
    //    require(noDupe(_offer_id, _user, _uuid), "Can't add user to offer as the user or uuid already exists");
    
        uint newRecNo = offers[_offer_id].nUsers;
        offers[_offer_id].nUsers = newRecNo + 1;  // Create new Record;

        User memory newUser;
        newUser.user = _user;
        newUser.uuid = _uuid;
        newUser.user_idx = newRecNo;
        newUser.init = true;

        newUser.created_time = block.timestamp;

        // mappings
        offers[_offer_id].Users[_user] = newUser; // store the User record
        offers[_offer_id].User_by_idx[newRecNo] = _user; // get the address from the index
        offers[_offer_id].User_by_uuid[_uuid] = _user; // index the user by uuid
    }

    function getWhitelistOffer(uint256 _offer_id) public view returns (
            User[] memory
        ){
        uint resultCount = offers[_offer_id].nUsers;
        
        User[] memory recArray = new User[](resultCount);    
        for (uint i = 0; i < resultCount; i++) {
            address userAddr = offers[_offer_id].User_by_idx[i];
            User storage rec = offers[_offer_id].Users[userAddr];
            recArray[i] = rec;
        }

        return recArray;  
    }


    modifier onlyValidators() {
        // Lock down validation to only the contract owner (project address) for creation of Offers
        // More validators will be added via a DAO nomination and voting mechanism when we go to the main net
        require(msg.sender == validator, "Only validators can call this method.");
        _;
    }

    modifier noDupe(
        uint256 _offer_id, 
        address _user, 
        string memory _uuid) 
    {
        require(offers[_offer_id].User_by_uuid[_uuid]==address(0), "User UUID can only be added to the whitelist once!");
        //address userAddr = offers[_offer_id].User_by_uuid[_uuid];
        require(!offers[_offer_id].Users[_user].init, "User can only be added to the whitelist once!");
        //user = offers[_offer_id].Users[_user];
        //require (userAddr==address(0) && user==bytes4(0x0), "User can only be added to the whitelist once!");
        _;
    }

}