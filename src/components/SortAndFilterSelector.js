
import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import {useRef} from 'react';
// import { useMediaQuery } from 'react-responsive';
// import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../css/dropDownStyles.css'

function SortAndFilterSelector (){

    const availabilitySorting = useStoreState(state => state.availabilitySorting);
    const playersAvailabilityIsFetching = useStoreState(state => state.playersAvailabilityIsFetching)
    const filterA = useStoreState(state => state.filterA);
    const filterM = useStoreState(state => state.filterM);
    const filterU = useStoreState(state => state.filterU);
    const {filterAStyle,filterMStyle,filterUStyle} = useRef(null)


    const setAvailabliltySorting = useStoreActions(state => state.setAvailabliltySorting);
    const setFilter = useStoreActions(state => state.setFilter);


    // const seasonSelectorStyle = {
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center"
    // }

    const sortData = (event) => {
        console.log(event.currentTarget.id)
        setAvailabliltySorting(event.currentTarget.id)
    }

    const filterData = (event) => {
        console.log(event.currentTarget.id)
        setFilter(event.currentTarget.id)
    }
    
    const getSortStyle = (sortValue) => {
        if (availabilitySorting === sortValue) {
            return { fontWeight: 'bold' }
        }
    }
    

    function getFilterStyle (filter){
        // console.log(event.currentTarget.id  )
        
        const styleObject = {
            color: "black",
            fontWeight: 'bold'  
        }
        // const filterColours = {
        //     filterA: "#47b947",
        //     filterM: "#efa92a",
        //     filterU: "#f34949"
        // } 
        // styleObject.backgroundColor = filterColours[event.currentTarget.id]
        // styleObject.backgroundColor = filterColours[useRef().current.id]
        if (filterA && filter === "a") { styleObject.backgroundColor = "#47b947"}
        else if (filterM && filter === "m") { styleObject.backgroundColor = "#efa92a"}
        else if (filterU && filter === "u") { styleObject.backgroundColor = "#f34949"}
        // else {styleObject.backgroundColor = "white"}
        return styleObject
    }

    if (playersAvailabilityIsFetching) {
        return (
            <div key="blankdiv"></div>
        )
    } else {

        return (
            <React.Fragment>
                <div>
                </div>
                <div style={{padding:"3px 3px 3px 3px"}}>
                    <div>
                        <b></b> 
                            <span id="no-sort" style={getSortStyle("no-sort")} onClick={sortData}>None</span> | <span id="ascending" style={getSortStyle("ascending")} onClick={sortData}>A-Z</span> | <span id="descending" style={getSortStyle("descending")} onClick={sortData}>Z-A</span>
                        <b> : </b> 
                            <span id="filterA" ref={filterAStyle} style={getFilterStyle("a")} onClick={filterData}>Available</span> <span id="filterM" ref={filterMStyle}  style={getFilterStyle("m")} onClick={filterData}>Maybe</span> <span id="filterU"  ref={filterUStyle} style={getFilterStyle("u")} onClick={filterData}>Not-Available</span>
                    </div> 
                </div>
                <div></div>
            </React.Fragment>
        )
    }
}

export default SortAndFilterSelector;