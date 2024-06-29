import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query"
import { getPaginatedProjectList, getProjectItem, getProjectList, getTodoItem, getTodoList } from "../api/api"


/* -------------------------------------------------------------------------- */
/*                                    Todos                                   */
/* -------------------------------------------------------------------------- */


export const todoQueryKeyFactory = {
    all: ['todos'],
    details: () => [...todoQueryKeyFactory.all, 'details'],
    id: (id) => [...todoQueryKeyFactory.details(),  id ],   
    readTodoDetails: () => [...todoQueryKeyFactory.details(), 'read-todo'],
    readTodoId: (id) => [...todoQueryKeyFactory.readTodoDetails(),  id ],   
    unreadTodoDetails: () => [...todoQueryKeyFactory.details(), 'unread-todo'],
    unreadTodoId: (id) => [...todoQueryKeyFactory.unreadTodoDetails(),  id ],   
}

export const useTodoListQuery = () => {
    return useQuery({
        queryKey: todoQueryKeyFactory.details(),
        queryFn: () => getTodoList(),
        refetchOnMount: false
    })
}

export const useTodoItemQuery = (id) => {
    return useQuery({
        queryKey: todoQueryKeyFactory.id(id),
        queryFn: () => getTodoItem(id),
        refetchOnMount: false,
    })
}

/* -------------------- Dynamic Parallel Queries -- Todos ------------------- */

export const useReadTodoListQueries = (readTodos) => {
    return useQueries({
        queries: (readTodos || []).map(readTodo => ({
            queryKey: todoQueryKeyFactory.readTodoId(readTodo.id),
            queryFn: () => getTodoItem(readTodo.id),
            refetchOnMount: false,
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
            queryKey: todoQueryKeyFactory.unreadTodoId(unredTodo.id),
            queryFn: () => getTodoItem(unredTodo.id),
            refetchOnMount: false,
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
    type: (pageNum, limit) => [...projectQueryKeyFactory.filter(), { pageNum }, { limit }],    
}



export const useProjectListQuery = () => {
    return useQuery({
        queryKey: projectQueryKeyFactory.details(),
        queryFn: () => getProjectList(),
    })
}

export const usePaginatedProjectListQuery = ({pageNum, limit}) => {
    return useQuery({
        queryKey: projectQueryKeyFactory.type(pageNum, limit),
        queryFn: () => getPaginatedProjectList(pageNum, limit),
        placeholderData: keepPreviousData,
    })
}

export const useProjectItemQuery = (id) => {
    return useQuery({
        queryKey: projectQueryKeyFactory.id(id),
        queryFn: () => getProjectItem(id),
        refetchOnMount: false,
        placeholderData: keepPreviousData
    })
}

/* -------------------- Dynamic Parallel Queries -- Projects ------------------- */


export const useDeliveredProjectListQueries = (projects) => {
    return useQueries({
        queries: (projects || []).map(project => ({
            queryKey: projectQueryKeyFactory.id(project.id),
            queryFn: () => getProjectItem(project.id),
            refetchOnMount: false,
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
            refetchOnMount: false,       
        })),
        combine: (projects) => ({
            data: projects.map(undeliveredProject => undeliveredProject.data),
            pending: projects.some(undeliveredProject => undeliveredProject.isPending),
        })
    })
}