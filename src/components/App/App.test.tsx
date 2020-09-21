import React from 'react';
import {App} from './App';
import TodoImpl from "../../models/TodoImpl";
import {shallow} from "enzyme";

function setUp(){
  const todoItems = [new TodoImpl('test1', false),
    new TodoImpl('test2', false),
    new TodoImpl('test3', false)];

  return {
    wrapper: shallow(<App todoItems={todoItems}/>),
    todoItems
  }
}

test('renders footer', () => {
  const {wrapper, todoItems} = setUp();

  // console.log(wrapper.debug());

  expect(wrapper.find('footer').exists()).toBe(true);
});
