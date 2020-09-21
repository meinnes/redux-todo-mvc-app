import React, {Component} from "react";
import TodoItem from "../TodoItem/TodoItem";
import Todo from "../../models/Todo";

interface TodoListProps {
    todoItems: Todo[];
}

export default class TodoList extends Component<TodoListProps, {}> {
    render() {
        return this.props.todoItems.map((item: Todo, index: number) => {
            return (
                <ul className={'todo-list'}>
                    <TodoItem
                        item={item}
                        index={index}
                        key={`${item.name}-${item.isDone}`}
                    />
                </ul>
            )
        });
    }
}