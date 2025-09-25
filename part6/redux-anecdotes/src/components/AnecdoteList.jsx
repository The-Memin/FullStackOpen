import { useSelector, useDispatch } from 'react-redux'
import { voteToAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if(state.filter === ''){
            return state.anecdotes
        }
        return state.anecdotes.filter( anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteToAnecdote(id))
    }
    return(
        <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        )}
        </>
    )
}

export default AnecdoteList