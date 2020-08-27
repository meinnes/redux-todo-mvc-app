import React from 'react';
import {Action, Dispatch} from 'redux';
import {connect} from "react-redux";
import TodoAppReduxState from "../../models/TodoAppReduxState";
import {StringPayloadAction} from "../../models/TodoAppActions";
import Todo from "../../models/Todo";
import TodoList from '../TodoList/TodoList';
import '../todomvc-styles/base.css';
import '../todomvc-styles/index.css';
import Footer from "../Footer/Footer";

interface TodoAppProps {
    addTodo: (newTodo: string) => Action;
    toggleAll: () => Action;
    todoItems: Todo[];
    filterName: string;
}

interface TodoAppState {
    currentInputText: string;
}

class App extends React.Component <TodoAppProps, TodoAppState> {
    constructor(props: TodoAppProps) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormReset = this.handleFormReset.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.state = {
            currentInputText: '',
        }
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        if (inputValue) {
            this.setState({currentInputText: inputValue});
        } else {
            this.handleFormReset();
        }
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        this.handleFormReset();
        e.preventDefault();
        this.addTodo();
    }

    addTodo() {
        const newTodo = this.state.currentInputText;
        if (newTodo !== '') {
            this.props.addTodo(newTodo);
        }
    }

    handleFormReset() {
        this.setState({currentInputText: ''})
    }

    filterTodos(todos: Todo[], filterName: string) {
        switch (filterName) {
            case 'SHOW_ACTIVE':
                return todos.filter(item => !item.isDone);
            case 'SHOW_COMPLETED':
                return todos.filter(item => item.isDone);
            default:
                return todos;
        }
    }

    showFooter() {
        if (this.props.todoItems.length) {
            return (
                <footer className={'footer'}>
                    <Footer/>
                </footer>
            )
        }
    }

    render() {
        const visibleTodos = this.filterTodos(this.props.todoItems, this.props.filterName);

        return (
            <section className="todoapp">
                <div>
                    <header className={'header'}>
                        <h1> todos </h1>
                        <form onSubmit={this.handleSubmit}>
                            <input className="new-todo"
                                   placeholder="What needs to be done?"
                                   onChange={this.handleInputChange}
                                   value={this.state.currentInputText}
                            />
                        </form>
                    </header>
                </div>

                <section className={'main'}>
                    <input id="toggle-all"
                           className="toggle-all"
                           type="checkbox"
                           onClick={this.props.toggleAll}
                    />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                    <TodoList
                        todoItems={visibleTodos}
                    />
                </section>

                {this.showFooter()}

            </section>
        );
    }
}

const mapStateToProps = (storeState: TodoAppReduxState) => ({
    todoItems: storeState.todoItems,
    filterName: storeState.filterName,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addTodo: (newTodo: string): StringPayloadAction => dispatch({type: 'ADD_TODO', payload: newTodo}),
    toggleAll: (): Action => dispatch({type: 'TOGGLE_ALL'})
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
