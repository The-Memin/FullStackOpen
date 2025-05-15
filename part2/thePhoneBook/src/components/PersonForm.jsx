
const PersonForm = ({newName, newPhone,onChangeName, onChangePhone, addPerson})=>{

    return (
        <form onSubmit={addPerson}>
            <div>
            name: <input value={newName} onChange={onChangeName}/>
            </div>
            <div>
            number: <input type='tel' value={newPhone} onChange={onChangePhone}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm