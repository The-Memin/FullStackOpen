import { useState } from "react"
export function useFilterPeople(people){
    const [textFilter, setTextFilter] = useState('')
    
    const handleFilterChange = (event)=>{
        setTextFilter(event.target.value)
    }

     const trimmedFilter = textFilter.trim().toLowerCase();

    const peopleToShow = trimmedFilter === "" 
                      ? people 
                      : people.filter(person => person.name.toLowerCase().includes(textFilter.toLowerCase()))

    return {
        textFilter,
        handleFilterChange,
        peopleToShow
    }
}