import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProjectItem, createTodoItem, deleteProjectItem, deleteTodoItem, updateProjectItem, updateTodoItem } from "../api/api"
import { projectQueryKeyFactory, todoQueryKeyFactory } from "./queries"


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
                await queryClient.invalidateQueries({queryKey: todoQueryKeyFactory.details()})
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
                await queryClient.invalidateQueries({queryKey: todoQueryKeyFactory.details(), exact: true, refetchType: 'active'})
                await queryClient.invalidateQueries({queryKey: todoQueryKeyFactory.readTodoDetails(), exact: true, refetchType: 'active'})
                await queryClient.invalidateQueries({queryKey: todoQueryKeyFactory.unreadTodoDetails(), exact: true, refetchType: 'active'})
                await queryClient.invalidateQueries({queryKey: todoQueryKeyFactory.id(variables.id), exact: true, refetchType: 'active'})
                await queryClient.refetchQueries({queryKey: todoQueryKeyFactory.details(), exact: true, type: 'inactive'})
                await queryClient.refetchQueries({queryKey: todoQueryKeyFactory.readTodoDetails(), exact: true, type: 'inactive'})
                await queryClient.refetchQueries({queryKey: todoQueryKeyFactory.unreadTodoDetails(), exact: true, type: 'inactive'})
                await queryClient.refetchQueries({queryKey: todoQueryKeyFactory.id(variables.id), exact: true, type: 'inactive'})
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
                await queryClient.invalidateQueries({queryKey: todoQueryKeyFactory.details(), exact: true, refetchType: 'active'})
                await queryClient.invalidateQueries({queryKey: todoQueryKeyFactory.readTodoDetails(), exact: true, refetchType: 'active'})
                await queryClient.invalidateQueries({queryKey: todoQueryKeyFactory.unreadTodoDetails(), exact: true, refetchType: 'active'})
                await queryClient.refetchQueries({queryKey: todoQueryKeyFactory.details(), exact: true, type: 'inactive'})
                await queryClient.refetchQueries({queryKey: todoQueryKeyFactory.readTodoDetails(), exact: true, type: 'inactive'})
                await queryClient.refetchQueries({queryKey: todoQueryKeyFactory.unreadTodoDetails(), exact: true, type: 'inactive'})
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
        mutationFn: (project) => createProjectItem({...project, id: crypto.randomUUID()}),
        onSettled: async (data, error, variables) => {
            if(error) {
                console.log(error.message)
            }else{
                await queryClient.invalidateQueries({queryKey: projectQueryKeyFactory.all, refetchType: 'active'})
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
                await queryClient.invalidateQueries({queryKey: projectQueryKeyFactory.filter(), refetchType: 'active'});
                await queryClient.invalidateQueries({queryKey: projectQueryKeyFactory.id(data.id), refetchType: 'active'});
                await queryClient.refetchQueries({queryKey: projectQueryKeyFactory.filter(), type: 'inactive'});
                await queryClient.refetchQueries({queryKey: projectQueryKeyFactory.id(data.id), type: 'inactive'});
            }
        }
    })
}


export const useDeleteProjectMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (project) => deleteProjectItem(project),
        onSettled: async (data, error, variables) => {
            if(error) {
                console.log(error.message)
            }else{
                await queryClient.invalidateQueries({queryKey: projectQueryKeyFactory.filter(), refetchType: 'all'});
                await queryClient.refetchQueries({queryKey: projectQueryKeyFactory.filter(), type: 'inactive'});
            }
        }
    })
}