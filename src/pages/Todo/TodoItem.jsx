import React from 'react'
import { useTodoItemQuery, useTodoListQuery } from '../../services/queries'
import { Link, useParams } from 'react-router-dom'
import { CheckBox } from '../../components/Checkbox/Checkbox'
import DeleteTodoButton from '../../components/DeleteTodoButton/DeleteTodoButton'

export default function TodoItem() {

  const params = useParams()

  const todoListQuery = useTodoListQuery()

  const todoItemQuery = useTodoItemQuery(params.id)

  if(todoItemQuery.isLoading) return <div>Loading...</div>

  if(todoItemQuery.isError) return <div>{todoItemQuery.error.message}</div>

  const todoItem = todoItemQuery.data

  return (
    <div className='container todo-item'>
      <h1>Todo Title: {todoItem.title}</h1>
      <h3>Todo Id: {todoItem.id}</h3>
      <div>Todo Description: {todoItem.description}</div>
      <div className='action-container'>
        <CheckBox todo={todoItem}/>
        <DeleteTodoButton className='submit' />
      </div>
      <Link to='..' onClick={todoListQuery.refetch}>Back</Link>
    </div>
  )
}
