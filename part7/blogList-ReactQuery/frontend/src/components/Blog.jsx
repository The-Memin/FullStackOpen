import useBlogs from '../hooks/useBlogs'
import useLogin from '../hooks/useLogin'
import { useState } from 'react'
import { btn_styles } from '../styles/styles'

const ListComments = ({ blog }) => {
    if (!blog.comments || blog.comments.length === 0) {
        return <p className='mt-10'>No comments yet</p>
    }

    return (
        <ul className='flex flex-col gap-4 mt-8'>
            {blog.comments.map((comment, i) => (
                <li className='public-sans bg-white border-3 border-black shadow-[2px_2px_0_#000] p-6 ' key={`${blog.user}-${i}`}>{comment}</li>
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
        <form className='bg-white border-3 shadow-[3px_3px_0_#000] mt-6 py-6 px-8 flex flex-col items-start gap-4' onSubmit={handleAddComment}>
            <label htmlFor="comment">Add comment</label>
            <textarea className='border-2 border-black p-2 w-8/12' name="comment" id=""></textarea>
            <button className={`${btn_styles} bg-green-500`} type="submit">add</button>
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
        <div className='w-full'>
            <h2 className='text-3xl font-extrabold border-b-2 shadow-[3px_3px_0_#000] w-fit'>{blog.title}</h2>
            <div className='my-6'>

                <div className=' flex bg-white py-3 px-6 border-3 shadow-[3px_3px_0_#000] rounded gap-10 items-center'>

                    <a className='shadow-[3px_3px_0_#000] flex items-center gap-1 bg-amber-300 border-2 border-black py-2 px-4 rounded text-black' href={`https://${blog.url}`} target='_blank' rel="noreferrer">{blog.url} <img className='h-4' src="/link.png" alt="link" /></a>

                    <div className='text-sky-500'>{blog.likes} likes <button  className={`${btn_styles} bg-sky-500 rounded-full`} onClick={() => updateLikes(blog)}>like</button></div>
                    <div className='shadow-[3px_3px_0_#000] flex items-center gap-1 bg-fuchsia-500 border-2 border-black py-2 px-4'>added by {blog.author}</div>
                    {
                        (user.id === blog.user) && <button onClick={() => deleteBlog(blog)} className={`${btn_styles} bg-red-500`}>remove</button>
                    }
                </div>
            </div>
            <div className='mt-10'>
                <h3 className='text-2xl font-bold border-b-2 shadow-[3px_3px_0_#000] w-fit'>comments</h3>
                <div className='flex mt-6 gap-10'>
                    <button className={'border-2 shadow-[3px_3px_0_#000] rounded py-2 px-8 bg-yellow-300 cursor-pointer font-semibold text-black'} onClick={() => setShowCommentForm(false)}>haven´t read this yet</button>
                    <button className='border-2 shadow-[3px_3px_0_#000] py-2 px-8 rounded bg-lime-300 cursor-pointer font-semibold text-black' onClick={() => setShowCommentForm(true)}>add comment</button>
                </div>
                {
                    showCommentForm
                        ? <CommentForm blogId={blog.id} />
                        : <ListComments blog={blog} />
                }
            </div>
        </div>
    )
}

export default Blog