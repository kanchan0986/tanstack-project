import React from 'react'
import { usePaginatedProjectListQuery, useUndeliveredProjectListQueries } from '../../services/queries';
import { Link} from 'react-router-dom';
import Radio from '../../components/Radio/Radio';
import DeleteProjectButton from '../../components/DeleteProjectButton/DeleteProjectButton';
import ProjectCreationForm from '../../components/ProjectCreationForm/ProjectCreationForm';

export default function UndeliveredProjectList() {

  const paginatedProjectListQuery = usePaginatedProjectListQuery({pageNum: 1, limit: 10000000 });

  const undeliveredProjectListQuery = paginatedProjectListQuery.data?.filter(project => project.state === false)

  const undeliveredProjectListQueries = useUndeliveredProjectListQueries(undeliveredProjectListQuery)

  if(undeliveredProjectListQueries.pending) return <div>Loading...</div>

  const undeliveredProjectList = undeliveredProjectListQueries.data.map((project) => (
    <div key={project.id} className="list-container">
      <Link to={`../${project.id}`} className="list">
        {project.name}
      </Link>
      <div className="todoList-actions project-list">
        <Radio className='project-list' project={project}/>
        <DeleteProjectButton project={project} />
      </div>
    </div>
  ));

  return (
    <div className='container'>
      <ProjectCreationForm />
      <h1>Delivered Project List</h1>
      {undeliveredProjectList.length > 0 ? undeliveredProjectList : 'No Results Found!'}
    </div>
  )
}

