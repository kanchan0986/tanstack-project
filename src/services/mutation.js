import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProjectItem, createTodoItem, deleteProjectItem, deleteTodoItem, updateProjectItem, updateTodoItem } from "../api/api"


/* -------------------------------------------------------------------------- */
/*                                    Todos                                   */
/* -------------------------------------------------------------------------- */

export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (todo) => createTodoItem(({...todo, id: crypto.randomUUID(), checked: false})),
        onSettled: async (data, error, variables) => {
            if(error) {
                return error.message
            }else{
              await queryClient.setQueryData(['todos'], (oldData) => [...oldData, data])
            }
        }
    })
}


export const useUpdateTodoMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (todo) => updateTodoItem({...todo, checked: !todo.checked}),
        onSettled: async (data, error, variables) => {
            if(error) {
                console.log(error.message)
            }else{
                await queryClient.invalidateQueries({queryKey: ['todos'], exact: true})
                await queryClient.invalidateQueries({queryKey: ['todos', { id: variables.id }], exact: true})
            }
        }
    })
}

export const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (todo) => deleteTodoItem(todo),
        onSettled: async (data, error, variables) => {
            if(error){
                console.log(error.message)
            }else{
                await queryClient.invalidateQueries({queryKey: ['todos'], exact: true})
            }
        }
    })
}


/* -------------------------------------------------------------------------- */
/*                                  Projects                                  */
/* -------------------------------------------------------------------------- */


export const useCreateProjectMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({project}) => createProjectItem({...project, id: crypto.randomUUID()}),
        onSettled: async (data, error, variables) => {
            if(error) {
                console.log(error.message)
            }else{
                // await queryClient.setQueryData(['projects-paginated', {pageNum: variables.pageNum, limit: variables.limit}], (oldData) => [...oldData, data])
                await queryClient.invalidateQueries({queryKey: ['projects-paginated', {pageNum: variables.pageNum, limit: variables.limit}], exact: true})
            }
        }
    })
}

export const useUpdateProjectMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({project}) => updateProjectItem({...project, state: !project.state}),
        onMutate: (variables) => ({labelId: variables.labelId}),
        onSettled: async (data, error, variables) => {
            if(error) {
                console.log(error.message);
            }else{
                await queryClient.invalidateQueries({queryKey: ['projects-paginated', {pageNum: variables.pageNum, limit: variables.limit}], exact: true})
                await queryClient.invalidateQueries({queryKey: ['projects', {id: variables.id}]});
            }
        }
    })
}


export const useDeleteProjectMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({project}) => deleteProjectItem(project),
        onSettled: async (data, error, variables) => {
            if(error) {
                console.log(error.message)
            }else{
                await queryClient.invalidateQueries({queryKey: ['projects-paginated', {pageNum: variables.pageNum, limit: variables.limit}], exact: true})
            }
        }
    })
}