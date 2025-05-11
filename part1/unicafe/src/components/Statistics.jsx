import StatisticLine from "./StatisticLine"
const Statistics = (props)=>{
    return(
        <div className="statistics">
            <h2>Statistics</h2>
            <table>
                <StatisticLine text='good' value={props.good}/>
                <StatisticLine text='neutral' value={props.neutral}/>
                <StatisticLine text='bad' value={props.bad}/>
                <StatisticLine text='all' value={props.all}/>
                <StatisticLine text='average' value={props.average}/>
                <StatisticLine text='positive' value={`${props.positive} %`}/>
            </table>
        </div>
    )
}

export default Statistics