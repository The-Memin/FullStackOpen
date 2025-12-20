import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS, ME } from "../queries"

const Recommendations = (props) => {
    const booksResult = useQuery(ALL_BOOKS)
    const meResult = useQuery(ME)
    if (!props.show) {
        return null
    }

    if (booksResult.loading && meResult.loading) {
        return <div>loading...</div>
    }

    const books = booksResult.data.allBooks
    const me = meResult.data.me
    const recommendedBooks = books.filter(book => book.genres.includes(me.favoriteGenre))
    return(
        <div>
            <h2>Recommendations</h2>
            <p>Books in your favorite genre <strong>{me.favoriteGenre}</strong></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {recommendedBooks.map((a) => (
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

export default Recommendations