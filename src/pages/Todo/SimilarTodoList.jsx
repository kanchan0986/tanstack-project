import React from 'react'
import { useTodoListQuery, useReadTodoListQueries, useUnreadTodoListQueries } from '../../services/queries'
import { Link } from 'react-router-dom'
import { CheckBox } from '../../components/Checkbox/Checkbox'
import DeleteTodoButton from '../../components/DeleteTodoButton/DeleteTodoButton'

export default function SimilarTodoList({ todoItem }) {


    const todoListQuery = useTodoListQuery()

    const readTodoListQuery = todoListQuery?.data?.filter(todo => todo.checked)
  
    const unreadTodoListQuery = todoListQuery?.data?.filter(todo => !todo.checked)

    const readTodoListQuaries = useReadTodoListQueries(readTodoListQuery)

    const unreadTodoListQuaries = useUnreadTodoListQueries(unreadTodoListQuery)

    if(readTodoListQuaries.pending || unreadTodoListQuaries.pending) return <div>Loading...</div>

    const todoList = (todoItem.checked ? readTodoListQuaries : unreadTodoListQuaries).data.map((todo) => (
      <div key={todo.id} className="list-container">
        <Link to={`../${todo.id}`} className="list">
          {todo.title}
        </Link>
        <div className='action-container'>
            <CheckBox todo={todo}/>
            <DeleteTodoButton todo={todo} className="submit"/>
        </div>
      </div>
    ))
    
    const filteredTodoList = todoList.filter(item => item.key !== todoItem.id);

  return (
    <div className='container'>
        <h1>Similar Todo List:</h1>
        <div className='tileList-container'>{filteredTodoList.length ? filteredTodoList : 'No Results Found!'}</div>
    </div>
  )
}