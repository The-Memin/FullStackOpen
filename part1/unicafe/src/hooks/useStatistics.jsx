import { useState } from "react"

const useStatistics = () =>{
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const all = good + neutral + bad
    const average = (good + (bad * -1))/ all
    const positive = (good *100) / all

    const handleAddGood = () =>{
        setGood(prev => prev +1)
    }

    const handleAddNeutral = ()=>{
        setNeutral(prev => prev + 1)
    }

    const handleAddBad = () =>{
        setBad(prev => prev + 1)
    }

    return {
        all,
        average: isNaN(average) ? 0:average,
        positive: isNaN(positive)? 0: positive,
        good,
        neutral,
        bad,
        handleAddGood,
        handleAddNeutral,
        handleAddBad,
    }
}

export default useStatistics