import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action){
            state.push(action.payload)
        },
        deleteBlog(state, action){
            return state.filter(blog => blog.id !== action.payload)
        },
        updateBlog(state, action){
            const updatedBlog = action.payload
            return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
        }
    }
})

export const { setBlogs, appendBlog, deleteBlog, updateBlog } = blogSlice.actions

export const initilizeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blogData) => {
    return async dispatch => {
        const newBlog = await blogService.create(blogData)
        dispatch(appendBlog(newBlog))
    }
}

export const removeBlog = (blogId) => {
    return async dispatch => {
        await blogService.remove(blogId)
        dispatch(deleteBlog(blogId))
    }
}

export const likeBlog = (updatedBlogData) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(updatedBlogData)
        dispatch(updateBlog(updatedBlog))
    }
}

export default blogSlice.reducer