import { useEffect } from 'react'
import  loginService  from '../services/login'
import { LOGGED_BLOGAPP_USER } from '../constants/login'
import { useSetNotification } from './useNotification'
import { useContext } from 'react'
import UserLoginContext from '../contexts/UserLoginContext'


export default function useLogin(){
    const { user, setUser, logout } = useContext(UserLoginContext)
    const setNotification = useSetNotification()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(LOGGED_BLOGAPP_USER)
        if (loggedUserJSON) {
            const userData = JSON.parse(loggedUserJSON)
            setUser(userData)
        }
    }, [])

    const handleLogin = async (credentials) => {
        try {
            const userData = await loginService.login(credentials)
            window.localStorage.setItem(
                LOGGED_BLOGAPP_USER, JSON.stringify(userData)
            )
            setUser(userData)
            setNotification(`Welcome back ${userData.name}`, 'SUCCESS')
        } catch (exception) {
            setNotification('Wrong username or password', 'ERROR')
        }
    }

    const handleLogOut = () => {
        window.localStorage.removeItem(LOGGED_BLOGAPP_USER)
        logout()
        setNotification('Logged out successfully', 'SUCCESS')
    }

    return {
        user,
        handleLogin,
        handleLogOut
    }
}