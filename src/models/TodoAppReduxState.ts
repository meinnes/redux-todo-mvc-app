import Todo from "./Todo";

export default interface TodoAppReduxState {
    todoItems: Todo[];
    filterName: string;
}
