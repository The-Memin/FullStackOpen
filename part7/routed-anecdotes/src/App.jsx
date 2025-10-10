import { useState } from 'react'
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import Menu from './components/Menu'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import { useSetNotification } from './hooks/useNotification'
import { initialAnecdotes } from './data/anecdotes'
import Notification from './components/Notification'
import { useNotificationValue } from './hooks/useNotification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)
  const setNotification = useSetNotification()
  const notification = useNotificationValue()

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
                  ? anecdotes.find( a => a.id === Number(match.params.id))
                  : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(anecdote.content, 'CREATE')
  }

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }
  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    <>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification/>
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}/>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>}/>
        <Route path='/about' element={<About />}/>
        <Route path='/create' element={!notification ? <CreateNew addNew={addNew} /> : <Navigate replace to='/'/>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
