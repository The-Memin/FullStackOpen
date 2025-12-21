import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS, ALL_GENRES } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre }
  })
  const genresResult = useQuery(ALL_GENRES)
  if (!props.show) {
    return null
  }
  if (result.loading || genresResult.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = genresResult.data.allGenres

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <strong>{selectedGenre || "all genres"}</strong> <br /> <br />
        <div>
          {
            genres.map((genre) => (
              <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>
            ))
          }
          <button onClick={() => setSelectedGenre(null)}>all genres</button>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
