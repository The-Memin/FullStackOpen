const Statistics = (prosp)=>{
    return(
        <div className="statistics">
            <h2>Statistics</h2>
            <ul>
                <li>good: {prosp.good}</li>
                <li>neutral: {prosp.neutral}</li>
                <li>bad: {prosp.bad}</li>
                <li>all: {prosp.all}</li>
                <li>average: {prosp.average}</li>
                <li>positive: {prosp.positive} %</li>
            </ul>
        </div>
    )
}

export default Statistics