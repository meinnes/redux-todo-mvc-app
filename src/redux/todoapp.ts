import TodoAppReduxState from "../models/TodoAppReduxState";
import {TodoAppAction} from "../models/TodoAppActions";
import TodoImpl from "../models/TodoImpl";
import Todo from "../models/Todo";

const initialState: TodoAppReduxState = {todoItems: [], filterName: 'SHOW_ALL'};

export const todoapp = (storeState: TodoAppReduxState = initialState, action: TodoAppAction):TodoAppReduxState => {
    switch (action.type) {

        case 'ADD_TODO':
            const newTodo = new TodoImpl(action.payload, false);
            return {
                ...storeState,
                todoItems: [
                    ...storeState.todoItems,
                    newTodo
                ]
            };

        case 'TOGGLE_TODO':
            const doneList = storeState.todoItems.map((item: Todo, i) => {
                item.isDone = action.payload === i ? !item.isDone : item.isDone;
                return item;
            })
            return {...storeState, todoItems: doneList};

        case 'DELETE_TODO':
            const newList = storeState.todoItems.filter((item: Todo, i) => {
                return i !== action.payload;
            });
            return {...storeState, todoItems: newList};

        case 'SAVE_EDITED':
            const editedList = storeState.todoItems.map((item: Todo, i) => {
                item.name = action.payload === i ? action.text : item.name;
                return item;
            });
            return {...storeState, todoItems: editedList};

        case 'SET_VISIBILITY_FILTER':
            return {...storeState, filterName : action.payload};

        case 'CLEAR_COMPLETED':
            const activeTodoList = storeState.todoItems.filter((item: Todo) => {
                return !item.isDone;
            });
            return {...storeState, todoItems: activeTodoList};

        default:
            return storeState;
    }
}
