import abi from './VoteABI.json'

const contractFunc = async (eth, payload) => {
    const contract = new eth.Contract(abi, "0x4663068D094F079814360dd3aAF1ACb9BFc6C4DC")
    let address = await eth.getAccounts()
    await window.web3.currentProvider.enable();
    let res = null
    try{
        switch(payload.type) {
            case 'addVoterToPoll':
                res = await contract.methods.addVoterToPoll(payload.address, payload.id).send({from: address[0]})
                break

            case 'createPoll':
                res = await contract.methods.createPoll(payload.title, payload.description).send({from: address[0]})
                break
            
            case 'getMeCreatedPollsIDs':
                res = await contract.methods.getMeCreatedPolsIDs().call()
                break
            
            case 'getPollInfoByID': 
                res = await contract.methods.getPollInfoByID(payload.id).call()
                break

            case 'getPollResults':
                res = await contract.methods.getPollResults(payload.id).call()
                break

            case 'getVoterPollsIDByAdress':
                res = await contract.methods.getVoterPolsIDByAdress(address[0]).call()
                break

            case 'endPoll': 
                res = await contract.methods.endPoll(payload.id).send({from: address[0]})
                break

            case 'toVote':
                res = await contract.methods.toVote(payload.vote, payload.id).send({from: address[0]})
                break
        }
    } catch (e) {
        res = e.message
    }
    console.log(res)
    return res

}

export default contractFunc