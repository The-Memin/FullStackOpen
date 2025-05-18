import { useState, useEffect } from "react";
import personSevice from '../services/persons'
export function usePersons(){
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event)=>{
        setNewPhone(event.target.value)
    }

    useEffect(()=>{
        personSevice
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
    },[])
    
    const updatePerson = (person, newPhone) =>{
        const newPersonUpdated = {...person, phone: newPhone}
        
        personSevice.update(person.id, newPersonUpdated)
            .then( personUpdated => 
                setPersons(persons.map( p => 
                    p.id !== personUpdated.id? p : personUpdated
                ))
            )
    }

    const addPerson = (event) => {
        event.preventDefault()
        const trimmedName = newName.trim();
        const trimmedPhone = newPhone.trim();

        if (trimmedName === '' || trimmedPhone === '') {
            alert("Please fill in all fields.");
            return;
        }

        const existingPerson = persons.find(
            p => p.name.trim().toLowerCase()=== trimmedName.toLowerCase()
        )
        
        if (existingPerson) {
            const confirmReplace = window.confirm(
                `${trimmedName} is already added to the phonebook. Replace the old number with a new one?`
            )
            if (confirmReplace){
                updatePerson(existingPerson, newPhone)
            }
            return
        }

        const personObject = {
            name: trimmedName,
            phone: trimmedPhone,
        };

        personSevice
            .create(personObject)
            .then(newPerson => {
                setPersons(persons.concat(newPerson))
                setNewName('');
                setNewPhone('');
            })

    }
    
    const deletePerson = (event) => {
        const personId = event.target.id
        const person = persons.find(p => p.id === personId)

        if(!person) return
        if (!window.confirm(`Delete ${person.name}?`)) return

        personSevice
            .delete_(personId)
            .then( _ => {
                const newPersons = persons.filter(p => p.id !== personId)
                setPersons(newPersons)
            })
            .catch(() => {
                alert(`${person.name} was already deleted from the server`)
                setPersons(persons.filter(p => p.id !== personId))
            })
    }

    return {
        persons,
        newName,
        newPhone,
        handleNameChange,
        handlePhoneChange,
        addPerson,
        deletePerson
    }
}