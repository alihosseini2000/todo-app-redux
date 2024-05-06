import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { todoAdded } from '../todos/todoSlice'

function Header() {

    const [text , setText ] = useState("")
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleKeyDown = (e) => {
        const trimmedText = text.trim()
        if (e.which === 13 && trimmedText) {
            dispatch(todoAdded(text))

            setText('')
        }
    }
  return (
    <div className='header'>
        <input
        className='new-todo'
        placeholder='What needs to be done?'
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
         /> 
    </div>
  )
}

export default Header
