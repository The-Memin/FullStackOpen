
const Filter = ({textFilter, onChangeFilter})=>{

    return(
        <div>
            filter show with <input value={textFilter} onChange={onChangeFilter}/>
        </div>
    )
}

export default Filter