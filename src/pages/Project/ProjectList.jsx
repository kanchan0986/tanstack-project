import React, {useState} from 'react'
import { usePaginatedProjectListQuery } from '../../services/queries'
import { Link } from 'react-router-dom';
import Radio from '../../components/Radio/Radio';
import DeleteProjectButton from '../../components/DeleteProjectButton/DeleteProjectButton';
import ProjectCreationForm from '../../components/ProjectCreationForm/ProjectCreationForm';

export default function ProjectList() {

  const [pageNum, setPageNum] = useState(1)

  const paginatedProjectListQuery = usePaginatedProjectListQuery({pageNum, limit: 5});

  if(paginatedProjectListQuery.isLoading) return <div>Loading...</div>

  if(paginatedProjectListQuery.isError) return <div>{paginatedProjectListQuery.error.message}</div>

  const projectList = paginatedProjectListQuery.data.map((project) => (
    <div key={project.id} className="list-container">
      <Link to={`${project.id}`} className="list">
        {project.name}
      </Link>
      <div className="todoList-actions project-list">
        <Radio className='project-list' project={project} pageNum={pageNum} limit={5}/>
        <DeleteProjectButton project={project} pageNum={pageNum} limit={5} />
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
      <ProjectCreationForm  pageNum={pageNum} limit={5}/>
      <h1>Project List</h1>
      {projectList.length > 0 ? projectList : 'No Results Found!'}
      <div className="pagination">
        <div className="button-box">
          <button className={pageNum <= 1 ? 'submit disabled' : 'submit'} onClick={prevProjectHandler} disabled={pageNum <= 1}>Prev</button>
          <button className={paginatedProjectListQuery.data?.length <=1 ? 'submit disabled' : 'submit'} onClick={nextProjectHandler} disabled={paginatedProjectListQuery.data?.length <=1}>Next</button>
        </div>
        <div className='loader'>
          {paginatedProjectListQuery.isFetching && !paginatedProjectListQuery.isFetchedAfterMount && <span>Loading.....</span>}
        </div>
      </div>
    </div>
  )
}
