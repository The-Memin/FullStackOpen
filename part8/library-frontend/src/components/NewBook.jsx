import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { ADD_BOOK, BOOK_ADDED } from '../queries'
import useHelper from '../hooks/useHelper'
import { useSubscription } from '@apollo/client/react'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const { updateCacheWith } = useHelper()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`New book added: ${addedBook.title}`)
      updateCacheWith(addedBook)
    }
  })

  const [addBook] = useMutation(ADD_BOOK,{
    onError: (error) => {
      props.setNotification({message: error.message, type: 'error'})
    },
    onCompleted: () => {
      props.setNotification({message: `${title} added successfully`, type: 'success'})
      setTitle('')
    },
    update: (cache, { data }) => {
      const newBook = data.addBook

      cache.modify({
        fields: {
          allBooks(existingRefs = [], { args, readField, toReference }) {
            // Filtrado por género (si aplica)
            if (args?.genre && !newBook.genres.includes(args.genre)) {
              return existingRefs
            }

            // Evitar duplicados
            const exists = existingRefs.some(
              ref => readField('id', ref) === newBook.id
            )
            if (exists) return existingRefs

            const newBookRef = toReference(newBook, true)
            return [...existingRefs, newBookRef]
          }
        }
      })
    }

  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    addBook({ variables: { title, author, published: Number(published), genres } })

    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
