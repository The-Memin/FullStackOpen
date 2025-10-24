import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { LOGGED_BLOGAPP_USER } from '../constants/login'

const userSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        clearUser() {
            return null
        }
    }
})

export const { setUser, clearUser } = userSlice.actions

export const loginUser = (credentials) => {
    return async dispatch => {
        const user = await loginService.login(credentials)
        blogService.setToken(user.token)
        window.localStorage.setItem(
            LOGGED_BLOGAPP_USER, JSON.stringify(user)
        )
        dispatch(setUser(user))
    }
}

export const logoutUser = () => {
    return dispatch => {
        dispatch(clearUser())
        window.localStorage.removeItem(LOGGED_BLOGAPP_USER)
    }
}

export const setUserFromStorage = (user) => {
    return async dispatch => {
        dispatch(setUser(user))
        blogService.setToken(user.token)
    }
}

export default userSlice.reducer