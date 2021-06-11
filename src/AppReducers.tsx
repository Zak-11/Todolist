import React, {useCallback, useReducer} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItenForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodoFilterListAC,
    ChangeTodolistAC,
    RemoveTodolistAC,
    todoListsReducer
} from "./store/Todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTitleTaskStatusAC,
    removeTasksAC,
    tasksReducer
} from "./store/Tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoList, dispatchTodoLists] = useReducer(todoListsReducer, [
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},

    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "React", isDone: false}

        ],

        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
        ],
    })


    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatchTasks(removeTasksAC(taskID, todoListID))
    }, [dispatchTasks])


    const addTask = useCallback((title: string, todoListID: string) => {
        dispatchTasks(addTaskAC(title, todoListID))
    }, [dispatchTasks])

    const changeTaskStatus = useCallback((taskID: string, newIsDoneValue: boolean, todoListID: string) => {
        dispatchTasks(changeTaskStatusAC(taskID, newIsDoneValue, todoListID))
    }, [dispatchTasks])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        dispatchTasks(changeTitleTaskStatusAC(taskID, newTitle, todoListID))
    }, [dispatchTasks])


    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatchTodoLists(ChangeTodoFilterListAC(todoListID, value))
    }, [dispatchTodoLists])

    const removeTodoList = useCallback((todoListID: string) => {
        let action = RemoveTodolistAC(todoListID)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }, [dispatchTodoLists])

    const changeTodolistTitle = useCallback((title: string, todolistID: string) => {
        dispatchTodoLists(ChangeTodolistAC(todolistID, title,))
    }, [dispatchTodoLists])

    const addTodolist = useCallback((title: string) => {
        let action = AddTodolistAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }, [dispatchTodoLists])


    const todoListComponents = todoList.map((tl) => {

            return (
                <Grid item key={tl.id}>
                    <Paper elevation={5} style={{padding: "20px"}}>
                        <TodoList
                            id={tl.id}
                            todoListID={tl.id}
                            title={tl.title}
                            tasks={tasks[tl.id]}
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
                        color={"inherit"}
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

export default AppWithReducer;
