import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [textFilter, setTextFilter] = useState('')

  const personsToShow = textFilter == "" 
                      ? persons 
                      : persons.filter(person => person.name.toLowerCase().includes(textFilter.toLowerCase()))

  const handleFilter = (event)=>{
    setTextFilter(event.target.value)
  } 

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
      <div>
        filter show with <input value={textFilter} onChange={handleFilter}/>
      </div>
      <h2>add a new</h2>
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
        personsToShow.map(person => <p key={person.name}>{person.name} {person.phone}</p>)
      }
    </div>
  )
}

export default App