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

