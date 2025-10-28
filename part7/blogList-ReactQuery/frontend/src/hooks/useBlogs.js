import blogService from '../services/blogs'
import { useSetNotification } from './useNotification'
import { useQuery ,useQueryClient, useMutation } from '@tanstack/react-query'

export default function useBlogs(){
    const setNotification = useSetNotification()
    const queryClient = useQueryClient()

    const newBlogMutation = useMutation({
        mutationFn: blogService.create,
        onSuccess: (newBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
            setNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`, 'SUCCESS')
        },
        onError: (error) => {
            setNotification(error.response?.data?.error || 'An error occurred while adding the blog', 'ERROR')
        }
    })

    const deleteBlogMutation = useMutation({
        mutationFn: (blog) => blogService.remove(blog.id),
        onSuccess: (_, deletedBlog) => {
            const blogs = queryClient.getQueryData(['blogs']) || []
            queryClient.setQueryData(['blogs'], blogs.filter(b => b.id !== deletedBlog.id))
            setNotification(`Blog ${deletedBlog.title} deleted success`, 'SUCCESS')
        },
        onError: (error) => {
            setNotification(error.response?.data?.error || 'Error deleting blog', 'ERROR')
        },
    })


    const updateLikesMutation = useMutation({
        mutationFn: blogService.update,
        onSuccess: (updatedBlog) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
            //setNotification(`Blog ${updatedBlog.title} likes updated`, 'SUCCESS')
        },
        onError: (error) => {
            setNotification(error.response?.data?.error || 'An error occurred while updating the blog', 'ERROR')
        }
    })

    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll
    })

    const blogs = result.data || []


    const addNewBlog = newBlog => {
        newBlogMutation.mutate(newBlog)
    }

    const deleteBlog = async blog => {
        deleteBlogMutation.mutate(blog)
    }

    const updateLikes = async blog => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        updateLikesMutation.mutate(updatedBlog)
    }

    return {
        blogs,
        addNewBlog,
        deleteBlog,
        updateLikes
    }
}