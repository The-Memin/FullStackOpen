import { useNotificationValue } from '../hooks/useNotification'

const Notification = () => {
    const notification = useNotificationValue()
    if (notification=== null) {
        return null
    }
    return (
        <div className={`${notification.style} fixed border-3 border-black shadow-[6px_6px_0px_#000] bg-amber-50 py-4 px-14 rounded transition-all animate-slide-down`}>
            {notification.message}
        </div>
    )
}

export default Notification