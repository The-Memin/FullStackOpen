import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client/react"
import { LOGIN } from "../queries"

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            props.setNotification({
                message: error.message || 'An error occurred',
                type: 'error'
            })
        }
    })

    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('library-user-token', token)
            props.setNotification({
                message: 'Login successful',
                type: 'success'
            })
            props.setPage('authors')
        }
    }, [result.data]) // eslint-disable-line

    const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
        setPassword('')
        setUsername('')
    }

    if(!props.show) { return null }

    return (
        <form onSubmit={submit}>
            <div>
                name <input value={username} onChange={({target}) => setUsername(target.value)} />
            </div>
            <div>
                password <input type="password" value={password} onChange={({target})=> setPassword(target.value)}/>
            </div>
            <div>
                <button type="submit">login</button>
            </div>
        </form>
    )
}

export default LoginForm