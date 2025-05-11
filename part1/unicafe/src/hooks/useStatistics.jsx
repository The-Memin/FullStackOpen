import { useState } from "react"

const useStatistics = () =>{
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

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
        good,
        neutral,
        bad,
        handleAddGood,
        handleAddNeutral,
        handleAddBad,
    }
}

export default useStatistics