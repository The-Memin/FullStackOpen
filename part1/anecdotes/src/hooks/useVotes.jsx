import { useState } from "react"
import anecdotes from '../constants'
const useVotes = (arrLength)=>{
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(arrLength).fill(0))
    const [mostVoted, setMostVoted] = useState(0)

    const handleRandomAnecdote = ()=>{
        const randomNumber = Math.floor(Math.random()* arrLength)
        setSelected(randomNumber)
    }

    const handleVote = ()=>{
        const updatedVotes = [...votes];
        updatedVotes[selected] += 1;
        setVotes(updatedVotes);

        if (updatedVotes[selected] > updatedVotes[mostVoted]) {
        setMostVoted(selected);
        }
    }

    return{
        selected,
        votes,
        mostVoted,
        handleVote,
        handleRandomAnecdote,
    }
    
}

export default useVotes