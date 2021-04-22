import abi from './VoteABI.json'

const contractFunc = async (eth, payload) => {
    const contract = new eth.Contract(abi, "0x230362a0FDce25c8Eb0cF4BF412b8e2C4B29F217")
    let address = await eth.getAccounts()
    await window.web3.currentProvider.enable();
    let res = null
    console.log(payload)
    try{
        switch(payload.type) {
            case 'addVoterToPoll':
                res = await contract.methods.addVoterToPoll(payload.address, payload.id).send({from: address[0]})
                break

            case 'createPoll':
                res = await contract.methods.createPoll(payload.title, payload.description).send({from: address[0]})
                break
            
            case 'getCreatedPolls':
                res = await contract.methods.getCreatedPolls().call()
                break
            
            case 'getPollInfoByID': 
                res = await contract.methods.getPollInfoByID(payload.id).call()
                break

            case 'getPollResults':
                res = await contract.methods.getPollResults(payload.id).call()
                break

            case 'getVoterPolls':
                res = await contract.methods.getVoterPolls().call()
                break

            case 'endPoll': 
                res = await contract.methods.endPoll(payload.id).send({from: address[0]})
                break

            case 'toVote':
                res = await contract.methods.toVote(payload.vote, payload.id).send({from: address[0]})
                break
        }
    } catch (e) {
        const error = e.message
        throw error === 'execution reverted' ? "There was an error on the server, please try again later" : error.charAt(0).toUpperCase() + error.slice(1)
    }
    console.log(res)
    return res

}

export default contractFunc