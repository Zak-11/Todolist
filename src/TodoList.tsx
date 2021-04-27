import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type TodoListPropsType = {
    id:string
    todoListID: string
    title:string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title:string, todoListID:string) => void
    removeTask: (taskID: string , todoListID:string) => void
    removeTodoList:(todoListID:string) => void
    changeFilter: (value: FilterValuesType,todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean,todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {
    //const {filter} = props
    const filter = props.filter
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const tasksJSXLle = props.tasks.map(t => {

        const removeTasks = () => {props.removeTask(t.id, props.todoListID)}

        return (
            <li className={t.isDone ? "is-done" : ""}>

                <input
                    onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)}
                    type="checkbox"
                    checked={t.isDone}/>

                <span>{t.title}</span>

                <button onClick={removeTasks}>X</button>
            </li>
        )
    })


    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListID)

        } else {
            setError(true)
        }
        setTitle("")

    }
    const onKeyPressAddTasks = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTask()
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickAllFilter = () => props.changeFilter("all", props.todoListID)
    const onClickActiveFilter = () => props.changeFilter("active", props.todoListID)
    const onClickCompletedFilter = () => props.changeFilter("completed", props.todoListID)
    const onClickRemoveTodoList =() => props.removeTodoList(props.todoListID)
    const errorMessage = error
        ? <div className={"error-message"}>Title is required!</div>
        : null


    return (
        <div>
            <h3>{props.title} <button onClick={ onClickRemoveTodoList}>x</button> </h3>
            <div>
                <input className={error ? "error" : ""}
                       value={title}
                       onChange={onChangeTitle}
                       onKeyPress={onKeyPressAddTasks}
                />
                <button onClick={onClickAddTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksJSXLle}
            </ul>


            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onClickAllFilter}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onClickActiveFilter}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onClickCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}


export default TodoList
