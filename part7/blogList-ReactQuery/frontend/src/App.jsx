import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import useLogin from './hooks/useLogin'
import Blogs from './components/Blogs'
import Notification from './components/Notification'

const App = () => {
    const { user } = useLogin()

    return (
        <div>
            <Notification/>
            {
                !user ?
                    <h2>Log in to application</h2>:
                    <h2>Blogs</h2>
            }

            {
                !user ?
                    <Togglable buttonLabel="login">
                        <LoginForm />
                    </Togglable>:
                    <Blogs/>
            }
        </div>
    )
}

export default App