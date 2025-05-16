import { useState, useEffect } from "react";
import axios from 'axios'
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
        axios.get('http://localhost:3001/persons')
            .then(response =>{
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    },[])
    console.log(persons);
    
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
        id: persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1
        };

        setPersons(persons.concat(personObject));
        setNewName('');
        setNewPhone('');
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