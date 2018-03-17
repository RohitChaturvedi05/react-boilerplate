import React from "react"
import PropTypes from "prop-types"

const TodoItem = ({ onClick, completed, text }) => {

    return <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </li >
}

TodoItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}

export default TodoItem;