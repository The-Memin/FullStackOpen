import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import useLogin from './hooks/useLogin'
import Blogs from './components/Blogs'
import Notification from './components/Notification'

const App = () => {
    const { user, handleLogin, handleLogOut } = useLogin()

    return (
        <div>
            <Notification />
            {
                !user ?
                    <h2>Log in to application</h2>:
                    <h2>Blogs</h2>
            }
            {
                !user ?
                    <Togglable buttonLabel="login">
                        <LoginForm onLogin={handleLogin}/>
                    </Togglable> :
                    <Blogs user={user} onLogOut={handleLogOut}/>
            }
        </div>
    )
}

export default App