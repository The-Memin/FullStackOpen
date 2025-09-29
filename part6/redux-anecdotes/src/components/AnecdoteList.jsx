import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes, voteAnecdote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        const filtered = state.filter === ''
            ? state.anecdotes
            : state.anecdotes.filter( a => 
                a.content.toLowerCase().includes(state.filter.toLowerCase()))
        return [...filtered].sort((a,b) => b.votes - a.votes)
    })

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
    }

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

    return(
        <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </>
    )
}

export default AnecdoteList