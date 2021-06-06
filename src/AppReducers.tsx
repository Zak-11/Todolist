import React, {useReducer} from 'react';
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

    const [todoList, dispatchTodoLists] = useReducer(todoListsReducer,[
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


    function removeTask(taskID: string, todoListID: string) {
        dispatchTasks( removeTasksAC(taskID, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchTasks(addTaskAC(title, todoListID))
    }
    function changeTaskStatus(taskID: string, isDone: boolean,  todoListID: string) {
        dispatchTasks(changeTaskStatusAC(taskID, isDone, todoListID))
    }
    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        dispatchTasks(changeTitleTaskStatusAC(taskID, newTitle,todoListID))
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
        dispatchTodoLists(ChangeTodoFilterListAC(todoListID,value))
    }
    function removeTodoList(todoListID: string) {
        let action = RemoveTodolistAC(todoListID)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    function changeTodolistTitle(title: string, todolistID: string) {
        dispatchTodoLists (ChangeTodolistAC (todolistID,title,))
    }
    function addTodolist(title: string) {
        let action = AddTodolistAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
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
 export default  AppWithReducer;
