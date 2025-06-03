import Person from "./Person"
const People = ({peopleToShow, deletePerson})=>{
    console.log(peopleToShow);
    
    return peopleToShow.map(person => 
        <Person key={person.name} deletePerson={deletePerson} id={person.id} name={person.name} phone={person.phone}/>)
}

export default People