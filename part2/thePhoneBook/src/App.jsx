import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: "222 34 56 78" }
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
    if (newName == "" || newPhone === "") {
      alert("Please fill in all fields")
      return null;
    }
    
    if (persons.some( person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return null;
    }
    
    const personObject = {
      name: newName,
      phone: newPhone
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhone('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input type='tel' value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <p key={person.name}>{person.name} {person.phone}</p>)
      }
    </div>
  )
}

export default App