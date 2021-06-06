import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistID: string
}



export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string,
    todolistID: string

}

export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-Filter"
    filter:FilterValuesType,
    todoListID: string

}

let initialState  : Array<TodoListType>= []

export type ActionUnionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer =
     (state = initialState , action:ActionUnionType ): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return   state.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            return [...state, {id: action.todolistID, title: action.title, filter: "all"} ]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todolistID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-Filter":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter:action.filter} : tl)
        default:
            return state
    }

}

export  const RemoveTodolistAC = (todoListID:string) : RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", todoListID: todoListID}
}
export  const AddTodolistAC = (title: string,) : AddTodoListAT=> {
    return { type: "ADD-TODOLIST", title, todolistID: v1()}
}
export  const ChangeTodolistAC = (todolistID:string,title: string,) :ChangeTodoListTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", title,todolistID}
}
export  const ChangeTodoFilterListAC = ( todoListID: string, filter: FilterValuesType,) :ChangeTodoListFilterAT => {
    return {type: "CHANGE-TODOLIST-Filter", filter, todoListID}
}
