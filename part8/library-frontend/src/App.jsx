import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthorForm from './components/EditAuthorForm'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token') || null)
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)

  const notify = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={() => setPage('editAuthor')}>edit author</button>}
        {token && <button onClick={() => logout()}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        
      </div>
      <Notify notification={notification} />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <Recommendations show={page === 'recommend'} />

      <NewBook setNotification={notify} show={page === 'add'} />

      <EditAuthorForm setNotification={notify} show={page === 'editAuthor'}/>

      <LoginForm setPage={setPage} setToken={setToken} setNotification={notify} show={page === 'login'} />
    </div>
  )
}

const Notify = ({ notification }) => {
  if (!notification) {
    return null
  }
  return (
    <div className={`notify ${notification.type}`}>
      {notification.message}
    </div>
  )
}

export default App
