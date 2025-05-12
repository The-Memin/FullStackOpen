import { useState } from 'react'
import anecdotes from './constants'
const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const handleRandomAnecdote = ()=>{
    const randomNumber = Math.floor(Math.random()* anecdotes.length)
    setSelected(randomNumber)
  }

  const handleVote = ()=>{
    setVotes(prevVotes =>(
      {
        ...prevVotes,
        [selected]: (prevVotes[selected] || 0) + 1
      }
    ))
  }

  return (
    <div className='container'>
      <div>
        <p>
        {anecdotes[selected]}
        </p>
        <p>has {votes[selected] ?? 0} votes</p>
      </div>
      <div className='flex'>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleRandomAnecdote}>next anecdote</button>
      </div>
    </div>
  )
}

export default App