/* tslint:disable */
import React, {Component} from "react";
import {connect} from 'react-redux';
import {StringPayloadAction} from "../../models/TodoAppActions";
import {Action, Dispatch} from "redux";

type FilterTabsProps = {
    filterName: string;
    setVisibility: (filterName: string) => Action;
    tabName: string;
    value: number;
    handleTabChange: () => void;
}
type FilterTabsState = {
    isSelected: boolean;
}

class FilterTab extends Component<FilterTabsProps, FilterTabsState> {
    constructor(props: FilterTabsProps) {
        super(props);
        this.state = {
            isSelected: false,
        }
    }

    setVisibility() {
        const filterName = this.props.filterName;
        this.props.setVisibility(filterName);
    }

    handleTabChange() {
        this.props.handleTabChange();
        this.setState({isSelected: true})
        this.setVisibility();

    }

    render() {
        const tabName = this.props.tabName;
        const selectedStyle = this.state.isSelected?'selected':'';
        return (
            <li
                value={this.props.value}
                onClick={() => this.handleTabChange()}
            ><a className={selectedStyle} href={'#'}> {tabName}</a>


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

export default connect(null, mapDispatchToProps)(FilterTab);