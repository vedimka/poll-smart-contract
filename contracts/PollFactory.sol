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
        address[] voters;
    }
    struct Info {
        uint voteID;
        bool owner;
        string [2] info;
        Status status;
    }
    mapping(uint => Poll) private pollsByID;
    mapping(address => uint[]) private userPollsID;
    mapping(address => Info []) private userPolls;
    mapping(uint => address[]) private usersByPollID;
    mapping(address => mapping(uint => uint)) IDToIndex;
    event StartVote(address indexed from, uint voteID);
    event EndVote(address indexed from, uint[3] value, uint pollID);
    event NewVoter(address indexed from, address indexed to, uint pollID);
    event Voted(address indexed from, uint pollID);
    function getPollInfoByID(address _user, uint _pollID) public view returns ( Info memory info) {
        info = Info({
            voteID: pollsByID[_pollID].voteID,
            owner: pollsByID[_pollID].owner == _user,
            info: pollsByID[_pollID].info,
            status : pollsByID[_pollID].status
            });
        }
    function createPoll(string memory _title, string memory _description) public {
        usersByPollID[pollID.current()].push(msg.sender);
        pollsByID[pollID.current()] = Poll({
            voteID : pollID.current(),
            owner: msg.sender,
            info : [_title, _description],
            status : Status.IN_PROGRESS,
            vote : new Vote(msg.sender, _title, _description),
            voters: usersByPollID[pollID.current()]
        });
        addVoterToPoll( msg.sender, pollID.current());
        IDToIndex[msg.sender][pollID.current()] = (userPolls[msg.sender].length - 1);
        userPollsID[msg.sender].push(pollID.current());
        emit StartVote(msg.sender, pollID.current());
        pollID.increment();
    }
    function addVoterToPoll(address _voter, uint _pollID) public {
        require (pollsByID[_pollID].voteID == _pollID, "Voting is not created yet");
        require (pollsByID[_pollID].status == Status.IN_PROGRESS, "Voting has already ended"); //?????
        require (pollsByID[_pollID].owner == msg.sender, "Only the owner can use this method");
        pollsByID[_pollID].vote.addVoter(msg.sender, _voter);
        pollsByID[_pollID].voters.push(_voter);
        userPollsID[_voter].push(_pollID);
        IDToIndex[_voter][ _pollID ] = userPolls[_voter].length ;
        userPolls[_voter].push(getPollInfoByID(_voter, _pollID));
        emit NewVoter(msg.sender, _voter, _pollID);
    }
    function getUserPolls (address _user) public view returns (Info[] memory voterPolls){
        require (userPolls[_user].length != 0, "You are not yet voting");
        voterPolls = userPolls[_user];
        }
    function toVote (Vote.choices _choice , uint _pollID) public {
        require (pollsByID[_pollID].voteID == _pollID, "Voting is not created yet");
        require (pollsByID[_pollID].status == Status.IN_PROGRESS, "Voting has already ended");
        pollsByID[_pollID].vote.vote(msg.sender, _choice );
        emit Voted(msg.sender, _pollID);
    }
    function getPollResults( uint _pollID) public view returns (uint[3] memory pollResult) {
        require (pollsByID[_pollID].voteID == _pollID, "Voting is not created yet");
        require (pollsByID[_pollID].status == Status.DONE, "Voting is not over yet");    
        pollResult = pollsByID[_pollID].vote.getResults();
    }
    function changeStatus( address _user, uint _pollID) private  { 
        // IDToIndex[_voter][_pollID]
        // mapping(address => mapping(uint => uint)) IDToIndex;
        // IDToIndex[msg.sender][pollID.current()] = userPolls[msg.sender].length;
        userPolls [ _user ] [IDToIndex [_user] [_pollID] ].status = Status.DONE;
        // for(uint i = 0; i < userPolls[_user].length ; i++){
        //   userPolls [ _user ] [i].status = getPollInfoByID( userPollsID [_user] [i] ).status;
        // }
    }
    function endPoll( uint _pollID) public {
        require (pollsByID[_pollID].voteID == _pollID, "Voting is not created yet");
        require (pollsByID[_pollID].owner == msg.sender, "Only the owner can use this method");
        pollsByID[_pollID].vote.endVote(msg.sender);
        pollsByID[_pollID].status = Status.DONE;        
        for(uint i = 0; i < pollsByID[_pollID].voters.length; i++) {
          changeStatus(pollsByID[_pollID].voters[i], _pollID);
        }
        uint[3] memory results =  getPollResults(_pollID);
        emit EndVote(msg.sender, results, _pollID);
    }
  }