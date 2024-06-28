import React from 'react'
import { useProjectListQuery } from '../../services/queries'
import { Link } from 'react-router-dom'
import { useIsFetching } from '@tanstack/react-query'

export default function PaginatedProjectLinks({ projectItem }) {

    const isFetching = useIsFetching()

    const projectListQuery = useProjectListQuery()

    const currentProjectIndex = projectListQuery.data?.findIndex(project => project.id === projectItem.id)

    const previousProjectItem = projectListQuery.data?.[Math.max(currentProjectIndex - 1, 0)]

    const nextProjectItem = projectListQuery.data?.[currentProjectIndex + 1 || projectListQuery.data.length]

  return (
    <>
      <div className='paginated-project-links'>
        <Link to={`../${previousProjectItem?.id}`} className='submit-link'>Prev</Link>
        <Link to={nextProjectItem ? `../${nextProjectItem?.id}` : '.'} className='submit-link'>Next</Link>
      </div>
      <div className='loader'>
        {isFetching && projectListQuery.isFetchedAfterMount ? <span>Loading.....</span> : <></>}
      </div>
    </>
  )
}
