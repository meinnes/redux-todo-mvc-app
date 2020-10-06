import React from 'react';
import {shallow} from 'enzyme';
import {Footer} from "./Footer";
import TodoImpl from "../../models/TodoImpl";

const defaultTodoItems = [new TodoImpl('test1', false),
    new TodoImpl('test2', true),
    new TodoImpl('test3', false)];

function setUp(todoItems: TodoImpl[] = defaultTodoItems) {
    const showClearCompleted = jest.fn();
    const filterName = '';
    // @ts-ignore
    return {
        wrapper: shallow(<Footer
            todoItems={todoItems}
            filterName={filterName}
            clearCompleted={showClearCompleted}
        />),
        todoItems,
        filterName,
        showClearCompleted
    }
}

test('should render', () => {
    const {wrapper} = setUp();
    expect(wrapper).toHaveLength(1);
});

test('footer shows correct number of filter tabs', () => {
    const {wrapper} = setUp();

    expect(wrapper.find('Connect(FilterTab)')).toHaveLength(3);
});

test('footer shows correct number of items left todo', () => {
    const {wrapper} = setUp();

    expect(wrapper.find('.todo-count').text()).toBe('2 items left');
});

test('footer shows clear completed button correctly, when there are completed todos', () => {
    const {wrapper} = setUp();

    expect(wrapper.find('.clear-completed')).toHaveLength(1);
});

test('footer does not show clear completed button, when there are not any completed todos', () => {
    const {wrapper} = setUp([new TodoImpl('test1', false)]);

    expect(wrapper.find('.clear-completed')).toHaveLength(0);
});

test('filter name and tab name are passed correctly for each filter tab', () => {
    const {wrapper} = setUp();

    expect(wrapper.find('ul').childAt(0).props().filterName).toBe('SHOW_ALL');
    expect(wrapper.find('ul').childAt(0).props().tabName).toBe('All');

    expect(wrapper.find('ul').childAt(1).props().filterName).toBe('SHOW_ACTIVE');
    expect(wrapper.find('ul').childAt(1).props().tabName).toBe('Active');

    expect(wrapper.find('ul').childAt(2).props().filterName).toBe('SHOW_COMPLETED');
    expect(wrapper.find('ul').childAt(2).props().tabName).toBe('Completed');
});