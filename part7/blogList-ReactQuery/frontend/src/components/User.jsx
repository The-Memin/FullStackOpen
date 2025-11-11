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
        <main>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map(blog => (
                    <li key={blog.id} >
                        {blog.title}
                    </li>
                ))}
            </ul>
        </main>
    )
}

export default User