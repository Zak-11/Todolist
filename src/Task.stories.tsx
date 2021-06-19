import React from 'react';
import {Story, Meta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";

export default {
    title: 'TODOLISTS/Task',
    component: Task,
} as Meta;

const changeTaskStatusCallback = action('Change status clicked')
const changeTaskTitleCallback = action('Change task clicked')
const removeTaskCallback = action('Remove task clicked')

const baseArg = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneFormExample = Template.bind({});

TaskIsDoneFormExample.args = {
    ...baseArg,
    task: {id: '1', isDone: true, title: 'js'},
    todolistId: 'todolistId',

}
export const TaskIsNotDoneFormExample = Template.bind({});
TaskIsNotDoneFormExample.args = {
    ...baseArg,
    task: {id: '2', isDone: false, title: 'HTML'},
    todolistId: 'todolistId1',


};


