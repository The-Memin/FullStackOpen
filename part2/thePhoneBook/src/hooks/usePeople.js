import { useState, useEffect } from "react";
import personService from '../services/people'
import { typeMessage } from "../constants";
export function usePeople(){
    const [people, setPeople] = useState([]) 
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
        personService
            .getAll()
            .then(initialPeople => setPeople(initialPeople))
    },[])
    
    const setNotificationMessage = (message, type)=>{
        setNotification({
                    message: message,
                    type: type
                })
                setTimeout(() => {
                    setNotification({ message: '', type: '' });
                }, 3000);
    }

    const updatePerson = (person, newPhone) =>{
        const newPersonUpdated = {...person, phone: newPhone}
        
        personService.update(person.id, newPersonUpdated)
            .then( personUpdated =>{
                setPeople(prev => 
                    prev.map( p => p.id !== personUpdated.id ? p : personUpdated)
                )
                setNotificationMessage(`${personUpdated.name} updated`, typeMessage.success)
            } 
                
            ).catch(()=>{
                setNotificationMessage(`Information of ${person.name} has already been removed from server`, typeMessage.error)
                setPeople(prev => {
                    const update = prev.filter(p => p.id !== person.id)
                    return  update
                }
                )
            })
    }

    const addPerson = (event) => {
        event.preventDefault()
        const trimmedName = newName.trim();
        const trimmedPhone = newPhone.trim();

        if (trimmedName === '' || trimmedPhone === '') {
            alert("Please fill in all fields.");
            return;
        }

        const existingPerson = people.find(
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

        personService
            .create(personObject)
            .then(newPerson => {
                setNewName('');
                setNewPhone('');
                setNotificationMessage(`added ${newPerson.name}`, typeMessage.success)
                setPeople(people.concat(newPerson))
            })
            .catch((error)=>{
                console.log(error.response.data.error);
                setNotificationMessage(`${error.response.data.error}`, typeMessage.error)
            })

    }
    
    const deletePerson = (event) => {
        const personId = event.target.id
        const person = people.find(p => p.id === personId)
        
        if(!person) return
        if (!window.confirm(`Delete ${person.name}?`)) return

        personService
            .delete_(personId)
            .then( _ => {
                const newPeople = people.filter(p => p.id !== personId)
                setPeople(newPeople)
                setNotificationMessage(`deleted ${person.name}`, typeMessage.delete)
            })
            .catch(() => {
                alert(`${person.name} was already deleted from the server`)
                setPeople(people.filter(p => p.id !== personId))
            })
    }

    return {
        people,
        newName,
        newPhone,
        notification,
        handleNameChange,
        handlePhoneChange,
        addPerson,
        deletePerson,
    }
}