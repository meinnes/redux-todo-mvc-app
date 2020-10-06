import React, {Component} from "react";
import FilterTab from "./FilterTab";
import TodoAppReduxState from "../../models/TodoAppReduxState";
import {Action, Dispatch} from "redux";
import {connect} from "react-redux";
import Todo from "../../models/Todo";

type FooterState = {
    selectedStyle: string
}

type FooterProps = {
    todoItems: Todo[];
    filterName: string;
    clearCompleted: () => Action;
}

export class Footer extends Component<FooterProps, FooterState> {
    constructor(props: FooterProps) {
        super(props);
        this.state = {
            selectedStyle: '',
        };
    };

    showClearCompleted(list: Todo[]) {
        if (list.length) {
            return (
                <button className="clear-completed"
                        onClick={this.props.clearCompleted}>
                    Clear completed
                </button>
            );
        }
    }

    render() {
        const leftItems = this.props.todoItems.filter((item: Todo) => !item.isDone);
        const doneItems = this.props.todoItems.filter((item: Todo) => item.isDone);

        return (
            <div>
                <span className='todo-count'>
                    {leftItems.length} items left
                </span>
                <ul className={'filters'}>
                    <FilterTab
                        key="1"
                        filterName='SHOW_ALL'
                        tabName={'All'}
                    />
                    <FilterTab
                        key="3"
                        filterName='SHOW_ACTIVE'
                        tabName={'Active'}
                    />
                    <FilterTab
                        key="2"
                        filterName='SHOW_COMPLETED'
                        tabName={'Completed'}
                    />
                </ul>

                {this.showClearCompleted(doneItems)}
            </div>
        );
    }
}

const mapStateToProps = (storeState: TodoAppReduxState) => ({
    todoItems: storeState.todoItems,
    filterName: storeState.filterName,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    clearCompleted: (): Action => dispatch({type: 'CLEAR_COMPLETED'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer);


