import React, {useCallback, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItenForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App() {
    debugger;
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoList, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},

    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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


    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    const addTask = useCallback((title: string, todoListID: string) =>{
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    },[])
    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)

        })
    }
    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title: newTitle} : t)

        })
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
        setTodoLists(todoList.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }
    function removeTodoList(todoListID: string) {
        setTodoLists(todoList.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    function changeTodolistTitle(title: string, todoListID: string) {
        setTodoLists(todoList.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
    }
    function addTodolist(title: string) {
        const newTodolistID = v1()
        const newTodolist: TodoListType = {id: newTodolistID, title, filter: "all"}
        setTodoLists([...todoList, newTodolist])
        setTasks({...tasks, [newTodolistID]: []})
    }


    const todoListComponents = todoList.map(tl => {
        return (
                <Grid item  key={tl.id}>
                <Paper elevation={5} style={{padding: "20px"}}>
                    <TodoList
                        id={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        tasks={getTasksForTodolist(tl)}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
                        removeTask={removeTask}/>
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
