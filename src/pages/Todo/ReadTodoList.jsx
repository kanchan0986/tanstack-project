import React from 'react'
import { useSpecialTodoListQuery, useTodoListQuery } from '../../services/queries';
import { Link } from 'react-router-dom';
import { CheckBox } from '../../components/Checkbox/Checkbox';

export default function ReadTodoList() {

  const todoListQuery = useTodoListQuery()

  const checkedTodos = todoListQuery.data?.filter(todo => todo.checked)

  const readTodoListQuery = useSpecialTodoListQuery(checkedTodos)

  if(readTodoListQuery.pending) return <div>Loading...</div>

  const readTodoList = readTodoListQuery.data.map((todo) => (
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
      <h1>Read Todo List</h1>
      {readTodoList}
    </div>
  )

}
