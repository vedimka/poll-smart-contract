import abi from './VoteABI.json'

const contractFunc = async (eth, payload) => {
    const contract = new eth.Contract(abi, "0x34a316992aD3099F701341d0d9593505F6c38051")
    let address = await eth.getAccounts()
    await window.web3.currentProvider.enable();
    let res = null
    switch(payload.type) {
        case 'getMeCreatedPollsIDs':
            res = await contract.methods.getMeCreatedPolsIDs()
            console.log(await res.call())
            break
        case 'getVoterPollsIDByAdress':
            res = await contract.methods.getVoterPolsIDByAdress(address[0])
            console.log(await res.call())
            break
        case 'getPollInfoByID': 
            res = await contract.methods.getPollInfoByID(payload.id)
            console.log(await res.call())
            break
        case 'getPollResults':
            res = await contract.methods.getPollResults(payload.id)
            console.log(await res.call())
            break
        case 'createPoll':
            res = await contract.methods.createPoll(payload.title, payload.description)
            console.log(await res.call())
            break
        
    }
}

export default contractFunc