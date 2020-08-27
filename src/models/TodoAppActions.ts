import {Action} from "redux";
import Todo from "./Todo";

export interface StringPayloadAction extends Action {
    payload: string
}

export interface NumberPayloadAction extends Action {
    payload: number
}

export interface TodoPayloadAction extends Action {
    payload: Todo
}

export interface BooleanPayloadAction extends Action {
    payload: boolean
}

export interface TextAction extends Action {
    TextAction: string
}

export interface TodoAppAction {
    type: string;
    payload: boolean & string & Todo;
    text: string;
}
