import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePaginatedProjectListQuery, useProjectItemQuery } from '../../services/queries'
import Radio from '../../components/Radio/Radio'
import { Link } from 'react-router-dom'
import { useDeleteProjectMutation } from '../../services/mutation'

export default function ProjectItem() {

  const [pageNum, setPageNum] = useState(1)

  const params = useParams()

  const navigate = useNavigate()

  const paginatedProjectListQuery = usePaginatedProjectListQuery({pageNum: pageNum, limit: -1})

  const deleteProjectMutation = useDeleteProjectMutation()

  const projectItemQuery = useProjectItemQuery(params.id)

  if(projectItemQuery.isLoading) return <div>Loading...</div>

  if(projectItemQuery.isError) return <div>{projectItemQuery.error.message}</div>

  const projectItem = projectItemQuery.data

  const deleteProjectHandler = async () => { 
    await deleteProjectMutation.mutateAsync({project: projectItem, pageNum: pageNum, limit: -1})
    navigate('..', {replace: true})
   }

   const prevProjectHandler = () => { 
    setPageNum(prevPageNum => Math.max(prevPageNum - 1, 0)  )
  }
  
  const nextProjectHandler = () => { 
     setPageNum(prevPageNum => prevPageNum + 1)
    }

  return (
    <div className='container todo-item'>
      <h1>Project Name: {projectItem.name}</h1>
      <h3>Project Id: {projectItem.id}</h3>
      <div>
        <h3>Project State:</h3> 
        <Radio project={projectItem} pageNum={pageNum} limit={-1} />            
      </div>
      <div className='action-container'>
        <button className='submit project-delete' onClick={deleteProjectHandler}>{deleteProjectMutation.isPending ? 'Deleting...' : 'Delete Project'}</button>
      </div>
      <Link to='..' onClick={paginatedProjectListQuery.refetch} replace={true}>Back</Link>
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
