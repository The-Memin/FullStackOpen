import { styleMessageClass } from "../constants"

const Notification = ({message, type})=>{
    
    return(
        <div className={`label ${styleMessageClass[type]}`}>{message}</div>
    )
}

export default Notification