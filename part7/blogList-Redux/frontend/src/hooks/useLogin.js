import { useState, useEffect } from 'react'
import  loginService  from '../services/login'
import { LOGGED_BLOGAPP_USER } from '../constants/login'
import blogsService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

export default function useLogin() {
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

    const handleLogin = async (username, password) => {
        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem(
                LOGGED_BLOGAPP_USER, JSON.stringify(user)
            )

            blogsService.setToken(user.token)
            setUser(user)
        } catch (error) {
            dispatch(showNotification({
                message: 'Wrong username or password',
                style: 'error'
            }, 5))
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
        handleLogin,
        handleLogOut
    }
}