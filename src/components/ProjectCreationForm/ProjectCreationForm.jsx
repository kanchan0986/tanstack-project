import React, {useState} from 'react'
import { useCreateProjectMutation } from '../../services/mutation';

export default function ProjectCreationForm(props) {

    const [project, setProject] = useState({
        name: '',
        state: false
    })

    const createProjectItem = useCreateProjectMutation()

    const changeHandler = (event) => { 
        const {name, value} = event.target;
        setProject(prevProject => ({
            ...prevProject,
            [name]: value
        }))
     }  

     const submitHandler = (event) => { 
        event.preventDefault();
        createProjectItem.mutate(project)
        setProject({
            name: '',
            state: false
        })
      }

  return (
    <form onSubmit={submitHandler}>
        <h1>Create Project:</h1>
        <div className="form-container">
            <input type="text" name="name" className="form-title" placeholder='Add Name' value={project.name} onChange={changeHandler}/>
            <button className="submit">{createProjectItem.isPending ? 'Creating Project' : 'Create Project'}</button>
        </div>
    </form>
  )
}
