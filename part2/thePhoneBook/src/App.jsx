import { useFilterPersons} from './hooks/useFilterPersons'
import { usePersons } from './hooks/usePersons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
const App = () => {
  const {
      persons,
      newName,
      newPhone,
      handleNameChange,
      handlePhoneChange,
      addPerson, 
      deletePerson
  } = usePersons()

  const {personsToShow, textFilter, handleFilterChange} = useFilterPersons(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter textFilter={textFilter} onChangeFilter={handleFilterChange}/>
      <h2>add a new</h2>      
      <PersonForm 
        newName={newName}  
        newPhone={newPhone}
        addPerson={addPerson}
        onChangeName={handleNameChange}
        onChangePhone={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App