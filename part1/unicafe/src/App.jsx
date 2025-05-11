import useStatistics from "./hooks/useStatistics"
import Statistics from "./components/Statistics"
const App = () => {
    // guarda los clics de cada botón en su propio estado
    const {
        all,
        average,
        positive,
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
            <Statistics all={all} average={average} positive={positive} good={good} neutral={neutral} bad={bad}/>
        </div>
        </div>
    )
}

export default App