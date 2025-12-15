import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthorForm from './components/EditAuthorForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)

  const notify = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('editAuthor')}>edit author</button>
      </div>
      <Notify notification={notification} />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook setNotification={notify} show={page === 'add'} />

      <EditAuthorForm setNotification={notify} show={page === 'editAuthor'}/>
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
