import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { btn_styles } from '../styles/styles'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return{
            toggleVisibility
        }
    })

    return(
        <div className={props.className}>
            <div style={hideWhenVisible}>
                <button className={`${btn_styles} bg-blue-500 hover:bg-blue-300`} onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button className={`${btn_styles} ${props.classBtn} bg-red-500`} onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable