import abi from './VoteABI.json'

const contractFunc = async (eth, payload) => {
    const contract = new eth.Contract(abi, "0x2113Bb01797f2470a79C642F90F3cfD7bcF31F45")
    switch(payload.type) {
        case 'getPollsIDByVoter':
            let address = await eth.getAccounts()
            console.log( await contract.methods.getPoolsIDByVoter(address[0]).call())
            break
        case 'addVoterToPoll':
            break
        case 'createPoll':
            break
        case 'voterPolls':
            break
        
    }
    // const sendReq = async web => {
    //     const contract = new eth.Contract(abi, "0x2113Bb01797f2470a79C642F90F3cfD7bcF31F45")
    //     console.log( await contract.methods.hello().call())
    // }
}

export default contractFunc