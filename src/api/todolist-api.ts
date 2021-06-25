import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'ca7868e1-6346-4bce-8094-16176a8ce55a'
    }
})

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}


export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists',)
    },

    createTodo() {
        return instance.post<Array<ResponseType<{ item: TodoType }>>>('todo-lists', {title: "newTodolist"},)

    },


    deleteTodo() {
        const todolistId = '0606a79b-b2ef-4b04-8a0a-7efdcdae1b60';
        return instance.delete<Array<ResponseType<{}>>>(`todo-lists/${todolistId}`)

    },


    updateTodolist(todolistId: string, title: string) {

        return instance.put<Array<ResponseType<{}>>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: title},)
    }

}






