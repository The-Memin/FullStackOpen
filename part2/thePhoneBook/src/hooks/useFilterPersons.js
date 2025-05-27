import { useState } from "react"
export function useFilterPersons(persons){
    const [textFilter, setTextFilter] = useState('')
    
    const handleFilterChange = (event)=>{
        setTextFilter(event.target.value)
    }

     const trimmedFilter = textFilter.trim().toLowerCase();

    const personsToShow = trimmedFilter === "" 
                      ? persons 
                      : persons.filter(person => person.name.toLowerCase().includes(textFilter.toLowerCase()))

    return {
        textFilter,
        handleFilterChange,
        personsToShow
    }
}