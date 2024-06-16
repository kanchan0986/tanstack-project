import React from 'react'
import { useReadTodoListQueries, useTodoListQuery } from '../../services/queries';
import { Link } from 'react-router-dom';
import { CheckBox } from '../../components/Checkbox/Checkbox';
import DeleteTodoButton from '../../components/DeleteTodoButton/DeleteTodoButton';

export default function ReadTodoList() {

  const todoListQuery = useTodoListQuery()

  const checkedTodos = todoListQuery.data?.filter(todo => todo.checked)

  const readTodoListQuery = useReadTodoListQueries(checkedTodos)

  if(readTodoListQuery.pending) return <div>Loading...</div>

  const readTodoList = readTodoListQuery.data.map((todo) => (
    <div key={todo.id} className="list-container">
      <Link to={`../${todo.id}`} className="list">
        {todo.title}
      </Link>
      <div className="todoList-actions">
        <CheckBox todo={todo} />
        <DeleteTodoButton todo={todo} />
      </div>
    </div>
  ));

  return (
    <div className='container'>
      <h1>Read Todo List</h1>
      {readTodoList.length > 0 ? readTodoList : 'No Results Found!'}
    </div>
  )

}
