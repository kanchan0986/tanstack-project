import React from 'react'
import { useProjectListQuery, useTodoListQuery } from '../../services/queries';
import { Link } from 'react-router-dom';
import { CheckBox } from '../../components/Checkbox/Checkbox'
import DeleteTodoButton from '../../components/DeleteTodoButton/DeleteTodoButton'
import Radio from '../../components/Radio/Radio';
import DeleteProjectButton from '../../components/DeleteProjectButton/DeleteProjectButton';

export default function Home() {

  const todoListQuery = useTodoListQuery()

  const projectListQuery = useProjectListQuery();

  if(todoListQuery.isLoading || projectListQuery.isLoading) return <div>Loading...</div>

  if(todoListQuery.isError) {
    return <div>{todoListQuery.error.message}</div>
  }else if (projectListQuery.isError) {
    return <div>{projectListQuery.error.message}</div>
  }

  /* ---------------------------------- Todos --------------------------------- */

  const todoList = todoListQuery.data.map((todo) => (
    <div key={todo.id} className="list-container todo">
      <div className="list-background">
        <Link to={`todo/${todo.id}`} className="list">
          {todo.title}
        </Link>
        <div className="action-container">
          <CheckBox todo={todo} />
          <DeleteTodoButton todo={todo} />
        </div>
      </div>
    </div>
  ));


  /* -------------------------------- Projects -------------------------------- */

  const projectList = projectListQuery.data.map((project) => (
    <div key={project.id} className="list-container project">
      <div className="list-background">
        <Link to={`project/${project.id}`} className="list">
          {project.name}
        </Link>
        <div className="action-container">
          <Radio className='project-list' project={project}/>
          <DeleteProjectButton project={project} />
        </div>
      </div>
    </div>
  ));



  return (
    <div className='container'>
      <h1 className='heading-center'>Welcome to Tanstack Query Homepage</h1>
      <div className='parallel-query-container'>
        <div className='parallel-query-list'>
          <h2>Todo List</h2>
          <div className="parallel-query-row">{todoList.length > 0 ? todoList : 'No Results Found!'}</div>
        </div>
        <div className='parallel-query-list'>
          <h2>Project List</h2>
          <div className="parallel-query-row">{projectList.length > 0 ? projectList : 'No Results Found!'}</div>
        </div>
        <div className='parallel-query-list'>
          <h2>Product List</h2>
          {/* {productList.length > 0 ? productList : 'No Results Found!'} */}
        </div>
      </div>
    </div>
  )
}

