import { useState } from "react";
export function usePersons(){
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '040-123456', id: 1 },
        { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
      ]) 
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event)=>{
        setNewPhone(event.target.value)
    }

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