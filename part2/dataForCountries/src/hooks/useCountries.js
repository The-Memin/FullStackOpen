import countrieService from '../services/countries'
import { useEffect, useState } from "react"
const useCountries = ()=>{
    const [countries, setCountries] = useState([])
    useEffect(() => {
        countrieService.getAll()
        .then(allCountries => setCountries(allCountries)
        )
    }, [])

    return{
        countries,
        setCountries
    }
}

export default useCountries