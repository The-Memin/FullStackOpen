import useStatistics from "./hooks/useStatistics"
import Statistics from "./components/Statistics"
import Button from "./components/Button"
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
                    <Button onClick={handleAddGood} text='good'/>
                    <Button onClick={handleAddNeutral} text='neutral'/>
                    <Button onClick={handleAddBad} text="bad"/>
                </div>
            </div>
            {
                all > 0?
                <Statistics all={all} average={average} positive={positive} good={good} neutral={neutral} bad={bad}/>
                :
                <p>No feedback given</p>
            }
            </div>
        </div>
    )
}

export default App