import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes} from './requests'
import { NotificationContextProvider } from './notificationContext'
import Anecdotes from './components/Anecdotes'

const App = () => {

  const { isLoading, isError, data}  = useQuery({
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
    <NotificationContextProvider>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      <Anecdotes anecdotes={anecdotes}/>
      
    </NotificationContextProvider>
  )
}

export default App
