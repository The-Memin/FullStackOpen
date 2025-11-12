import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getComments = async blogId => {
    const response = await axios.get(`${baseUrl}/${blogId}/comments`)
    return response.data
}

const addNewComment = async (blogId, content) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(`${baseUrl}/${blogId}/comments`, { content }, config)
    return response.data
}

const create = async newBlog => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const remove = async blogId => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    return response.data
}

const update = async updatedBlog => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
    return response.data
}

export default { getAll, getComments, create, remove, update, setToken, addNewComment }