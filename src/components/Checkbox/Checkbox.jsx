import React, {useState} from 'react'

export const CheckBox = ({ todo }) => {

    const [isChecked, setIsChecked] = useState(todo.checked)
  
    const checkHandler = () => { 
      setIsChecked(prev => !prev)
     }
  
    return (
      <div>
        <input type="checkbox" checked={isChecked} onChange={checkHandler} id={todo.id} />
        <label htmlFor={todo.id}>{isChecked ? "Read" : "Unread"}</label>
      </div>
    );
  }
