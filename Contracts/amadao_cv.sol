// SPDX-License-Identifier: UNLICENSED
pragma abicoder v2;
pragma solidity >=0.5.0 >0.8.0;


contract AmadaoCV {

    enum Source { ETH, DDAO, AMADAO_DISCORD, AMADAO_TWITTER, AMADAO_GITHUB, AMADAO_ESCROW }
    enum Merit { NFT, BADGE, TOKEN, TAG }


    struct Record {
        address user; // FK // wallet local  
        uint256 userIdx; 
        address validator; // wallet addr of user/dao/client/signer of CV entry 
        Source source; 
        Merit merit; 

        string tags;
        string metadata;
        string link;  // Address of NFT, BADGE or other 

        uint256 createdTime; // epoch time
    }

    struct Profile {
        address user; // wallet local 
        address creator; // validator of initial profile
        // Cid s
        string avatar;  

        uint256 createdTime; // epoch time

        //Record[] related records handling
        uint nRecords; 
        mapping (uint256 => Record) records; // List of Entries 
    }

    uint256 public nProfiles; 
    mapping (uint256 => Profile) public profiles; // List of Profiles 
    mapping (address => uint256) public profile_by_user; // Look up Profile Id by user address

    address public validator;

    constructor() {
        validator = msg.sender;
        nProfiles = 0;    // Starts with 0;
    }


    function getProfilesCount() public view returns(uint256) {
        return nProfiles;
    }


    function createProfile(       
        address _user,
        string memory _avatarCid,
        uint256 _createdTime
    ) onlyValidators public {
        require(validator != _user, "Can't make profile for yourself");
        
        nProfiles = nProfiles + 1;  // Create new Profile;

        Profile storage newProfile = profiles[nProfiles-1];
        newProfile.user = _user;
        newProfile.creator = validator;
        newProfile.avatar = _avatarCid;
        newProfile.createdTime = _createdTime;
        newProfile.nRecords = 0;

        profile_by_user[_user] = nProfiles;
    }


    function createProfileRecord(       
        address _user,

        Source _source, 
        Merit _merit,

        string memory _tags,
        string memory _metadata,
        string memory _link,
        uint256 _createdTime
        
    ) onlyValidators public {
        require(validator != _user, "Can't make Records for yourself");
        
        // find user
        uint256 profileIdx = profile_by_user[_user]-1;
    
        uint newRecNo = profiles[profileIdx].nRecords;
        profiles[profileIdx].nRecords = newRecNo + 1;  // Create new Record;

        Record memory newRecord;
        newRecord.user = _user;
        newRecord.validator = validator;

        newRecord.source = _source;
        newRecord.merit = _merit;

        newRecord.tags = _tags;
        newRecord.metadata = _metadata;
        newRecord.link = _link;

        newRecord.createdTime = _createdTime;


        profiles[profileIdx].records[newRecNo] = newRecord;
    }

    function getProfileRecords(address _profileUser) public view returns (
            Record[] memory
        ){

        // find user
        uint256 profileIdx = profile_by_user[_profileUser]-1;

        mapping(uint => Record) storage results = profiles[profileIdx].records;
        uint resultCount = profiles[profileIdx].nRecords;
        
        Record[] memory recArray = new Record[](resultCount);    
        for (uint i = 0; i < resultCount; i++) {
            Record storage rec = results[i];
            recArray[i] = rec;
        }

        return recArray;  
    }


    modifier onlyValidators() {
        // More validators will be added via DAO nomination and voting
        require(msg.sender == validator, "Only validators can call this method.");
        _;
    }

}