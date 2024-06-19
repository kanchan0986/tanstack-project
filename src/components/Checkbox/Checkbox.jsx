import React, {useState} from 'react'
import { useUpdateTodoMutation } from '../../services/mutation'

export const CheckBox = ({ todo }) => {

  const updateTodoItem = useUpdateTodoMutation()

    const [isChecked, setIsChecked] = useState(todo.checked)
  
    const checkHandler = () => { 
      setIsChecked(prev => !prev)
      updateTodoItem?.mutate(todo)
     }
  
    return (
      <div className='checkbox'>
        <input type="checkbox" checked={isChecked} onChange={checkHandler} id={todo.id} />
        <label htmlFor={todo.id}>{updateTodoItem.isPending ? 'Updating...' : isChecked ? "Read" : "Unread"}</label>
      </div>
    );
  }
