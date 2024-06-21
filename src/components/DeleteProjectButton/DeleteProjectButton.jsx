import React from 'react'
import { useDeleteProjectMutation } from '../../services/mutation'

export default function DeleteProjectButton(props) {

    const deleteProjectMutation = useDeleteProjectMutation()

    const deleteProjectHandler = () => { 
        deleteProjectMutation.mutate({project: props.project, pageNum: props.pageNum, limit: props.limit})
     }

  return (
    <button className={props.className} onClick={deleteProjectHandler}>{deleteProjectMutation.isPending ? 'Deleting...' : 'Delete Project'}</button>
  )
}
