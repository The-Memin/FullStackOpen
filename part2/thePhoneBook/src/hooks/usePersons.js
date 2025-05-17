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
        console.log('effect')
        personSevice
            .getAll()
            .then(initialPersons => setPersons(initialPersons))
    },[])
    
    const addPerson = (event) => {
        event.preventDefault()
        const trimmedName = newName.trim();
        const trimmedPhone = newPhone.trim();

        if (trimmedName === '' || trimmedPhone === '') {
            alert("Please fill in all fields.");
            return;
        }

        if (persons.some(person => person.name.toLowerCase() === trimmedName.toLowerCase())) {
            alert(`${trimmedName} is already added to the phonebook.`);
            return;
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
    
    return {
        persons,
        newName,
        newPhone,
        handleNameChange,
        handlePhoneChange,
        addPerson
    }
}