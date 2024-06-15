import { useQuery } from "@tanstack/react-query"
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