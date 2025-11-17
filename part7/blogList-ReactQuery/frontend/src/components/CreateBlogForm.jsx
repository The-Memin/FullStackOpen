import { useState } from 'react'
import { btn_styles } from '../styles/styles'
const CreateBlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const setters = { title: setTitle, author: setAuthor, url: setUrl }
    const handleChangeText = (field) => (e) => {
        setters[field]?.(e.target.value)
    }

    const onCreateNewBlog = async (e) => {
        e.preventDefault()
        try{
            const newBlog = {
                'title': title,
                'author': author,
                'url': url
            }
            addBlog(newBlog)
            setTitle('')
            setAuthor('')
            setUrl('')
        }catch{
            console.log('ha ocurrido un error')
        }
    }
    return(
        <div>
            <h3 className='pacifico text-2xl mb-5'>create new blog</h3>
            <form className='flex flex-col gap-3 mb-6' onSubmit={onCreateNewBlog}>
                <div className='flex flex-col'>
                    <label htmlFor="title">title:</label>
                    <input className='border-2 p-2 border-black mt-1 rounded bg-white' id='title' type="text" value={title} placeholder='title' onChange={handleChangeText('title')} name="text"/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="author">author:</label>
                    <input className='border-2 border-black p-2 mt-1 rounded bg-white' id='author' type="text" value={author} placeholder='author' onChange={handleChangeText('author')} name="author"/>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="url">url:</label>
                    <input className='border-2 border-black p-2 mt-1 rounded bg-white' id='url' type="text" value={url} placeholder='url' onChange={handleChangeText('url')} name="url"/>
                </div>
                <button className={`${btn_styles} bg-emerald-600 w-fit  mt-2`}  type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateBlogForm