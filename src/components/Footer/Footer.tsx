import React, {Component} from "react";
import FilterTab from "./FilterTabs";
import TodoAppReduxState from "../../models/TodoAppReduxState";
import {Action, Dispatch} from "redux";
import {NumberPayloadAction, StringPayloadAction} from "../../models/TodoAppActions";
import {connect} from "react-redux";
import Todo from "../../models/Todo";


type FooterState = {
    value: number,
    selectedStyle: string
}

type FooterProps = {
    todoItems: Todo[];
    filterName: string;
}

class Footer extends Component<FooterProps, FooterState> {
    constructor(props: FooterProps) {
        super(props);
        this.state = {
            value: 0,
            selectedStyle: '',
        };
    };

    handleTabChange = (value: number) => {
        this.setState({value});
    }

    showClearCompleted(list: Todo[]){
        if (list.length){
            return (
                <button className="clear-completed">Clear completed</button>
            )
        }
    }

    render() {
        const {value} = this.state;
        const leftItems = this.props.todoItems.filter((item: Todo) => !item.isDone);
        const doneItems = this.props.todoItems.filter((item: Todo)=> item.isDone);

        return (
            <ul className={'filters'}>
                <span>
                    {leftItems.length} items left
                </span>
                <FilterTab
                    key="1"
                    value={1}
                    handleTabChange={this.handleTabChange.bind(this, 1)}
                    filterName='SHOW_ALL'
                    tabName={'All'}
                />
                <FilterTab
                    key="3"
                    value={3}
                    handleTabChange={this.handleTabChange.bind(this, 3)}
                    filterName='SHOW_ACTIVE'
                    tabName={'Active'}
                />
                <FilterTab
                    key="2"
                    value={2}
                    handleTabChange={this.handleTabChange.bind(this, 2)}
                    filterName='SHOW_COMPLETED'
                    tabName={'Completed'}
                />
                {this.showClearCompleted(doneItems)}

            </ul>
        );
    }
}

const mapStateToProps = (storeState: TodoAppReduxState) => ({
    todoItems: storeState.todoItems,
    filterName: storeState.filterName,
})

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//     clearCompleted: ():Action => dispatch({type: 'CLEAR_COMPLETED'}),
// })

export default connect(mapStateToProps, null)(Footer);


