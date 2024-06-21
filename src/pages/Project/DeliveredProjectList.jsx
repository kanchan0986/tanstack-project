import React, {useState} from 'react'
import { useDeliveredProjectListQueries, usePaginatedProjectListQuery } from '../../services/queries';
import { Link } from 'react-router-dom';
import Radio from '../../components/Radio/Radio';
import DeleteProjectButton from '../../components/DeleteProjectButton/DeleteProjectButton';

export default function DeliveredProjectList() {

  const [pageNum, setPageNum] = useState(1)

  const paginatedProjectListQuery = usePaginatedProjectListQuery({pageNum, limit: -1});

  const deliveredProjectListQuery = paginatedProjectListQuery.data?.filter(project => project.state === true)

  const deliveredProjectListQueries = useDeliveredProjectListQueries(deliveredProjectListQuery)

  if(deliveredProjectListQueries.pending) return <div>Loading...</div>

  const deliveredProjectList = deliveredProjectListQueries.data.map((project) => (
    <div key={project.id} className="list-container">
      <Link to={`../${project.id}`} className="list">
        {project.name}
      </Link>
      <div className="todoList-actions project-list">
        <Radio className='project-list' project={project} pageNum={pageNum} limit={-1}/>
        <DeleteProjectButton project={project} pageNum={pageNum} limit={-1} />
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
      <h1>Delivered Project List</h1>
      {deliveredProjectList.length > 0 ? deliveredProjectList : 'No Results Found!'}
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

// import React, {useState} from 'react'
// import { useDeliveredProjectListQueries, usePaginatedProjectListQuery } from '../../services/queries';
// import { Link } from 'react-router-dom';
// import Radio from '../../components/Radio/Radio';
// import DeleteProjectButton from '../../components/DeleteProjectButton/DeleteProjectButton';
// import ProjectCreationForm from '../../components/ProjectCreationForm/ProjectCreationForm';

// export default function DeliveredProjectList() {

//   const [pageNum, setPageNum] = useState(1)

//   const paginatedProjectListQuery = usePaginatedProjectListQuery({pageNum, limit: -1});

//   const deliveredProjectListQuery = paginatedProjectListQuery.data?.filter(project => project.state === true)

//   const deliveredProjectListQueries = useDeliveredProjectListQueries(deliveredProjectListQuery)

//   if(deliveredProjectListQueries.pending) return <div>Loading...</div>

//   const deliveredProjectList = deliveredProjectListQueries.data.map((project) => (
//     <div key={project.id} className="list-container">
//       <Link to={`../${project.id}`} className="list">
//         {project.name}
//       </Link>
//       <div className="todoList-actions project-list">
//         <Radio className='project-list' project={project}/>
//         <DeleteProjectButton project={project} />
//       </div>
//     </div>
//   ));

//   const prevProjectHandler = () => { 
//     setPageNum(prevPageNum => Math.max(prevPageNum - 1, 0)  )
//   }
  
//   const nextProjectHandler = () => { 
//      setPageNum(prevPageNum => prevPageNum + 1)
//     }

//   return (
//     <div className='container'>
//       <ProjectCreationForm />
//       <h1>Delivered Project List</h1>
//       {deliveredProjectList.length > 0 ? deliveredProjectList : 'No Results Found!'}
//       <div className="pagination">
//         <div className="button-box">
//           <button className={pageNum <= 1 ? 'submit disabled' : 'submit'} onClick={prevProjectHandler} disabled={pageNum <= 1}>Prev</button>
//           <button className={paginatedProjectListQuery.data.length <=1 ? 'submit disabled' : 'submit'} onClick={nextProjectHandler} disabled={paginatedProjectListQuery.data.length <=1}>Next</button>
//         </div>
//         <div className='loader'>
//           {paginatedProjectListQuery.isFetching && !paginatedProjectListQuery.isFetchedAfterMount && <span>Loading.....</span>}
//         </div>
//       </div>
//     </div>
//   )
// }

