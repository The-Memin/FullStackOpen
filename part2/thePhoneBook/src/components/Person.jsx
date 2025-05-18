
const Person = ({name, phone, id, deletePerson})=>{
    return(
        <p>{name} {phone} <button onClick={deletePerson} id={id}>delete</button></p>
    )
}

export default Person