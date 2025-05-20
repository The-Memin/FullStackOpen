import { useState } from "react"
const useFilterCountries = (countries)=>{
    const [textFilter, setTextFilter] = useState('')

    const handleFilterChange = (event)=>{
        setTextFilter(event.target.value)
    }

    const trimmerFilter = textFilter.trim().toLowerCase();
    const countriesToShow = trimmerFilter === ""
                            ? []
                            : countries.filter( country => 
                                  country.name.common.toLowerCase().includes(trimmerFilter))
    return{
        textFilter,
        countriesToShow,
        setTextFilter,
        handleFilterChange
    }
}

export default useFilterCountries;