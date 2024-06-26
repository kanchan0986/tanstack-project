import React from 'react'
import { useDeliveredProjectListQueries, usePaginatedProjectListQuery } from '../../services/queries';
import { Link} from 'react-router-dom';
import Radio from '../../components/Radio/Radio';
import DeleteProjectButton from '../../components/DeleteProjectButton/DeleteProjectButton';

export default function DeliveredProjectList() {

  const pageNum = 1

  const paginatedProjectListQuery = usePaginatedProjectListQuery(pageNum);

  const deliveredProjectListQuery = paginatedProjectListQuery.data?.filter(project => project.state === true)

  const deliveredProjectListQueries = useDeliveredProjectListQueries(deliveredProjectListQuery)

  if(deliveredProjectListQueries.pending) return <div>Loading...</div>

  const deliveredProjectList = deliveredProjectListQueries.data.map((project) => (
    <div key={project.id} className="list-container">
      <Link to={`../${project.id}`} state={{pageNum}} className="list" >
        {project.name}
      </Link>
      <div className="todoList-actions project-list">
        <Radio className='project-list' project={project}  pageNum={pageNum}/>
        <DeleteProjectButton project={project} />
      </div>
    </div>
  ));

  return (
    <div className='container'>
      <h1>Delivered Project List</h1>
      {deliveredProjectList.length > 0 ? deliveredProjectList : 'No Results Found!'}
    </div>
  )
}

