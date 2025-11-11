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
        <main>
            <h2>Users</h2>
            {
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th style={thStyle}>blogs created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user.id}>
                                    <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                    <td style={thStyle}>{user.blogs.length}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </main>
    )
}

export default Users