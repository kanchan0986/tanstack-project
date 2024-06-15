import { useQueries, useQuery } from "@tanstack/react-query"
import { getTodoItem, getTodoList } from "../api/api"

export const useTodoListQuery = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: () => getTodoList()
    })
}

export const useTodoItemQuery = (id) => {
    return useQuery({
        queryKey: ['todos', { id }],
        queryFn: () => getTodoItem(id)
    })
}

export const useSpecialTodoListQuery = (todos) => {
    return useQueries({
        queries: (todos || []).map(todo => ({
            queryKey: ['special-todo', { id: todo.id}],
            queryFn: () => getTodoItem(todo.id),
        })),
        combine: (results) => {
            return (
                {
                    data: results.map(todo => todo.data),
                    pending: results.some(todo => todo.isPending)
                }
            )
        }
    })
}