/* -------------------------------------------------------------------------- */
/*                                    Todos                                   */
/* -------------------------------------------------------------------------- */

export const getTodoList = async () => {
    const request = await fetch('http://localhost:8080/todos')
    if(!request.ok){
        //
    }
    return await request.json()
}

export const getTodoItem = async (id) => {
    const request = await fetch(`http://localhost:8080/todos/${id}`)
    if(!request.ok) {
        //
    }
    return await request.json()
}

export const createTodoItem = async (todo) => {
    const request = await fetch('http://localhost:8080/todos', {
        method: 'Post',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'Application/json'
        }
    })
    if(!request.ok) {
        //
    }
    return await request.json()
}

export const updateTodoItem = async (todo) => {
    const request = await fetch(`http://localhost:8080/todos/${todo.id}`, {
        method: 'Put',
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'Application/json'
        }
    })
    if(!request.ok) {
        //
    }
    return await request.json()
}

export const deleteTodoItem = async (todo) => {
    const request = await fetch(`http://localhost:8080/todos/${todo.id}`, {
        method: 'Delete',
        headers: {
            'Content-Type': 'Application/json'
        }
    })
    if(!request.ok) {
        //
    }
    return await request.json()
}


/* -------------------------------------------------------------------------- */
/*                                  Projects                                  */
/* -------------------------------------------------------------------------- */


export const getPaginatedProjectList = async (pageNum, limit) => {
    const request = await fetch(`http://localhost:8080/projects?_page=${pageNum}&_limit=${limit}`)
    if(!request.ok) {
        //
    }
    return await request.json()
}

export const getProjectItem = async (id) => {
    const request = await fetch(`http://localhost:8080/projects/${id}`)
    if(!request.ok) {
        //
    }
    return await request.json()
}

export const createProjectItem = async (project) => {
    const request = await fetch('http://localhost:8080/projects', {
        method: 'Post',
        body: JSON.stringify(project),
        headers: {
            'Content-Type': 'Application/json'
        }
    })
    if(!request.ok) {
        //
    }
    return await request.json()
}

export const updateProjectItem = async (project) => {
    const request = await fetch(`http://localhost:8080/projects/${project.id}`, {
        method: 'Put',
        body: JSON.stringify(project),
        headers: {
            'Content-Type': 'Application/json'
        }
    })
    if(!request.ok) {
        //
    }
    return await request.json()
}

export const deleteProjectItem = async (project) => {
    const request = await fetch(`http://localhost:8080/projects/${project.id}`, {
        method: 'Delete',
    })
    if(!request.ok) {
        //
    }
    return await request.json()
}

