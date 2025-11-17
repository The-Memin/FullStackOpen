import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import { useRef, useState } from 'react'
import useBlogs from '../hooks/useBlogs'
import { Link } from 'react-router-dom'
import { btn_styles } from '../styles/styles'

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
        <div className=''>
            <h2 className='font-semibold text-2xl mb-5'>Blogs</h2>
            <Togglable className="bg-emerald-50 border-3 border-black shadow-[4px_4px_0_#000] rounded mb-12 py-5 px-8 w-8/12" buttonLabel='Create a new blog' ref={blogRef}>
                <CreateBlogForm addBlog={ addBlog }/>
            </Togglable>
            <div style={ { marginTop: '1em' } }>
                <div className='flex gap-10'>
                    <button className={`${btn_styles} bg-purple-500`} onClick={() => sortBlogsByLikes(SORT.DESC)}>sort by most likes</button>
                    <button className={`${btn_styles} bg-rose-500`} onClick={() => sortBlogsByLikes(SORT.ASC)}>sort by few likes</button>
                </div>
                <div className='flex flex-col mt-6 gap-6 w-8/12'>
                    {blogsToShow.map(blog =>
                        <Link className='bg-white py-3 px-10 border-3 border-black shadow-[3px_3px_0_#000] hover:bg-gray-200' key={blog.id} to={`/blogs/${blog.id}`}>
                            {blog.title}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Blogs