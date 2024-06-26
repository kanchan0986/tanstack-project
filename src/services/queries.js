import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query"
import { getPaginatedProjectList, getProjectItem, getTodoItem, getTodoList } from "../api/api"


/* -------------------------------------------------------------------------- */
/*                                    Todos                                   */
/* -------------------------------------------------------------------------- */

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
        queryFn: () => getTodoItem(id)
    })
}

/* -------------------- Dynamic Parallel Queries -- Todos ------------------- */

export const useReadTodoListQueries = (readTodos) => {
    return useQueries({
        queries: (readTodos || []).map(readTodo => ({
            queryKey: ['read-todo', { id: readTodo.id}],
            queryFn: () => getTodoItem(readTodo.id),
            enabled: !!readTodo.id,
            refetchOnMount: false,
            placeholderData: keepPreviousData
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
            refetchOnMount: false,
            placeholderData: keepPreviousData
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




/* -------------------------------------------------------------------------- */
/*                                  Projects                                  */
/* -------------------------------------------------------------------------- */

export const projectQueryKeyFactory = {
    all: ['projects'],
    details: () => [...projectQueryKeyFactory.all, 'details'],
    id: (id) => [...projectQueryKeyFactory.details(),  id ],    
    filter: () => [...projectQueryKeyFactory.all, 'filter'],
    type: (pageNum) => [...projectQueryKeyFactory.filter(), { pageNum }],    
}



export const usePaginatedProjectListQuery = (pageNum = 1) => {
    return useQuery({
        queryKey: projectQueryKeyFactory.type(pageNum),
        queryFn: () => getPaginatedProjectList(pageNum),
        placeholderData: keepPreviousData,
        refetchOnMount: false
    })
}

export const useProjectItemQuery = (id) => {
    return useQuery({
        queryKey: projectQueryKeyFactory.id(id),
        queryFn: () => getProjectItem(id),
        refetchOnMount: false,
    })
}

/* -------------------- Dynamic Parallel Queries -- Projects ------------------- */


export const useDeliveredProjectListQueries = (projects) => {
    return useQueries({
        queries: (projects || []).map(project => ({
            queryKey: projectQueryKeyFactory.id(project.id),
            queryFn: () => getProjectItem(project.id),
            enabled: !!project.id,
            placeholderData: keepPreviousData,
            refetchOnMount: false
        })),
        combine: (projects) => ({
            data: projects.map(deliveredProject => deliveredProject.data),
            pending: projects.some(deliveredProject => deliveredProject.isPending)
        })
    })
}

export const useUndeliveredProjectListQueries = (projects) => {
    return useQueries({
        queries: (projects || []).map(project => ({
            queryKey: projectQueryKeyFactory.id(project.id),
            queryFn: () => getProjectItem(project.id),
            enabled: !!project.id,
            placeholderData: keepPreviousData,
            refetchOnMount: false
        })),
        combine: (projects) => ({
            data: projects.map(undeliveredProject => undeliveredProject.data),
            pending: projects.some(undeliveredProject => undeliveredProject.isPending),
        })
    })
}