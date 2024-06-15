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