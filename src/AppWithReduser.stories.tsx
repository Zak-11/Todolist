import React from 'react';
import {Story, Meta} from '@storybook/react';
import AppWithReducers from "./AppWithReducers";

import {ReduxStoreProviderDecorator} from "./stories/Decorator";

export default {
    title: 'TODOLISTS/AppWithReducers',
    component: AppWithReducers,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => <AppWithReducers/>


export const AppWithReducersExample = Template.bind({});
AppWithReducersExample.args = {};









