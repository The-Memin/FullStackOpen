import { Routes, Route, Link, useMatch } from 'react-router-dom'
import useLogin from './hooks/useLogin'
import Notification from './components/Notification'
import Home from './components/Home'
import Users from './components/Users'
import ProtectedRoute from './components/ProtectedRoute'
import LabelHome from './components/LabelHome'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Blog from './components/Blog'
import useUsers from './hooks/useUsers'
import useBlogs from './hooks/useBlogs'

const Navigation = () => (
    <nav style={{ marginBottom: 16 }}>
        <Link to="/">Home</Link>
        <Link to="/users" style={{ marginLeft: 10 }}>Users</Link>
    </nav>
)

const useMatchElement = (path, arr) => {
    const match = useMatch(path)
    return match ? arr.find(element => element.id === match.params.id) : null
}

const App = () => {
    const { user, handleLogOut } = useLogin()
    const { users } = useUsers()
    const { blogs } = useBlogs()
    const currentUser = useMatchElement('/users/:id', users || [])
    const currentBlog = useMatchElement('/blogs/:id', blogs || [])

    return (
        <>
            <div className="app-container">
                <Notification />

                {user && <Navigation />}

                {user ? (
                    <LabelHome name={user.name} onLogOut={handleLogOut} />
                ) : (
                    <section>
                        <h2>Log in to application</h2>
                        <Togglable buttonLabel="Login">
                            <LoginForm />
                        </Togglable>
                    </section>
                )}

                <Routes>
                    <Route path="/users/:id" element={<ProtectedRoute> <User user={currentUser}/> </ProtectedRoute>} />
                    <Route path="/blogs/:id" element={<ProtectedRoute> <Blog blog={currentBlog}/> </ProtectedRoute>} />
                    <Route path="/" element={<ProtectedRoute> <Home/> </ProtectedRoute> } />
                    <Route path="/users" element={<ProtectedRoute> <Users /> </ProtectedRoute>} />
                </Routes>
            </div>
        </>
    )
}

export default App
