import React, {useCallback} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItenForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Task} from "./Tasks";
import {Delete} from "@material-ui/icons";


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
    removeTodoList: (todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTodolistTitle: (value: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {
    console.log('TodoList')
    // const {filter} = props
    const filter = props.filter

    const getTasksForTodolist = () => {
        switch (props.filter) {
            case "active":
                return props.tasks.filter(t => !t.isDone)
            case "completed":
                return props.tasks.filter(t => t.isDone)
            default:
                return props.tasks
        }
    }

    let newTasks = getTasksForTodolist()


    const onClickAllFilter = useCallback(() => props.changeFilter("all", props.todoListID), [props.changeFilter, props.todoListID])
    const onClickActiveFilter = useCallback(() => props.changeFilter("active", props.todoListID), [props.changeFilter, props.todoListID])
    const onClickCompletedFilter = useCallback(() => props.changeFilter("completed", props.todoListID), [props.changeFilter, props.todoListID])

    const onClickRemoveTodoList = useCallback(() => props.removeTodoList(props.todoListID), [props.removeTodoList, props.todoListID])
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListID)
    }, [props.addTask, props.todoListID])
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

            <ul style={{listStyle: "none", paddingLeft: "0px"}}>
                {
                    newTasks.map(t => {

                        return <Task key={t.id}
                                     task={t}
                                     todoListID={props.id}
                                     removeTask={props.removeTask}
                                     changeTaskStatus={props.changeTaskStatus}
                                     changeTaskTitle={props.changeTaskTitle}/>

                    })
                }

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
})


export default TodoList
