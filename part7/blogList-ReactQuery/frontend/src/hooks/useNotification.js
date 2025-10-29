import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export const useSetNotification = () => {
    const dispatch = useNotificationDispatch()
    return (content, type, time = 5) => {
        dispatch({ type, payload: content })
        setTimeout(() => {
            dispatch({ type: 'RESET' })
        }, time*1000)
    }
}