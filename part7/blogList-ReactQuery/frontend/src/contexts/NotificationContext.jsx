import { createContext, useReducer } from 'react'


const notificationReducer = (state, action) => {
    switch (action.type) {
    case 'RESET':
        return null
    case 'ERROR':
        return {
            message: action.payload,
            style: 'error'
        }
    case 'SUCCESS':
        return {
            message: action.payload,
            style: 'success'
        }
    default:
        return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return(
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext