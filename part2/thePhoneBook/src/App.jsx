import { useFilterPeople} from './hooks/useFilterPeople'
import { usePeople } from './hooks/usePeople'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import People from './components/People'
import Notification from './components/Notification'

const App = () => {
  const {
      people,
      newName,
      newPhone,
      notification,
      handleNameChange,
      handlePhoneChange,
      addPerson, 
      deletePerson
  } = usePeople()
  const {peopleToShow, textFilter, handleFilterChange} = useFilterPeople(people)

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
      <People peopleToShow={peopleToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App