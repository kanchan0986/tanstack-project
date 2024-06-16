import { useQueries, useQuery } from "@tanstack/react-query"
import { getTodoItem, getTodoList } from "../api/api"

export const useTodoListQuery = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: () => getTodoList(),
        refetchOnMount: false
    })
}

export const useTodoItemQuery = (id) => {
    return useQuery({
        queryKey: ['todos', { id }],
        queryFn: () => getTodoItem(id),
    })
}

/* -------------------------------------------------------------------------- */
/*                      Dynamic Parallel Queries -- Todos                     */
/* -------------------------------------------------------------------------- */

export const useReadTodoListQueries = (readTodos) => {
    return useQueries({
        queries: (readTodos || []).map(readTodo => ({
            queryKey: ['read-todo', { id: readTodo.id}],
            queryFn: () => getTodoItem(readTodo.id),
            enabled: !!readTodo.id,
            refetchOnMount: false
        })),
        combine: (results) => {
            return (
                {
                    data: results.map(readTodo => readTodo.data),
                    pending: results.some(readTodo => readTodo.isPending)
                }
            )
        }
    })
}

export const useUnreadTodoListQueries = (unreadTodos) => {
    return useQueries({
        queries: (unreadTodos || []).map(unredTodo => ({
            queryKey: ['unread-todo', { id: unredTodo.id}],
            queryFn: () => getTodoItem(unredTodo.id),
            enabled: !!unredTodo.id,
            refetchOnMount: false
        })),
        combine: (results) => {
            return (
                {
                    data: results.map(unredTodo => unredTodo.data),
                    pending: results.some(unredTodo => unredTodo.isPending)
                }
            )
        }
    })
}