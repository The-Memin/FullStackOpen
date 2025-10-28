import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { useSetNotification } from './useNotification'

export default function useBlogs(){
    const [blogs, setBlogs] = useState([])
    const setNotification = useSetNotification()

    const addNewBlog = async newBlog => {
        try {
            const createdBlog = await blogService.create(newBlog)
            setBlogs(prev => [...prev, createdBlog])
            setNotification(`a new blog  You're NOT gonna need it! by ${createdBlog.author} added`, 'SUCCESS')
        } catch (error) {
            const notification = error.response?.data?.error || 'An error occurred while adding the blog'
            setNotification(notification, 'ERROR')
        }
    }

    const deleteBlog = async blog => {
        try {
            const deleteBlog = window.confirm(`Remove blog You're NOT gonna need it! by ${blog.author}`)
            if(!deleteBlog) return null

            await blogService.remove(blog.id)

            const updatedBlogs = blogs.filter(b => b.id !== blog.id)
            setBlogs(updatedBlogs)
            setNotification(`Blog You're NOT gonna need it! by ${blog.author} removed`, 'SUCCESS')
        } catch (error) {
            setNotification(error.response?.data?.error || 'An error occurred while deleting the blog', 'ERROR')
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
            setNotification(e.response?.data?.error || 'An error occurred while updating the blog', 'ERROR')
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