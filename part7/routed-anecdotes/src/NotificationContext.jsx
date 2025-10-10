import { createContext, useReducer } from 'react'

const NotificationContext = createContext()

const NOTIFICATION_TYPES = {
    ERROR: 'ERROR',
    CREATE: 'CREATE',
    CLEAR: 'CLEAR',
    CUSTOM: 'CUSTOM'
}

const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch(action.type){
        case NOTIFICATION_TYPES.ERROR:
             return { style: 'error', content: `${action.payload}` }
        case NOTIFICATION_TYPES.CREATE:
            return { style: 'create', content: `a new anecdote ${action.payload} created!` }
        case NOTIFICATION_TYPES.CUSTOM:
            return { style: action.payload?.style || 'info', content: action.payload?.content || '' }
        case NOTIFICATION_TYPES.CLEAR:
            return null
        default:
            return state
    }
}

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null) 

    return(
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext