import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItenForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";


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
    const ulStyles = {listStyle: "none", paddingLeft: "0px"}
    const tasksJSXLElements = props.tasks.map(t => {
        const taskClasses: string = t.isDone ? 'is-done' : ""
        const removeTasks = () => props.removeTask(t.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todoListID)}
        return (

            <li key={t.id} >
               <span className={taskClasses}>
                   <CheckBox>
                       color={"primary"}
                       checked={t.isDone}
                       onChange={changeTaskStatus}
                   </CheckBox>

                 {/*  <input onChange={changeTaskStatus}
                       type="checkbox"
                       checked={t.isDone}
                   />*/}
                <EditableSpan title={t.title}
                              changeTitle={changeTaskTitle}/>
               </span>
                <IconButton
                       onClick={removeTasks}
                       color={"secondary"}>
                    <Delete/>
                </IconButton>
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
                <EditableSpan changeTitle={changeTodolistTitle}
                              title={props.title}/>
                <IconButton
                           onClick={onClickRemoveTodoList}
                           color={"secondary"}>
                    <Delete/>
                </IconButton>
            </h3>


            <AddItemForm addItem={addTask}/>
                 <ul style={ulStyles}>
                    {tasksJSXLElements}
               </ul>
            <div>
                <Button
                    size={"small"}
                    variant={filter === "all" ? "outlined" : "contained"}
                    color={"primary"}
                    onClick={onClickAllFilter}>All
                </Button>
                <Button

                    style={{marginLeft: "3px"}}
                    size={"small"}
                    variant={filter === "active" ? "outlined" : "contained"}
                    color={"primary"}
                    onClick={onClickActiveFilter}>Active
                </Button>
                <Button

                    style={{marginLeft: "3px"}}
                    size={"small"}
                    variant={filter === "completed" ? "outlined" : "contained"}
                    color={"primary"}
                    onClick={onClickCompletedFilter}>Completed
                </Button>
            </div>
        </div>
  );
}


export default TodoList
