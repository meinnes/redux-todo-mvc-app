import React from 'react';
import { shallow } from 'enzyme';
import TodoList from './TodoList';
import TodoImpl from '../../models/TodoImpl';

function setUp() {
    const todoItems = [new TodoImpl('test1', false),
        new TodoImpl('test2', false),
        new TodoImpl('test3', false)];

    return shallow(<TodoList todoItems={todoItems} />);
}

test('todoList-should have the correct number of elements', () => {
    const wrapper = setUp();

    expect(wrapper).toHaveLength(3);
});

test('todoList-should have an unordered list of the correct length', () => {
    const wrapper = setUp();

    expect(wrapper.find('ul')).toHaveLength(3);
});

test('todoList-should have the correct className for a given list item', () => {
    const wrapper = setUp();

    expect(wrapper.find('ul').get(0).props.className).toBe('todo-list');
});

test('todoList-should have 3 items of correct type', () => {
    const wrapper = setUp();

    expect(wrapper.find('Connect(TodoItem)')).toHaveLength(3);
});
