import Person from "./Person"
const Persons = ({personsToShow, deletePerson})=>{
    console.log(personsToShow);
    
    return personsToShow.map(person => 
        <Person key={person.name} deletePerson={deletePerson} id={person.id} name={person.name} phone={person.phone}/>)
}

export default Persons