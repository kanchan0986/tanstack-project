import React from 'react'
import { useTodoListQuery } from '../../services/queries';
import { Link } from 'react-router-dom';
import { CheckBox } from '../../components/Checkbox/Checkbox'
import DeleteTodoButton from '../../components/DeleteTodoButton/DeleteTodoButton'

export default function Home() {

  /* ---------------------------------- Todos --------------------------------- */

  const todoListQuery = useTodoListQuery()

  if(todoListQuery.isLoading) return <div>Loading...</div>

  if(todoListQuery.isError) return <div>{todoListQuery.error.message}</div>

  const todoList = todoListQuery.data.map((todo) => (
    <div key={todo.id} className="list-container">
      <Link to={`todo/${todo.id}`} className="list">
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
      <h1 className='heading-center'>Welcome to Tanstack Query Homepage</h1>
      <div className='parallel-query-container'>
        <div className='parallel-query-list'>
          <h2>Todo List</h2>
          {todoList.length > 0 ? todoList : 'No Results Found!'}
        </div>
        <div className='parallel-query-list'>
          <h2>Project List</h2>
          {/* {projectList.length > 0 ? projectList : 'No Results Found!'} */}
        </div>
        <div className='parallel-query-list'>
          <h2>Product List</h2>
          {/* {productList.length > 0 ? productList : 'No Results Found!'} */}
        </div>
      </div>
    </div>
  )
}
