import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
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
  }

  const { isLoading, isError, data, error}  = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  if(isLoading){
    return <div>Loading data...</div>
  }

  if (isError) {
    return <div>Anecdote service not available due to problems in server</div>  
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
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
    </div>
  )
}

export default App
