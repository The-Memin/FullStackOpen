import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
import { useSetNotification } from '../hooks/useNotification'

const Anecdotes = ({ anecdotes }) => {
    const setNotification = useSetNotification()

    const queryClient = useQueryClient()
    const voteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: updatedAnecdote => {
        console.log(updatedAnecdote)
        const updatedAnecdotes = queryClient.getQueryData(['anecdotes'])
                                    .map( a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
        queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
        }
    })

    const handleVote = (anecdote) => {
        console.log('vote')
        voteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
        setNotification(anecdote.content)
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
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </>
    )
}

export default Anecdotes