import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
}



export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string,
    todoListID: string

}

type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-Filter"
    filter:FilterValuesType,
    todoListID: string

}
export type ActionUnionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer =
     (todoList: Array<TodoListType>, action:ActionUnionType ): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return   todoList.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodolistID = v1()
            const newTodolist: TodoListType = {id: newTodolistID, title: action.title, filter: "all"}
           return [...todoList, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return todoList.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-Filter":
            return todoList.map(tl => tl.id === action.todoListID ? {...tl, filter:action.filter} : tl)
        default:
            return todoList
    }

}

export  const RemoveTodolistAC = (todolistID:string) : RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", todoListID: todolistID}
}
