import React from 'react'
import { useProjectListQuery } from '../../services/queries'
import { Link } from 'react-router-dom';
import Radio from '../../components/Radio/Radio';
import DeleteProjectButton from '../../components/DeleteProjectButton/DeleteProjectButton';
import ProjectCreationForm from '../../components/ProjectCreationForm/ProjectCreationForm';

export default function ProjectList() {

  const projectListQuery = useProjectListQuery();

  if(projectListQuery.isLoading) return <div>Loading...</div>

  if(projectListQuery.isError) return <div>{projectListQuery.error.message}</div>

  const projectList = projectListQuery.data.map((project) => (
    <div key={project.id} className="list-container">
      <Link to={`${project.id}`} className="list">
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
      <h1>Project List</h1>
      {projectList.length > 0 ? projectList : 'No Results Found!'}
    </div>
  )
}
