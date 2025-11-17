import useLoginForm from '../hooks/useLoginForm'
import useLogin from '../hooks/useLogin'
import { btn_styles } from '../styles/styles'
const LoginForm = () => {
    const { handleLogin } = useLogin()
    const {
        password,
        username,
        changePassword,
        changeUsername
    } = useLoginForm()

    const login = (e) => {
        e.preventDefault()
        handleLogin({ username, password })
        changePassword('')
        changeUsername('')
    }

    return(
        <div className='mt-8'>
            <form onSubmit={ login} className='flex flex-col gap-2 mb-5'>
                <div className='flex flex-col'>
                    <label htmlFor="username">username</label>
                    <input
                        className='border p-2 border-gray-500 mt-1 rounded'
                        data-testid="username-input"
                        id='username'
                        placeholder='username'
                        type="text"
                        name="username"
                        value={username}
                        onChange={({ target }) => changeUsername(target.value)}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password">password</label>
                    <input
                        className='border p-2 border-gray-500 mt-1 rounded'
                        data-testid="password-input"
                        id='password'
                        placeholder='password'
                        type="password"
                        name="password"
                        value={password}
                        onChange={({ target }) => changePassword(target.value)}
                    />
                </div>
                <button className={`${btn_styles} bg-emerald-500 mt-4`} type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm