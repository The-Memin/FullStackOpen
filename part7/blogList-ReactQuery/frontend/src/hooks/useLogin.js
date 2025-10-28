import { useState, useEffect } from 'react'
import  loginService  from '../services/login'
import { LOGGED_BLOGAPP_USER } from '../constants/login'
import blogsService from '../services/blogs'
import { useSetNotification } from './useNotification'

export default function useLogin() {
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const setNotificationLogin = useSetNotification()
    const resetErrorMessage = () => {
        setErrorMessage(null)
    }

    const handleLogin = async (username, password) => {
        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem(
                LOGGED_BLOGAPP_USER, JSON.stringify(user)
            )

            blogsService.setToken(user.token)
            setUser(user)
        } catch (error) {
            setNotificationLogin('Wrong credentials', 'ERROR')
        }
    }

    const handleLogOut = () => {
        setUser(null)
        window.localStorage.removeItem(LOGGED_BLOGAPP_USER)
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(LOGGED_BLOGAPP_USER )
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogsService.setToken(user.token)
        }
    },[])

    return {
        user,
        notificationLogin: { message: errorMessage, resetMessage: resetErrorMessage },
        handleLogin,
        handleLogOut
    }
}