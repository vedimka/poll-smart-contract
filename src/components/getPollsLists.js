import contractFunc from '../connector'

const getPolls = async (eth) => {
    let created = [],
        invited = []
    const polls = await contractFunc(eth, {type: 'getUserPolls'})
    for(let item of polls) {
        let poll = {
            id: +item.voteID,
            title: item.info[0],
            description: item.info[1],
            status: +item.status,
            voted: item.voted
        }
        if(poll.status === 1){
            let results = await contractFunc(eth, {type:'getPollResults', id: poll.id})
            const agree = +results[0],
                    disagree = +results[1],
                    nd = +results[2],
                    sum = agree + disagree + nd
            poll.result = {}
            poll.result.agree = [agree, Math.round(agree / sum * 100) || 0]
            poll.result.disagree = [disagree, Math.round(disagree / sum * 100)|| 0]
            poll.result.nd = [nd, Math.round(nd / sum * 100)|| 0]
        }
        if(item.owner){
            created.push(poll)
        } else {
            invited.push(poll)
        }
    }
    return {created, invited}
}

export default getPolls