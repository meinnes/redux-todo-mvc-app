import React from 'react';
import {shallow} from 'enzyme';
import {TodoItem} from "./TodoItem";
import TodoImpl from "../../models/TodoImpl";

function setUp(done: boolean = false) {
    const todoItem = new TodoImpl('first todo', done);
    const toggleItemDone = jest.fn();
    const deleteTodoItem = jest.fn();
    const saveEdited = jest.fn();
    return {
        wrapper: shallow(<TodoItem
            item={todoItem}
            index={7}
            toggleItemDone={toggleItemDone}
            deleteTodoItem={deleteTodoItem}
            saveEdited={saveEdited}
        />),
        toggleItemDone,
        deleteTodoItem,
        saveEdited
    };
}

test('todoItem should render', () => {
    const {wrapper} = setUp();

    expect(wrapper).toHaveLength(1);
});

test('todoItem name renders', () => {
    const {wrapper} = setUp();

    expect(wrapper.find('label').text()).toContain('first todo');
});

test('todoItem correctly renders false when toggle is not checked', () => {
    const {wrapper} = setUp();

    expect(wrapper.find('.toggle').prop('checked')).toBe(false);
});

test('todoItem correctly renders true when toggle is checked', () => {
    const {wrapper} = setUp(true);

    expect(wrapper.find('.toggle').prop('checked')).toBe(true);
});

test('toggle todoItem is called with correct argument', () => {
    const {wrapper, toggleItemDone} = setUp(true);

    wrapper.find('input').simulate('click');

    expect(toggleItemDone).toHaveBeenCalledTimes(1);
    expect(toggleItemDone).toHaveBeenCalledWith(7);
});

test('delete todoItem is called with correct argument', () => {
    const {wrapper, deleteTodoItem} = setUp();

    wrapper.find('button').simulate('click');

    expect(deleteTodoItem).toHaveBeenCalledTimes(1);
    expect(deleteTodoItem).toHaveBeenCalledWith(7);
});

test('going into edit mode works properly', () => {
    const {wrapper} = setUp();
    // edit mode flag should be false initially
    expect(wrapper.state('inEditMode')).toBe(false);

    wrapper.find('label').simulate('doubleclick');

    // edit mode flag should be true after acting
    expect(wrapper.state('inEditMode')).toBe(true);
});

test('user flow of editing a todo works properly', () => {
    const {wrapper, saveEdited} = setUp();

    wrapper.find('label').simulate('doubleclick');
    wrapper.find('input').simulate('change',  { target: { value: 'Hello' } });
    wrapper.find('form').simulate('submit', {
        preventDefault: () => undefined
    });

    expect(saveEdited).toHaveBeenCalledTimes(1);
    expect(saveEdited).toHaveBeenCalledWith(7, 'Hello');
});
