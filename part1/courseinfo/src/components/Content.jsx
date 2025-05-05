import Part from "./Part";

const Content = ({parts})=>{
    console.log(parts)
    return(
        <div>
            {
                parts.map(item=>{
                    return(
                        <Part name={item.name} exercises={item.exercises}/>
                    )
                })
            }
        </div>
    )
}

export default Content;