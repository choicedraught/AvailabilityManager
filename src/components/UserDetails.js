import { useStoreState } from "easy-peasy";
import React from "react";
import clientSettings from "../clientSettings";



function UserDetails () {

    const userAttributes = useStoreState(state => state.userAttributes);
    const userAttributesIsFetching = useStoreState(state => state.userAttributesIsFetching);

    if (userAttributesIsFetching) {
        return <div>Fetching...</div>
    } else {
        // const myCricketID = "21836"; // for testing
        const myCricketURL = "http://mycricket.cricket.com.au/common/pages/public/rv/cricket/viewplayer.aspx?entityid=525&save=0&playerid=" + userAttributes.attributes["custom:myCricketID"] + "&eid=525&locx=PLY&seasonid=153"

        if (clientSettings.sport === "cricket" ) {
            return <React.Fragment>{userAttributes.attributes.name} ({userAttributes.attributes.email}) - MyCricket: <a target="_blank" rel="noreferrer" href={myCricketURL}> {userAttributes.attributes["custom:myCricketID"] }</a></React.Fragment>
        } else {
            return <React.Fragment>{userAttributes.attributes.name} ({userAttributes.attributes.email})</React.Fragment>
        }
    }


    
    }

export default UserDetails;