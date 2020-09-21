import React, {ChangeEvent, Component, FormEvent} from "react";
import {connect} from "react-redux";
import Todo from "../../models/Todo";
import {Action, Dispatch} from "redux";
import {NumberPayloadAction, TextAction} from "../../models/TodoAppActions";

interface TodoItemState {
    inEditMode: boolean;
    editInputText: string;
}

interface TodoItemProps {
    item: Todo;
    index: number;
    deleteTodoItem: (index: number) => Action;
    toggleItemDone: (index: number) => Action;
    saveEdited: (index: number, editText: string) => Action;
}

export class TodoItem extends Component<TodoItemProps, TodoItemState> {
    constructor(props: TodoItemProps) {
        super(props);
        this.state = {
            inEditMode: false,
            editInputText: props.item.name,
        }
    }

    editTodoItem() {
        this.setState({inEditMode: true});
    }

    handleEdit(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        const inputValue = e.target.value;
        if (inputValue) {
            this.setState({editInputText: inputValue});
        } else {
            this.setState({editInputText: ''});
        }
    }

    saveEdited(index: number) {
        this.props.saveEdited(index, this.state.editInputText);
        this.setState({inEditMode: false});
    }

    handleSubmit(e: FormEvent<HTMLFormElement>) {
        const index = this.props.index;
        this.saveEdited(index);
        e.preventDefault();
        this.setState({editInputText: ''});
    }

    render() {
        const {item, index} = this.props;
        const done = item.isDone;
        const inEditMode = this.state.inEditMode;
        const isDoneStyle = done ? 'completed' : '';

        if (!inEditMode) {
            return (
                <li className={isDoneStyle}>
                    <div className="view">
                        <input className="toggle"
                               type="checkbox"
                               checked={done}
                               onClick={() => this.props.toggleItemDone(index)}
                        />
                        <label onDoubleClick={() => this.editTodoItem()}>
                            {item.name}
                        </label>
                        <button className={'destroy'}
                                onClick={() => this.props.deleteTodoItem(index)}
                        >
                        </button>
                    </div>
                </li>)
        } else {
            return (
                <li className={'editing'}>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <input className={'edit'} value={this.state.editInputText}
                               onChange={(e) => this.handleEdit(e)}
                        />
                    </form>
                </li>
            );
        }
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    deleteTodoItem: (index: number): NumberPayloadAction => dispatch({type: 'DELETE_TODO', payload: index}),
    saveEdited: (index: number, editText: string): NumberPayloadAction | TextAction => dispatch({
        type: 'SAVE_EDITED', payload: index, text: editText}),
    toggleItemDone: (index: number): NumberPayloadAction => dispatch({type: 'TOGGLE_TODO', payload: index}),
});

export default connect(null, mapDispatchToProps)(TodoItem);

