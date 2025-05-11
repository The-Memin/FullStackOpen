import useStatistics from "./hooks/useStatistics"
const App = () => {
    // guarda los clics de cada botón en su propio estado
    const {
        good,
        neutral,
        bad,
        handleAddGood,
        handleAddNeutral,
        handleAddBad
    } = useStatistics()

    return (
        <div className="container">
        <div>
            <div className='feedback' >
                <h2>Give Feedback</h2>
                <div className="buttons">
                    <button onClick={handleAddGood}>good</button>
                    <button onClick={handleAddNeutral}>neutral</button>
                    <button onClick={handleAddBad}>bad</button>
                </div>
            </div>
            <div className="statistics">
                <h2>Statistics</h2>
                <ul>
                    <li>good: {good}</li>
                    <li>neutral: {neutral}</li>
                    <li>bad: {bad}</li>
                </ul>
            </div>
        </div>
        </div>
    )
}

export default App