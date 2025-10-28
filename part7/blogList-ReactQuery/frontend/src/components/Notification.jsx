import { useNotificationValue } from '../hooks/useNotification'

const Notification = () => {
    const notification = useNotificationValue()
    if (notification=== null) {
        return null
    }
    return (
        <div className={`notification ${notification.style}`}>
            {notification.message}
        </div>
    )
}

export default Notification