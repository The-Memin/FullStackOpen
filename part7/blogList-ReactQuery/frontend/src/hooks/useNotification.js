import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'
import { useState } from 'react'

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

const useNotification = () => {
    const [notificationMessage, setNotificationMessage] = useState(null)

    const setNotification = notification => {
        setNotificationMessage({
            content: notification.content,
            type: notification.type
        })
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    return{
        notificationMessage,
        setNotification
    }
}

export default useNotification