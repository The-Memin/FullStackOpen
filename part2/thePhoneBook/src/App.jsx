import { useFilterPersons} from './hooks/useFilterPersons'
import { usePersons } from './hooks/usePersons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const {
      persons,
      newName,
      newPhone,
      notification,
      handleNameChange,
      handlePhoneChange,
      addPerson, 
      deletePerson
  } = usePersons()
  const {personsToShow, textFilter, handleFilterChange} = useFilterPersons(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      {
        notification.message !== '' && <Notification message={notification.message} type={notification.type}/>
      }
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