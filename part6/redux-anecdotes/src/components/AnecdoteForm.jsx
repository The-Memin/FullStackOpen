import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/helper'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        const newAnecdote = await anecdoteService.create(content)
        dispatch(createAnecdote(newAnecdote))
        setNotification(dispatch, `created new note: '${content}'`)
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input type="text" name='anecdote'/>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default AnecdoteForm