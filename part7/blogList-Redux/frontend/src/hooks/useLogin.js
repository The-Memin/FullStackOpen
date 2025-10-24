import { useEffect } from 'react'
import { LOGGED_BLOGAPP_USER } from '../constants/login'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { loginUser, logoutUser, setUserFromStorage } from '../reducers/userReducer'
import { useSelector } from 'react-redux'

export default function useLogin() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const onLogin = async (username, password) => {
        try {
            await dispatch(loginUser({ username, password }))
        } catch (error) {
            dispatch(showNotification({
                message: 'Wrong username or password',
                style: 'error'
            }, 5))
        }
    }

    const onLogOut = () => {
        dispatch(logoutUser())
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(LOGGED_BLOGAPP_USER )
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUserFromStorage(user))
        }
    },[dispatch])

    return {
        user,
        onLogin,
        onLogOut
    }
}