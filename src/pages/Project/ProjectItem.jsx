import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useProjectItemQuery } from '../../services/queries'
import Radio from '../../components/Radio/Radio'
import { Link } from 'react-router-dom'
import { useDeleteProjectMutation } from '../../services/mutation'

export default function ProjectItem() {

  const params = useParams()

  const navigate = useNavigate()

  const pageNum = useLocation().state.pageNum

  const deleteProjectMutation = useDeleteProjectMutation()

  const projectItemQuery = useProjectItemQuery(params.id)

  if(projectItemQuery.isLoading) return <div>Loading...</div>

  if(projectItemQuery.isError) return <div>{projectItemQuery.error.message}</div>

  const projectItem = projectItemQuery.data

  const deleteProjectHandler = async () => { 
    await deleteProjectMutation.mutateAsync(projectItem)
    navigate('..', {replace: true})
   }

  return (
    <div className='container todo-item'>
      <h1>Project Name: {projectItem.name}</h1>
      <h3>Project Id: {projectItem.id}</h3>
      <div>
        <h3>Project State:</h3> 
        <Radio project={projectItem} pageNum={pageNum} />            
      </div>
      <div className='action-container'>
        <button className='submit project-delete' onClick={deleteProjectHandler}>{deleteProjectMutation.isPending ? 'Deleting...' : 'Delete Project'}</button>
      </div>
      <Link to='..'>Back</Link>
    </div>
  )
}
