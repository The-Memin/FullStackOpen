import { useState, useEffect } from "react";
import personSevice from '../services/persons'
import { typeMessage } from "../constants";
export function usePersons(){
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [notification, setNotification] = useState({
        message: '',
        type: ''
    })

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
    
    const setNotificationMessage = (message, type)=>{
        setNotification({
                    message: message,
                    type: type
                })
                setTimeout(() => {
                    setNotification({ message: '', type: '' });
                }, 2000);
    }

    const updatePerson = (person, newPhone) =>{
        const newPersonUpdated = {...person, phone: newPhone}
        
        personSevice.update(person.id, newPersonUpdated)
            .then( personUpdated => 
                setPersons(prev => 
                    prev.map( p => p.id !== personUpdated.id ? p : personUpdated)
                )
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
                setNotificationMessage(`added ${newPerson.name}`, typeMessage.success)
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
                setNotificationMessage(`deleted ${person.name}`, typeMessage.delete)
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
        notification,
        handleNameChange,
        handlePhoneChange,
        addPerson,
        deletePerson,
    }
}