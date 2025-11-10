// components/LabelHome.jsx
const LabelHome = ({ name, onLogOut }) => {
    return (
        <header>
            <h2>Blogs</h2>
            <div>
                <span>{name} logged in</span>
                <button onClick={onLogOut} style={{ marginLeft: 10 }}>
                Log out
                </button>
            </div>
        </header>
    )
}

export default LabelHome
