import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification( _, action){ return action.payload },
        deleteNotification(){ return ''}
    }
})

export const { createNotification, deleteNotification } = notificationSlice.actions

export const setNotification = (text, time) => {
    console.log(text)
    return async dispatch => {
        dispatch(createNotification(`${text}`))
        setTimeout(() => { dispatch(deleteNotification())}, time)
    }
}

export default notificationSlice.reducer