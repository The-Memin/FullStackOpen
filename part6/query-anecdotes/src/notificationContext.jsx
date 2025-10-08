import { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const NotificationContext = createContext()

const notificationReducer = (_, action) => {
    switch (action.type) {
        case 'ERROR':
            return `${action.payload}`
        case 'VOTE':
            return `anecdote '${action.payload}' voted`
        case 'CREATE':
            return `anecdote '${action.payload}' added`
        case 'RESET':
            return null
        default:
            break;
    }
}

export const NotificationContextProvider = ( props ) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    return(
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            { props.children }
        </NotificationContext.Provider>
    )
}


NotificationContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default NotificationContext