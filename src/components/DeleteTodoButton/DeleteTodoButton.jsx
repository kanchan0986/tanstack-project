import React from 'react'
import { useDeleteTodoMutation } from '../../services/mutation'

export default function DeleteTodoButton(props) {

    const deleteTodoMutation = useDeleteTodoMutation()

    const deleteTodoHandler = () => { 
        deleteTodoMutation.mutate(props.todo)
     }

  return (
    <button className={props.className} onClick={deleteTodoHandler}>{deleteTodoMutation.isPending ? 'Deleting...' : 'Delete Todo'}</button>
  )
}
