
import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from 'react';
// import { useMediaQuery } from 'react-responsive';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../css/dropDownStyles.css'

function MatchSelector (){

    const competitions = useStoreState(state => state.competitions)
    const rounds = useStoreState(state => state.rounds)
    const activeSeason = useStoreState(state => state.activeSeason)
    const activeComp = useStoreState(state => state.activeComp);
    const activeRound = useStoreState(state => state.activeRound);
    const fixtures = useStoreState(state => state.fixtures);
    const userAttributes = useStoreState(state => state.userAttributes);
    const roleAccess = useStoreState(state => state.roleAccess)
    const userAttributesIsFetching = useStoreState(state => state.userAttributesIsFetching)
    
    const setActiveSeason = useStoreActions(state => state.setActiveSeason);
    const setActiveComp = useStoreActions(state => state.setActiveComp);
    const setActiveRound = useStoreActions(state => state.setActiveRound);
    // const getUserAttributes = useStoreActions(state => state.getUserAttributes);

    // Returns an object with value - label pairs for the seasons Dropdown
    const getSeasonsDropDownOptions = () => {
        const returnObject = []
        Object.keys(fixtures).forEach((s) => {
            returnObject.push(
                {
                    value: s,
                    label: s
                }
            )
        })
        return returnObject;
    }

    // Returns an object with value - label pairs for the competitions Dropdown
    const getCompetitionsDropDownOptions = () => {
        // TODO: Not a fan of this array element 0 hack.  Need to fix this.
        return roleAccess[userAttributes.signInUserSession.accessToken.payload["cognito:groups"][0]].map((comp)=>{
            return {
                "value": comp,
                "label": competitions[comp].name
            }
        })
    }

    // Returns an object with value - label pairs for the rounds Dropdown
    const getRoundsDropDownOptions = () => {
        // console.log(activeSeason + " - " + activeComp)
        const returnObject = []
        Object.keys(fixtures[activeSeason][activeComp]).forEach((round) => {
            // console.log(activeSeason + " - " + activeComp + " - " + round)
            returnObject.push(
                { 
                    value: round,
                    label: rounds[round].roundName
                }
            )
        })
        return returnObject;
    }

    const handleSeasonSelect = (e) => {
        // console.log(e);
        if ( fixtures[e.value][activeComp] === undefined) {
            setActiveComp(Object.keys(fixtures[e.value])[0])
            setActiveSeason(e.value)
        } else {
            setActiveSeason(e.value);
        }

    }

    const handleCompSelect = (e) => {
        console.log(e);

        // Before we do this, we need to check if the Comp Actually has this round, if not, we have an issue.
        if ( fixtures[activeSeason][e.value][activeRound]  === undefined) {
            // console.log(activeRound + " does not exist in this comp")
            setActiveRound("round_1")
            setActiveComp(e.value);
        } else {
            // console.log(activeRound + " does exist in this comp")
            setActiveComp(e.value);
        }
        
    }

    const handleRoundSelect = (e) => {
        console.log(e);
        setActiveRound(e.value);
    }

    // const seasonSelectorStyle = {
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center"
    // }

    // useEffect(()=>{
  
    //     getUserAttributes()

    // },[getUserAttributes]);

    if (userAttributesIsFetching) {
        return (
            <React.Fragment>
                <div key="sdd" className='season-dropdown'><Dropdown options={getSeasonsDropDownOptions()} onChange={handleSeasonSelect} value={activeSeason} /></div>
                {/* <div key="sdd" className='season-dropdown' style={seasonSelectorStyle}><b>Season: </b>{activeSeason}</div> */}
                <div key="cdd" className='comp-dropdown'><Dropdown options={{"value":"loading","label":"Loading..."}}  value={"loading"} /></div>
                <div key="rdd" className='round-dropdown'><Dropdown options={getRoundsDropDownOptions()} onChange={handleRoundSelect}  value={activeRound} /></div>
            </React.Fragment>
        )
    } else {
        if ( typeof(userAttributes.signInUserSession.accessToken.payload["cognito:groups"]) !== 'undefined' ) {
            return (
                <React.Fragment>
                    <div key="sdd" className='season-dropdown'><Dropdown options={getSeasonsDropDownOptions()} onChange={handleSeasonSelect} value={activeSeason} /></div>
                    {/* <div key="sdd" className='season-dropdown' style={seasonSelectorStyle}><b>Season: </b>{activeSeason}</div> */}
                    <div key="cdd" className='comp-dropdown'><Dropdown options={getCompetitionsDropDownOptions()} onChange={handleCompSelect} value={activeComp} /></div>
                    <div key="rdd" className='round-dropdown'><Dropdown options={getRoundsDropDownOptions()} onChange={handleRoundSelect}  value={activeRound} /></div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div>NA</div>
                    <div>Access Denied</div>
                    <div>NA</div>
                </React.Fragment>
            )
        }
    }

}

export default MatchSelector;