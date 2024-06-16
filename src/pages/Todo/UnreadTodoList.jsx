import React from 'react'
import { useTodoListQuery, useUnreadTodoListQueries } from '../../services/queries'
import { Link } from 'react-router-dom'
import { CheckBox } from '../../components/Checkbox/Checkbox'
import TodoCreationForm from '../../components/TodoCreationForm/TodoCreationForm'
import DeleteTodoButton from '../../components/DeleteTodoButton/DeleteTodoButton'

export default function UnreadTodoList() {

    const todoListQuery = useTodoListQuery()

    const checkedTodos = todoListQuery.data?.filter(todo => !todo.checked)
  
    const unreadTodoListQuery = useUnreadTodoListQueries(checkedTodos)
  
    if(unreadTodoListQuery.pending) return <div>Loading...</div>
  
    const unreadTodoList = unreadTodoListQuery.data.map((todo) => (
      <div key={todo.id} className="list-container">
        <Link to={`../${todo.id}`} className="list">
          {todo.title}
        </Link>
        <div className="todoList-actions">
          <CheckBox todo={todo} />
          <DeleteTodoButton/>
        </div>
      </div>
    ));
  
    return (
      <div className='container'>
        <TodoCreationForm />
        <h1>Unread Todo List</h1>
        {unreadTodoList}
      </div>
    )

}
