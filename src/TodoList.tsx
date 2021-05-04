import React, { ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItenForm";
import EditableSpan from "./EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


type TodoListPropsType = {
    id: string
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodolistTitle: (value: string, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {

    // const {filter} = props
    const filter = props.filter

    const tasksJSXLle = props.tasks.map(t => {
        const taskClasses: string = t.isDone ? 'is-done' : ""
        const removeTasks = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)

        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todoListID)
        }
        return (
            <li className={taskClasses} key={t.id}>

                <input onChange={changeTaskStatus}
                       type="checkbox"
                       checked={t.isDone}/>
                <EditableSpan title={t.title}
                              changeTitle={changeTaskTitle}/>
                <button onClick={removeTasks}>Del</button>
            </li>
        )
    })


    const onClickAllFilter = () => props.changeFilter("all", props.todoListID)
    const onClickActiveFilter = () => props.changeFilter("active", props.todoListID)
    const onClickCompletedFilter = () => props.changeFilter("completed", props.todoListID)
    const onClickRemoveTodoList = () => props.removeTodoList(props.todoListID)
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.todoListID)
    return (
        <div>
            <h3>
                <EditableSpan changeTitle={changeTodolistTitle} title={props.title}/>
                <button onClick={onClickRemoveTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul>
                {tasksJSXLle}
            </ul>


            <div>
                <button className={filter === "all" ? "active-filter" : ""} onClick={onClickAllFilter}>All
                </button>
                <button className={filter === "active" ? "active-filter" : ""}
                        onClick={onClickActiveFilter}>Active
                </button>
                <button className={filter === "completed" ? "active-filter" : ""}
                        onClick={onClickCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}


export default TodoList
