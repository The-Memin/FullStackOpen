import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import { useRef, useState } from 'react'
import useBlogs from '../hooks/useBlogs'
import { Link } from 'react-router-dom'

const SORT = {
    ASC: 'asc',
    DESC: 'desc'
}

function sortByLikes(arr, order) {
    if(order === SORT.ASC) return [...arr].sort((a,b) => a.likes-b.likes)
    if(order === SORT.DESC) return [...arr].sort((a,b) => b.likes-a.likes)
    return arr
}

const Blogs = () => {
    const blogRef = useRef()
    const [order, setOrder] = useState(SORT.DESC)

    const {
        blogs,
        addNewBlog,
    } = useBlogs()

    const addBlog = (newBlog) => {
        blogRef.current.toggleVisibility()
        addNewBlog(newBlog)
    }

    const sortBlogsByLikes = (orderType) => {
        setOrder(orderType)
    }

    const blogsToShow = sortByLikes(blogs, order)
    const blogStyle = {
        display: 'block',
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    return(
        <div>
            <h2>Blogs</h2>
            <Togglable buttonLabel='create a new blog' ref={blogRef}>
                <CreateBlogForm addBlog={ addBlog }/>
            </Togglable>
            <div style={ { marginTop: '1em' } }>
                <button onClick={() => sortBlogsByLikes(SORT.DESC)}>sort by most likes</button>
                <button onClick={() => sortBlogsByLikes(SORT.ASC)}>sort by few likes</button>
                <div style={{ marginTop: '1em' }}>
                    {blogsToShow.map(blog =>
                        <Link key={blog.id} to={`/blogs/${blog.id}`} style={blogStyle}>
                            {blog.title}
                        </Link>
                    //<Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} user={user}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Blogs