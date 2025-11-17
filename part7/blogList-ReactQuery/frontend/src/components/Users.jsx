import userService from '../services/users'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Users = () => {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const users = await userService.getAll()
        setUsers(users)
    }
    useEffect(() => {
        fetchUsers()
    }, [])

    const thStyle = { paddingLeft: '20px' }

    return(
        <main className="w-full">
            <h2 className="text-3xl font-bold mb-6 tracking-tight">
                Users
            </h2>

            <table className="w-full border-3 border-black bg-white shadow-[4px_4px_0_0_#000]">
                <thead className="bg-yellow-300 border-b-4 border-black">
                    <tr>
                        <th className="text-left p-3 font-bold border-r-3 border-black">User</th>
                        <th className="text-left p-3 font-bold">Blogs created</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="border-b-3 border-black hover:bg-yellow-200 transition-colors"
                        >
                            <td className="p-3 border-r-3 border-black">
                                <Link
                                    to={`/users/${user.id}`}
                                    className="font-semibold underline decoration-2 hover:bg-black hover:text-white px-1 transition-colors"
                                >
                                    {user.name}
                                </Link>
                            </td>

                            <td className="p-3 font-semibold">
                                {user.blogs.length}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>

    )
}

export default Users