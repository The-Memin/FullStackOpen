import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const booksToShow = selectedGenre
    ? books.filter(book => book.genres.includes(selectedGenre))
    : books

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <strong>{selectedGenre || "all genres"}</strong> <br /> <br />
        <div>
          {
            books.flatMap(book => book.genres).filter((value, index, self) => self.indexOf(value) === index).map(genre => (
              <button onClick = {() => setSelectedGenre(genre)} key={genre}>{genre}</button>
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
          {booksToShow.map((a) => (
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
