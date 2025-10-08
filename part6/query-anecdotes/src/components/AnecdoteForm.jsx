import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useSetNotification } from "../hooks/useNotification"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const setNotification = useSetNotification()

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification(newAnecdote.content, 'CREATE')
    },
    onError: error => {
      console.log(error)
      setNotification(error.response.data.error, 'ERROR')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    createAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
