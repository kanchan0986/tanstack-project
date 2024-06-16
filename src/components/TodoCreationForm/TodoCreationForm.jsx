import React, { useState } from 'react'
import { useCreateTodoMutation } from '../../services/mutation';

export default function TodoCreationForm() {

    const [todo, setTodo] = useState({
        title: '',
        description: ''
    })

    const createTodoItem = useCreateTodoMutation()

    const changeHandler = (event) => { 
        const {name, value} = event.target;
        setTodo(prevTodo => ({
            ...prevTodo,
            [name]: value
        }))
     }  

     const submitHandler = (event) => { 
        event.preventDefault();
        createTodoItem.mutate(todo)
        setTodo({
            title: '',
            description: ''
        })
      }

  return (
    <form onSubmit={submitHandler}>
        <h1>Create Todo:</h1>
        <div className="form-container">
            <input type="text" name="title" className="form-title" placeholder='Add title' value={todo.title} onChange={changeHandler}/>
            <input type="text" name="description" className="form-description" placeholder='Add description' value={todo.description} onChange={changeHandler}/>
            <button className="submit">{createTodoItem.isPending ? 'Creating Todo' : 'Create Todo'}</button>
        </div>
    </form>
  )
}
