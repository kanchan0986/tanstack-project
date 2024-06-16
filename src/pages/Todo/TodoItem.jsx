import React from 'react'
import { useTodoItemQuery, useTodoListQuery } from '../../services/queries'
import { Link, useParams } from 'react-router-dom'
import { CheckBox } from '../../components/Checkbox/Checkbox'
import { useDeleteTodoMutation } from '../../services/mutation'

export default function TodoItem() {

  const params = useParams()

  const todoListQuery = useTodoListQuery()

  const deleteTodoMutation = useDeleteTodoMutation()

  const todoItemQuery = useTodoItemQuery(params.id)

  if(todoItemQuery.isLoading) return <div>Loading...</div>

  if(todoItemQuery.isError) return <div>{todoItemQuery.error.message}</div>

  const todoItem = todoItemQuery.data

  const deleteTodoHandler = () => { 
    deleteTodoMutation.mutate(todoItem)
   }

  return (
    <>
      {!deleteTodoMutation.isSuccess ? 
      <div className='container todo-item'>
        <h1>Todo Title: {todoItem.title}</h1>
        <h3>Todo Id: {todoItem.id}</h3>
        <div>Todo Description: {todoItem.description}</div>
        <div className='action-container'>
          <CheckBox todo={todoItem}/>
          <button className='submit' onClick={deleteTodoHandler}>{deleteTodoMutation.isPending ? 'Deleting...' : 'Delete Todo'}</button>
        </div>
        <Link to='..' onClick={todoListQuery.refetch}>Back</Link>
      </div> 
      :
      <div className='container todo-item'>
        <h1>Todo Deleted!</h1>
        <Link to='..' replace={true}>Back</Link>
      </div>
      }
    </>
  )
}
