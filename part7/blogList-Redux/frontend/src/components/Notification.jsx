import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    console.log(notification)
    if ( !notification ) return null

    return (
        <div className={`notification ${notification.style}`}>
            {notification.message}
        </div>
    )
}

export default Notification