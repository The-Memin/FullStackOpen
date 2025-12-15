import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client/react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Select from 'react-select'

const EditAuthorForm = (props) => {
    const authorsResult = useQuery(ALL_AUTHORS)
    const [name, setName] = useState("")
    const [born, setBorn] = useState("")
    
    const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [ { query: ALL_AUTHORS } ],
        onError: (error) => {
            props.setNoticication({message: error.message, type: 'error'})
        },
        onCompleted: () => {
            props.setNotification({message: `${name} updated successfully`, type: 'success'})
        }
    })

    if (!props.show) { return null }

    if (authorsResult.loading) {
        return <div>loading...</div>
    }
    const authors = authorsResult.data.allAuthors


    const submit = async (event) => {
        event.preventDefault()
        editAuthor({ variables: { name, setBornTo: Number(born) } })
        setName('')
        setBorn('')
    }

    return(
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    <span>author:</span>
                    <Select
                        defaultInputValue=""
                        onChange={(selectedOption) => setName(selectedOption.value)}
                        options={
                            authors?.map((author) => ({
                                value: author.name,
                                label: author.name
                            }))
                        }
                    />
                </div>
                <br />
                <div>
                    born <input type="number" value={born} onChange={({target}) => setBorn(target.value)}/>
                </div>
                <br />
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default EditAuthorForm