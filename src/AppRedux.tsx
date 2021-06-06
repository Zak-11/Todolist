import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import AddItemForm from "./AddItenForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodoFilterListAC,
    ChangeTodolistAC,
    RemoveTodolistAC,} from "./store/Todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTitleTaskStatusAC,
    removeTasksAC,} from "./store/Tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/Stote";


export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const  tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const  todoList = useSelector<AppRootStateType, TodoListType[]>(state => state.todoList)

   const   dispatch = useDispatch()

    function removeTask(taskID: string, todoListID: string) {
        dispatch( removeTasksAC(taskID, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID))
    }
    function changeTaskStatus(taskID: string, isDone: boolean,  todoListID: string) {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }
    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        dispatch(changeTitleTaskStatusAC(taskID, newTitle,todoListID))
    }

    function getTasksForTodolist(todoList: TodoListType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    // todoLists:

    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatch(ChangeTodoFilterListAC(todoListID,value))
    }
    function removeTodoList(todoListID: string) {
        let action = RemoveTodolistAC(todoListID)
        dispatch(action)
        dispatch(action)
    }
    function changeTodolistTitle(title: string, todolistID: string) {
        dispatch (ChangeTodolistAC (todolistID,title,))
    }
    function addTodolist(title: string) {
        let action = AddTodolistAC(title)
        dispatch(action)
        dispatch(action)
    }


    const todoListComponents = todoList.map((tl) => {
        return (
                <Grid item  key={tl.id}>
                <Paper elevation={5} style={{padding: "20px"}}>
                    <TodoList
                        id={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={getTasksForTodolist(tl)}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
            )
        }
    )


    return (
        <div>

            <AppBar position={"static"}>
            <Toolbar style={{justifyContent: "space-between"}}>
                <IconButton color={"inherit"}>
                    <Menu/>
                </IconButton>
                <Typography variant={"h6"}>
                    Todolist
                </Typography>
                <Button
                    color = {"inherit"}
                    variant={"outlined"}

                >Login</Button>
                </Toolbar>
           </AppBar>
                <Container fixed>
                    < Grid container style={{padding: "20px 0px"}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {todoListComponents}

                        </Grid>
                            </Container>
                        </div>


);
}
 export default  AppWithRedux;
