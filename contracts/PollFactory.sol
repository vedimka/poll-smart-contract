// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol';
// import "@openzeppelin/contracts/utils/Counters.sol";
// import './Counters.sol';
import './Vote.sol';


contract PollFactory {

    using Counters for Counters.Counter;
    Counters.Counter private pollID;
    
    enum Status { IN_PROGRESS, DONE }
    
    
    struct Poll {
        uint voteID;
        address owner;
        string [2] info;
        Status status;
        Vote vote;
    }
    
    struct Info {
        uint voteID;
        string [2] info;
        Status status;
    }
    
    mapping(uint => Poll) private pollsByID;
    mapping(address => Info []) private creatorPolls;
    mapping(address => Info []) private voterPolls;
    
    mapping(address => mapping(uint => Poll)) private pollsByUser;
    
    event StartVote(address indexed from, uint voteID);
    event EndVote(address indexed from, uint[3] value, uint pollID);
    event NewVoter(address indexed from, address indexed to, uint pollID);
    event Voted(address indexed from, uint pollID);


    function getPollInfoByID(uint _pollID) public view returns ( Info memory ) {
        
        return Info({
            
            voteID: pollsByID[_pollID].voteID,
            info: pollsByID[_pollID].info,
            status : pollsByID[_pollID].status
            
            });
        
        }
    

    function createPoll(string memory _title, string memory _description) public {
        
        pollsByID[pollID.current()] = Poll({
            voteID : pollID.current(),
            owner: msg.sender,
            info : [_title, _description],
            status : Status.IN_PROGRESS,
            vote : new Vote(msg.sender, _title, _description)
        });
        
        addVoterToPoll(msg.sender, pollID.current());
        
        creatorPolls[msg.sender].push(getPollInfoByID(pollID.current()));
        
        emit StartVote(msg.sender, pollID.current());
        
        pollID.increment();
    }
    

    
    function addVoterToPoll(address _voter, uint _pollID) public {
        
        require (pollsByID[_pollID].voteID == _pollID, "Voting is not created yet");
        
        require (pollsByID[_pollID].status == Status.IN_PROGRESS, "Voting has already ended");
        
        require (pollsByID[_pollID].owner == msg.sender, "Only the owner can use this method");
        
        pollsByID[_pollID].vote.addVoter(msg.sender, _voter);
    
        voterPolls[_voter].push(getPollInfoByID(_pollID));

        emit NewVoter(msg.sender, _voter, _pollID);
        
    }


    function getVoterPolls (address _user) public view returns (Info[] memory){
        
        require (voterPolls[_user].length != 0, "You are not yet voting");

        return voterPolls[_user];
        
    }
    
    
    function getCreatedPolls (address _user) public view returns (Info[] memory){ 


        require (creatorPolls[_user].length != 0, "You haven't created any polls yet");
        
        return creatorPolls[_user];
        
        
    }


  
    function toVote (Vote.choices _choice , uint _pollID) public {
        
        require (pollsByID[_pollID].voteID == _pollID, "Voting is not created yet");
        
        require (pollsByID[_pollID].status == Status.IN_PROGRESS, "Voting has already ended");
        
        pollsByID[_pollID].vote.vote(msg.sender, _choice );
        
        emit Voted(msg.sender, _pollID);
    }
    
    
    
    function getPollResults(uint _pollID) public view returns (uint[3] memory) {
        
        require (pollsByID[_pollID].voteID == _pollID, "Voting is not created yet");

        require (pollsByID[_pollID].status == Status.DONE, "Voting is not over yet");    
        
        return pollsByID[_pollID].vote.getResults();

    }
    
    
    function endPoll(uint _pollID, address _owner) public {
   
        require (pollsByID[_pollID].voteID == _pollID, "Voting is not created yet");
        
        require (pollsByID[_pollID].owner == _owner, "Only the owner can use this method");
        
        pollsByID[_pollID].vote.endVote(_owner);
        
        pollsByID[_pollID].status = Status.DONE;
        
        creatorPolls[_owner][_pollID].status = Status.DONE;
        
        voterPolls[_owner][_pollID].status = Status.DONE;

        uint[3] memory results =  getPollResults(_pollID);

        emit EndVote(_owner, results, _pollID);

    }
     
  }
