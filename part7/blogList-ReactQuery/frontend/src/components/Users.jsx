import userService from '../services/users'
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

    return(
        <main>
            <h2>Users</h2>
            {
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th style={{ paddingLeft: '10px' }}>blogs created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td style={{ paddingLeft: '10px' }}>{user.blogs.length}</td>
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