import { Link } from 'react-router-dom'

const User = ({ user }) => {
    if (!user) {
        return null
    }

    if(user.blogs.length === 0) {
        return (
            <main>
                <h2>{user.name}</h2>
                <p>This user has not added any blogs yet.</p>
            </main>
        )
    }

    return (
        <main className="w-full">
            <h2 className="text-3xl font-extrabold mb-2 tracking-tight">
                {user.name}
            </h2>

            <h3 className="text-xl font-bold mb-4">added blogs</h3>

            <div className="flex flex-col gap-4">
                {user.blogs.map((blog) => (
                    <Link to={`/blogs/${blog.id}`}
                        key={blog.id}
                        className="p-3 bg-white hover:bg-blue-200 border-2 border-black shadow-[3px_3px_0_0_#000] font-semibold"
                    >
                        {blog.title}
                    </Link>
                ))}
            </div>
        </main>

    )
}

export default User