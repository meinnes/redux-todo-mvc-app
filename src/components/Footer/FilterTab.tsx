/* tslint:disable */
import React, {Component} from "react";
import {connect} from 'react-redux';
import {StringPayloadAction} from "../../models/TodoAppActions";
import {Action, Dispatch} from "redux";
import TodoAppReduxState from "../../models/TodoAppReduxState";

type FilterTabProps = {
    filterName: string;
    setVisibility: (filterName: string) => Action;
    tabName: string;
    selectedFilter: string;
}

type FilterTabState = {}

export class FilterTab extends Component<FilterTabProps, FilterTabState> {

    setVisibility() {
        const filterName = this.props.filterName;
        this.props.setVisibility(filterName);
    }

    isThisTabSelected() {
        return this.props.selectedFilter === this.props.filterName;
    }

    render() {
        const tabName = this.props.tabName;
        const selectedStyle = this.isThisTabSelected() ? 'selected' : '';
        return (
            <li
                onClick={() => this.setVisibility()}>
                <a className={selectedStyle}> {tabName}</a>
            </li>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setVisibility: (filterName: string): StringPayloadAction => dispatch({
        type: 'SET_VISIBILITY_FILTER',
        payload: filterName
    }),
});

const mapStateToProps = (storeState: TodoAppReduxState) => ({
    selectedFilter: storeState.filterName
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterTab);
