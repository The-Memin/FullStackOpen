import { createContext, useReducer } from 'react'
import blogService from '../services/blogs'

const UserLoginContext = createContext()

const userReducer = (state, action) => {
    switch(action.type) {
    case 'SET_USER':
        return action.payload
    case 'LOGOUT':
        return null
    default:
        return state
    }
}

export const UserLoginProvider = ({ children }) => {
    const [user, dispatch] = useReducer(userReducer, null)

    const setUser = (userData) => {
        blogService.setToken(userData.token)
        dispatch({ type: 'SET_USER', payload: userData })
    }

    const logout = () => {
        blogService.setToken(null)
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <UserLoginContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserLoginContext.Provider>
    )
}

export default UserLoginContext