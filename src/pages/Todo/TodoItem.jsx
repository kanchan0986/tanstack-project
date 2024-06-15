import React from 'react'
import { useTodoItemQuery } from '../../services/queries'
import { Link, useParams } from 'react-router-dom'
import { CheckBox } from '../../components/Checkbox/Checkbox'

export default function TodoItem() {

  const params = useParams()

  const todoItemQuery = useTodoItemQuery(params.id)

  if(todoItemQuery.isLoading) return <div>Loading...</div>

  if(todoItemQuery.isError) return <div>{todoItemQuery.error.message}</div>

  const todoItem = todoItemQuery.data

  return (
    <div className='container todo-item'>
      <h1>Todo Title: {todoItem.title}</h1>
      <h3>Todo Id: {todoItem.id}</h3>
      <div>Todo Description: {todoItem.description}</div>
      <CheckBox todo={todoItem}/>
      <Link to='..'>Back</Link>
    </div>
  )
}
