import Part from "./Part";

const Content = ({parts})=>{
    //console.log(parts)
    return(
        <ul>
            {
                parts.map(item=>{
                    return(
                        <Part key={item.id} name={item.name} exercises={item.exercises}/>
                    )
                })
            }
        </ul>
    )
}

export default Content;