import { useStoreState } from "easy-peasy";
import React from "react";
import clientSettings from "../clientSettings";



function UserDetails () {

    const userAttributes = useStoreState(state => state.userAttributes);

    // const myCricketID = "21836"; // for testing
    const myCricketURL = "http://mycricket.cricket.com.au/common/pages/public/rv/cricket/viewplayer.aspx?entityid=525&save=0&playerid=" + userAttributes["custom:myCricketID"] + "&eid=525&locx=PLY&seasonid=153"

    if (clientSettings.sport === "cricket" ) {
        return <React.Fragment>{userAttributes.name} ({userAttributes.email}) - MyCricket: <a target="_blank" rel="noreferrer" href={myCricketURL}> {userAttributes["custom:myCricketID"] }</a></React.Fragment>
    } else {
        return <React.Fragment>{userAttributes.name} ({userAttributes.email})</React.Fragment>
    }
    
    }

export default UserDetails;