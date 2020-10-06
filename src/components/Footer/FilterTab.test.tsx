import React from 'react';
import {FilterTab} from "./FilterTab";
import {shallow} from "enzyme";

function isSelected(filterName: string, selectedFilter: string) {
    if(filterName === selectedFilter){
        return 'selected';
    } else {
        return '';
    }
}
function setUp(
    key: number = 1,
    tabName = 'All',
    filterName = 'SHOW_ALL',
    selectedFilter: string = 'SHOW_ALL',
    selectedStyle: string = isSelected(filterName, selectedFilter)
){
    const setVisibility = jest.fn()
    // @ts-ignore
    return {
        wrapper: shallow(<FilterTab
            key={key}
            tabName={tabName}
            filterName={filterName}
            selectedFilter={selectedFilter}
            setVisibility={setVisibility}
        />),
        selectedStyle
    }
}

test('filter Tab should render', ()=>{
    const {wrapper} = setUp();

    expect(wrapper).toHaveLength(1);
})

test('selected filter style is applied correctly when a filter is selected', ()=>{
    const wrapper = setUp(2, 'Completed', 'SHOW_COMPLETED', 'SHOW_COMPLETED');

    expect(wrapper.selectedStyle.toString()).toBe('selected');

})

test('selected filter style is not applied  when the filter is not selected', ()=>{
    const wrapper = setUp(3, 'Active', 'SHOW_ACTIVE', 'SHOW_ALL');

    expect(wrapper.selectedStyle.toString()).toBe('');
})


