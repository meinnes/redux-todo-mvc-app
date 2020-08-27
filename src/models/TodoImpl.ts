import Todo from "./Todo";

export default class TodoImpl implements Todo {
    public name: string;
    public isDone: boolean;

    constructor(name: string, isDone: boolean) {
        this.name = name;
        this.isDone = isDone;
    }
}