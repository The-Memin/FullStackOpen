import useBlogs from '../hooks/useBlogs'
import useLogin from '../hooks/useLogin'
import { useState } from 'react'

const ListComments = ({ blog }) => {
    if (!blog.comments || blog.comments.length === 0) {
        return <p>No comments yet</p>
    }

    return (
        <ul>
            {blog.comments.map((comment, i) => (
                <li key={`${blog.user}-${i}`}>{comment}</li>
            ))}
        </ul>
    )
}

const CommentForm = ({ blogId }) => {
    const { addComment } = useBlogs()

    const handleAddComment = event => {
        event.preventDefault()
        const content = event.target.comment.value
        addComment(blogId, content)
        event.target.comment.value = ''
    }

    return (
        <form onSubmit={handleAddComment}>
            <input name="comment" />
            <button type="submit">add comment</button>
        </form>
    )
}

const Blog = ({ blog }) => {
    const [showCommentForm, setShowCommentForm] = useState(false)
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
            <h3>comments</h3>
            <div>
                <button onClick={() => setShowCommentForm(false)}>haven´t read this yet</button>
                <button onClick={() => setShowCommentForm(true)}>add comment</button>
            </div>
            {
                showCommentForm
                    ? <CommentForm blogId={blog.id} />
                    : <ListComments blog={blog} />
            }
        </div>
    )
}

export default Blog