// SPDX-License-Identifier: Apache License 2.0
pragma solidity ^0.8.0;
contract Vote {
    address owner;
    bool isEnded;
    string public title;
    string public description;
    enum choices { YES, NO, ND}
    mapping(choices => uint) voterResults;
    mapping(address => bool) allowedParticipants;
    mapping(address => bool) votedParticipants;
    event StartVote(address indexed from);
    event EndVote(address indexed from, uint[3] value);
    event NewVoter(address indexed from, address indexed to);
    event Voted(address indexed from);
    constructor(address _owner, string memory _title, string memory _description){
        require(bytes(_title).length > 0, "Title is require");
        require(bytes(_description).length > 0, "Description is require");
        owner = _owner;
        title = _title;
        description = _description;
        isEnded = false;
        emit StartVote(_owner);
    }
    function addVoter(address _owner, address voter) public {
        require(owner == _owner, "Only the owner can use this method");
        require(!isEnded, "The current vote has already ended");
        require(!allowedParticipants[voter], "Voter address already exist");
        allowedParticipants[voter] = true;
        emit NewVoter(msg.sender, voter);
    }
    function vote(address voter, choices choice) public {
        require(!isEnded, "The current vote has already ended");
        require(allowedParticipants[voter], "Permission denied to vote");
        require(!votedParticipants[voter], "You have already voted");
        voterResults[choice]++;
        votedParticipants[voter] = true;
        emit Voted(voter);
    }
    function endVote(address _owner) public returns (uint[3] memory){
        require(owner == _owner, "Only the owner can use this method");
        require(!isEnded, "The current vote has already ended");
        isEnded = true;
        uint[3] memory results = getResults();
        emit EndVote(msg.sender, results);
        return results;
    }
    function getResults() public view returns (uint[3] memory) {
        require(isEnded, "You can only get the result after the final vote");
        return [voterResults[choices.YES], voterResults[choices.NO], voterResults[choices.ND]];
    }
}