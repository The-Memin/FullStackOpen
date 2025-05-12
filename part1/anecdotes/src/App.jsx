import useVotes from './hooks/useVotes'
import anecdotes from './constants'
const App = () => {
    const {
        selected,
        votes,
        mostVoted,
        handleVote,
        handleRandomAnecdote,
    } = useVotes(anecdotes.length);


  return (
    <div className='container'>
      <div>
        <h2>Anecdote of the day</h2>
        <p>
        {anecdotes[selected]}
        </p>
        <p>has {votes[selected] ?? 0} votes</p>
      </div>
      <div className='flex'>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleRandomAnecdote}>next anecdote</button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <p>
        {
          anecdotes[mostVoted]
        }
        </p>
      </div>
    </div>
  )
}

export default App