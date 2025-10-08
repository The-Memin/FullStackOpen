import { useContext } from 'react'
import NotificationContext from '../notificationContext'

export const useNotificationValue = () => {
    const notifiactionAndDispatch = useContext(NotificationContext)
    return notifiactionAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notifiactionAndDispatch = useContext(NotificationContext)
    return notifiactionAndDispatch[1]
}

export const useSetNotification = () => {
    const dispatch = useNotificationDispatch()

    return (content, type, timeInSeconds = 5) => {
        dispatch({ type, payload: content })
        setTimeout(() => {
            dispatch({ type: 'RESET' })
        }, timeInSeconds * 1000)
    }
}