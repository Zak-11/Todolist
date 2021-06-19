import React from 'react';
import { Story, Meta } from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'Button clicked inside component'
        }
    },
} as Meta;

const Template: Story<AddItemFormPropsType > = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});

AddItemFormExample.args = {
    addItem: action ('Button clicked inside component')
}






;


