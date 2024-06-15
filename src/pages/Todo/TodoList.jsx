import { useTodoListQuery } from '../../services/queries'
import { Link } from 'react-router-dom'
import { CheckBox } from '../../components/Checkbox/Checkbox'

export default function TodoList() {

  const todoListQuery = useTodoListQuery()

  if(todoListQuery.isLoading) return <div>Loading...</div>

  if(todoListQuery.isError) return <div>{todoListQuery.error.message}</div>

  const todoList = todoListQuery.data.map((todo) => (
    <div key={todo.id} className="list-container">
      <Link to={`${todo.id}`} className="list">
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
      <h1>TodoList</h1>
      {todoList}
    </div>
  )
}