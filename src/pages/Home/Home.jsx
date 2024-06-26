import React, {useState} from 'react'
import { usePaginatedProjectListQuery, useTodoListQuery } from '../../services/queries';
import { Link } from 'react-router-dom';
import { CheckBox } from '../../components/Checkbox/Checkbox'
import DeleteTodoButton from '../../components/DeleteTodoButton/DeleteTodoButton'
import Radio from '../../components/Radio/Radio';
import DeleteProjectButton from '../../components/DeleteProjectButton/DeleteProjectButton';

export default function Home() {

  const [pageNum, setPageNum] = useState(1)

  const todoListQuery = useTodoListQuery()

  const paginatedProjectListQuery = usePaginatedProjectListQuery(pageNum);

  if(todoListQuery.isLoading || paginatedProjectListQuery.isLoading) return <div>Loading...</div>

  if(todoListQuery.isError) {
    return <div>{todoListQuery.error.message}</div>
  }else if (paginatedProjectListQuery.isError) {
    return <div>{paginatedProjectListQuery.error.message}</div>
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

  const projectList = paginatedProjectListQuery.data.map((project) => (
    <div key={project.id} className="list-container project">
      <div className="list-background">
        <Link to={`project/${project.id}`} state={{pageNum}} className="list">
          {project.name}
        </Link>
        <div className="action-container">
          <Radio className='project-list' project={project} pageNum={pageNum}/>
          <DeleteProjectButton project={project} pageNum={pageNum} />
        </div>
      </div>
    </div>
  ));

  const prevProjectHandler = () => { 
    setPageNum(prevPageNum => Math.max(prevPageNum - 1, 0)  )
  }
  
  const nextProjectHandler = () => { 
     setPageNum(prevPageNum => prevPageNum + 1)
    }



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
          <div className="pagination">
            <div className="button-box">
              <button className={pageNum <= 1 ? 'submit disabled' : 'submit'} onClick={prevProjectHandler} disabled={pageNum <= 1}>Prev</button>
              <button className={paginatedProjectListQuery.data.length <=1 ? 'submit disabled' : 'submit'} onClick={nextProjectHandler} disabled={paginatedProjectListQuery.data.length <=1}>Next</button>
            </div>
            <div className='loader'>
              {paginatedProjectListQuery.isFetching && !paginatedProjectListQuery.isFetchedAfterMount && <span>Loading.....</span>}
            </div>
          </div>
        </div>
        <div className='parallel-query-list'>
          <h2>Product List</h2>
          {/* {productList.length > 0 ? productList : 'No Results Found!'} */}
        </div>
      </div>
    </div>
  )
}

