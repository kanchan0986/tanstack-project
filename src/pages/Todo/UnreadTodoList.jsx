import React from 'react'
import { useTodoListQuery, useSpecialTodoListQuery } from '../../services/queries'
import { Link } from 'react-router-dom'
import { CheckBox } from '../../components/Checkbox/Checkbox'

export default function UnreadTodoList() {

    const todoListQuery = useTodoListQuery()

    const checkedTodos = todoListQuery.data?.filter(todo => !todo.checked)
  
    const unreadTodoListQuery = useSpecialTodoListQuery(checkedTodos)
  
    if(unreadTodoListQuery.pending) return <div>Loading...</div>
  
    const unreadTodoList = unreadTodoListQuery.data.map((todo) => (
      <div key={todo.id} className="list-container">
        <Link to={`../${todo.id}`} className="list">
          {todo.title}
        </Link>
        <div className="todoList-actions">
          <CheckBox todo={todo} />
          <button>Delete</button>
        </div>
      </div>
    ));
  
    return (
      <div className='container'>
        <h1>Unread Todo List</h1>
        {unreadTodoList}
      </div>
    )

}
