import { createNotification, deleteNotification } from './notificationReducer'

export const setNotification = (dispatch, text) => {
  dispatch(createNotification(`${text}`))
  setTimeout(() => { dispatch(deleteNotification())}, 5000)
}