import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { initilizeBlogs, createBlog, removeBlog, likeBlog } from '../reducers/blogReducer'
import { useSelector } from 'react-redux'

export default function useBlogs(){
    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch()

    const addNewBlog = async newBlog => {
        try {
            await dispatch(createBlog(newBlog))
            dispatch(showNotification({
                message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
                style: 'success'
            }, 5))
        } catch (error) {
            dispatch(showNotification({
                message: error.response?.data?.error || error.message,
                style: 'error'
            }, 5))
        }
    }

    const deleteBlog = async blog => {
        try {
            const deleteBlog = window.confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)
            if(!deleteBlog) return null

            await dispatch(removeBlog(blog.id))

            dispatch(showNotification({
                message: `Blog ${blog.title} by ${blog.author} deleted`,
                style: 'success'
            }, 5))
        } catch (error) {
            console.log(error)
            dispatch(showNotification({
                message: error.response.data.error,
                style: 'error'
            }, 5))
        }
    }

    const updateLikes = async blog => {
        try {
            const updatedBlogData = {
                ...blog,
                likes: blog.likes + 1,
            }

            await dispatch(likeBlog(updatedBlogData))
        } catch (e) {
            dispatch(showNotification({
                message: e.response?.data?.error || e.message,
                style: 'error'
            }, 5))
        }
    }

    useEffect(() => {
        dispatch(initilizeBlogs())
    }, [dispatch])

    return {
        blogs,
        addNewBlog,
        deleteBlog,
        updateLikes
    }
}