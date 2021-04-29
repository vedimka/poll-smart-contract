import abi from './VoteABI.json'
require('dotenv').config()

const contractFunc = async (eth, payload) => {
    const contract = new eth.Contract(abi, process.env.REACT_APP_ADDRESS)
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
            
            case 'getUserPolls':
                res = await contract.methods.getUserPolls(address[0]).call()
                break
            
            case 'getPollInfoByID': 
                res = await contract.methods.getPollInfoByID(address[0],payload.id).call()
                break

            case 'getPollResults':
                res = await contract.methods.getPollResults(payload.id).call()
                break

            case 'endPoll': 
                res = await contract.methods.endPoll(payload.id).send({from: address[0]})
                break

            case 'toVote':
                res = await contract.methods.toVote(payload.vote, payload.id).send({from: address[0]})
                break
            default:
                res = ""
                break
            
        }
    } catch (e) {
        const error = e.message
       if(!error.includes('execution reverted: You are not')){
            throw error.charAt(0).toUpperCase() + error.slice(1)
        }
    }
    return res
}

export default contractFunc