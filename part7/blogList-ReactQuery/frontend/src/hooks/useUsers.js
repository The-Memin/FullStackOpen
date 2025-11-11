import usersService from '../services/users'
import { useQuery } from '@tanstack/react-query'

export default function useUsers(){
    const result = useQuery({
        queryKey: ['users'],
        queryFn: usersService.getAll
    })

    const users = result.data || []

    return {
        users,
        ...result
    }
}
