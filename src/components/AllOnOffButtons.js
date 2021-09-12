import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import '../css/buttonHolder.css';
// import { createTrue } from 'typescript';

const AllOnOffButtons = () => {

    const uid = useStoreState(state => state.uid);
    const season = useStoreState(state => state.season);
    const activeComp = useStoreState(state => state.activeComp); // this should be a prop that is passed from the App.js I thinK?  Not global state.
    const compRounds = useStoreState(state => state.compRounds);
    const avset = useStoreState(state => state.avset);

    const allAvailPost = useStoreActions(
        actions => actions.allAvailPost
    )

    const avid = uid + ":" + season + ":" + activeComp

    const hasMatchAlreadyBeenPlayed = (date) => {
        var dateToday = new Date()
        // dateTodayAdjusted accounts for the month being 0 indexed and therefore showing by default as one month ago
        // there must be a better way
        var dateTodayAdjusted = new Date(dateToday.getFullYear(), (dateToday.getMonth()+1), dateToday.getDate())
        var strDateDay = date.split("/")[0]
        var strDateMonth = date.split("/")[1]
        var strDateYear = date.split("/")[2]
        var matchDate = new Date(strDateYear, strDateMonth, strDateDay);
        if ( matchDate.getTime() < dateTodayAdjusted.getTime() ) {
            return true
        } else {
            return false
        } 
    }

    const allAvailabilitySetButton = (e) => {
        var updateValue;
        // Which button was pressed? All Available or All Unavailable?
        e.currentTarget.id === 'allAvailable' ? updateValue="A" : updateValue="U";
        
        // Apparently there is no good way to do this and maintain immutiblity.  This seems work for this case?!
        var compRoundsCopy = JSON.parse(JSON.stringify(compRounds[season][activeComp]));

        // should add some code here to prevent updateAll changing dates from the past.
        var roundsPayload = {}        
        Object.keys(compRoundsCopy).forEach((key, index, val) => {
            var roundName = key
            
            var days = compRoundsCopy[key].days
            Object.keys(days).forEach((d) => {
                if ( hasMatchAlreadyBeenPlayed(compRoundsCopy[key].days[d]) ) {
                    // Need to check that there is avset entry for this before we try and check its value
                    // Need to iterate through the levels to check if it exsits first. 
                    if ( typeof(avset[avid]) !== 'undefined' ) {
                        if ( typeof(avset[avid][roundName]) !== 'undefined' ) {
                            // Now we know that the day exists in the data, we can check if it is blank or not.
                            // Its blank if it doesnt match A, U or M and if it is return blank
                            // Else return what the avset said it was.
                            if (avset[avid][roundName][d] !== "A" && avset[avid][roundName][d] !== "U" && avset[avid][roundName][d] !== "M") {
                                return days[d] = ""
                            } else {
                                return days[d] = avset[avid][roundName][d]
                            }
                        }
                    }
                } else {
                    return days[d] = updateValue;
                }
            })
            roundsPayload[roundName] = days;
        })
        var updateSet = {}
        updateSet['season'] = season;
        updateSet['activecomp'] = activeComp;
        updateSet['roundspayload'] = roundsPayload;
        updateSet['action'] = 'setall';
        // console.log("All Availability Update Set " + JSON.stringify(updateSet))
        return allAvailPost(updateSet)
    }
    

    return (
        <React.Fragment>
            <button id='allAvailable' className='available' onClick={allAvailabilitySetButton}>Set All Available</button>
            <button id='allUnAvailable' className='unavailable' onClick={allAvailabilitySetButton}>Set All Unavailable</button>
        </React.Fragment>
    )
}

export default AllOnOffButtons;
