import { Routes, Route, Link, useMatch } from 'react-router-dom'
import useLogin from './hooks/useLogin'
import Notification from './components/Notification'
import Home from './components/Home'
import Users from './components/Users'
import ProtectedRoute from './components/ProtectedRoute'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Blog from './components/Blog'
import useUsers from './hooks/useUsers'
import useBlogs from './hooks/useBlogs'
import { btn_styles } from './styles/styles'

const LabelHome = ({ name, onLogOut }) => (
    <span className='' style={{ marginLeft: '1em' }}>
        <span className='public-sans text-sm'>
            {name} logged in
        </span>
        <button className={`${btn_styles} bg-amber-400`} onClick={onLogOut} style={{ marginLeft: 10 }}>logout</button>
    </span>
)

const Navigation = ({ user, onLogOut }) => (
    <div className='flex items-center gap-24 mb-14 w-full'>
        <h1 className='pacifico text-3xl whitespace-nowrap'><a href="/">Blog App</a></h1>
        <nav className='bg-white items-center rounded-lg py-4 px-10 flex gap-4 w-full justify-between border-2 border-black shadow-[2px_2px_0px_#242424]'>
            <div className='flex gap-10'>
                <Link className='hover:text-fuchsia-600' to="/">Blogs</Link>
                <Link className='hover:text-fuchsia-600' to="/users">Users</Link>
            </div>
            <LabelHome name={user.name} onLogOut={onLogOut} />
        </nav>
    </div>
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
        <div className=''>
            <div className="container pt-5 pb-30 px-40 mx-auto border-4 border-black shadow-[8px_8px_0px_#000] min-h-screen bg-emerald-100 flex flex-col items-center rounded-xl">
                <Notification />

                {user ? (

                    <Navigation user={user} onLogOut={handleLogOut} />

                ) : (<>
                    <h1 className='mt-20 text-5xl text-neutral-800 pacifico'>Welcome to Blog App</h1>
                    <section className='mt-20 rounded-lg flex flex-col justify-between bg-white min-h-60 w-[26em] border-4 border-black shadow-[6px_6px_0px_#000] p-8'>
                        <h2 className='text-2xl font-medium'>Log in to application</h2>
                        <Togglable classBtn='w-full' buttonLabel="Login">
                            <LoginForm />
                        </Togglable>
                    </section>
                </>
                )}

                <Routes>
                    <Route path="/users/:id" element={<ProtectedRoute> <User user={currentUser}/> </ProtectedRoute>} />
                    <Route path="/blogs/:id" element={<ProtectedRoute> <Blog blog={currentBlog}/> </ProtectedRoute>} />
                    <Route path="/" element={<ProtectedRoute> <Home/> </ProtectedRoute> } />
                    <Route path="/users" element={<ProtectedRoute> <Users /> </ProtectedRoute>} />
                </Routes>
            </div>
        </div>
    )
}

export default App
