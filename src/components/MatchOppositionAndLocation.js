import { useStoreState } from 'easy-peasy';
import React from 'react';
// import { useMediaQuery } from 'react-responsive';
import '../css/footballFormation.css';

function MatchOppositionAndLocation () {

    const activeSeason = useStoreState(state => state.activeSeason);
    const activeComp = useStoreState(state => state.activeComp);
    const activeRound = useStoreState(state => state.activeRound);
    const fixtures = useStoreState(state => state.fixtures);
    const clubs = useStoreState(state => state.clubs);
    const playersAvailabilityIsFetching = useStoreState(state => state.playersAvailabilityIsFetching);
    const playersAvailabilityLastModified = useStoreState(state => state.playersAvailabilityLastModified);

    if (playersAvailabilityIsFetching) {
        return (
            <div key="blankdiv"></div>
        )
    } else {
        return (
            <React.Fragment>
                <div key="matchinfo" style={{fontWeight:"bold",padding:"3px 3px 3px 3px"}}>
                    {/* {fixtures[activeSeason][activeComp][activeRound].days["day_1"]}: 1's {fixtures[activeSeason][activeComp][activeRound].homeAwayInfo.substring(0,1) === "H" ? "Home" : "Away"} vs {clubs[fixtures[activeSeason][activeComp][activeRound].opposition].clubName} : {fixtures[activeSeason][activeComp][activeRound].homeAwayInfo} */}
                    {fixtures[activeSeason][activeComp][activeRound].days["day_1"]}: {fixtures[activeSeason][activeComp][activeRound].homeAwayInfo} vs {clubs[fixtures[activeSeason][activeComp][activeRound].opposition].clubName}
                </div>
                <div key="lastUpdated" style={{fontSize: 12,padding:"3px 3px 3px 3px"}}>
                    <b>Updated: </b>{playersAvailabilityLastModified.toLocaleString('en-AU')}
                </div>
            </React.Fragment>
        )
    }

}

export default MatchOppositionAndLocation;