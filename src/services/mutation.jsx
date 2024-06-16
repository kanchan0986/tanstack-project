import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTodoItem, deleteTodoItem, updateTodoItem } from "../api/api"

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
        mutationFn: (todo) => updateTodoItem(todo),
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