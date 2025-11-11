import useBlogs from '../hooks/useBlogs'
import useLogin from '../hooks/useLogin'
const Blog = ({ blog }) => {
    const { updateLikes, deleteBlog } = useBlogs()
    const { user } = useLogin()
    if (!blog) {
        return null
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <div>{blog.url}</div>
            <div>{blog.likes} likes <button onClick={() => updateLikes(blog)}>like</button></div>
            <div>added by {blog.author}</div>
            {
                (user.id === blog.user) && <button onClick={() => deleteBlog(blog)} className="btn-delete">remove</button>
            }
        </div>
    )
}

export default Blog