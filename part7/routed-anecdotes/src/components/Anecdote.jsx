const Anecdote = ({anecdote}) => {
    const padding = {
        paddingBottom: '1em'
    }

    return(
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <div style={padding}>has {anecdote.votes} votes</div>
            <div style={padding}>for more info see <a href={`${anecdote.info}`} target="_blank" rel="noreferrer">{anecdote.info}</a></div>
        </div>
    )
}

export default Anecdote