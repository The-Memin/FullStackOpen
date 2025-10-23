import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

export default function useBlogs(){
    const [blogs, setBlogs] = useState([])
    const dispatch = useDispatch()

    const addNewBlog = async newBlog => {
        try {
            const createdBlog = await blogService.create(newBlog)
            setBlogs(prev => [...prev, createdBlog])
            dispatch(showNotification({
                message: `A new blog ${createdBlog.title} by ${createdBlog.author} added`,
                style: 'success'
            }, 5))
        } catch (error) {
            dispatch(showNotification({
                message: error.response.data.error,
                style: 'error'
            }, 5))
        }
    }

    const deleteBlog = async blog => {
        try {
            const deleteBlog = window.confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)
            if(!deleteBlog) return null

            await blogService.remove(blog.id)

            const updatedBlogs = blogs.filter(b => b.id !== blog.id)
            setBlogs(updatedBlogs)
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
            const currentBlog = {
                ...blog,
                likes: blog.likes + 1,
            }
            const  updatedBlog = await blogService.update(currentBlog)

            const updatedBlogs = blogs.map(blog => {
                if (blog.id === updatedBlog.id) {
                    return { ...updatedBlog }
                }
                return blog
            })
            setBlogs(updatedBlogs)
        } catch (e) {
            dispatch(showNotification({
                message: e.response.data.error,
                style: 'error'
            }, 5))
        }
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    return {
        blogs,
        addNewBlog,
        deleteBlog,
        updateLikes
    }
}