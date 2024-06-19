import React, { useState } from 'react'
import { useUpdateProjectMutation } from '../../services/mutation'

export default function Radio(props) {

    const {project, className } = props

    const [isDelivered, setIsDelivered] = useState(JSON.stringify(project.state))

    const updateProjectMutation = useUpdateProjectMutation()

    const changeHandler = (event) => {
        setIsDelivered(event.target.value)
        updateProjectMutation.mutate({project, labelId: event.target.id})
    }

  return (
    <div className='radio'>
        <div className={className ? `radio-types ${className}` : 'radio-types'}>
            <input type="radio" id={`${project.id}_delivered`} onChange={changeHandler} value='true' checked={isDelivered === 'true'} />
            <label htmlFor={`${project.id}_delivered`}>
                {updateProjectMutation.isPending  && updateProjectMutation.context?.labelId === `${project.id}_delivered` ? 'Updating...' : 'Delivered'}
            </label>
        </div>
        <div className={className ? `radio-types ${className}` : 'radio-types'}>
            <input type="radio" id={`${project.id}_undelivered`} onChange={changeHandler} value='false' checked={isDelivered === 'false'} />
            <label htmlFor={`${project.id}_undelivered`}>
                {updateProjectMutation.isPending  && updateProjectMutation.context?.labelId === `${project.id}_undelivered` ? 'Updating...' : 'Undelivered'}
            </label>
        </div>
    </div>
  )
}
