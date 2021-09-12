import { useStoreActions, useStoreState } from 'easy-peasy';
import { default as React } from 'react';
import { useMediaQuery } from 'react-responsive';
import CompRoundsDayLogos from './CompRoundsDayLogos';
import clientSettings from '../clientSettings';


// this was change to a function, rather than an export class with a render().  
function CompRoundsDay(props) {

  // const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  // const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 })
  // const isTabletOrMobile = useMediaQuery({ maxWidth: 667 })
  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 })
  // const isPortrait = useMediaQuery({ orientation: 'portrait' })
  // const isRetina = useMediaQuery({ minResolution: '2dppx' })

  // setup our Global State objects from easy peasy
  const uid = useStoreState(state => state.uid);
  const season = useStoreState(state => state.season);
  const activeComp = useStoreState(state => state.activeComp); // this should be a prop that is passed from the App.js I thinK?  Not global state.
  const prettyDays = useStoreState(state => state.prettyDays);
  const roundNames = useStoreState(state => state.roundNames);
  const clubs = useStoreState(state => state.clubs);
  const avset = useStoreState(state => state.avset);
  const compRounds = useStoreState(state => state.compRounds);

  const compAvailInsert = useStoreActions(
    actions => actions.compAvailInsert
  );

  // const availUpdate = useStoreActions(
  //   actions => actions.availUpdate
  // );

  const availPost = useStoreActions(
    actions => actions.availPost
  );

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

  // const compAvailPost = useStoreActions(
  //   actions => actions.compAvailPost
  // )
  
  const getStyle = (roundName, noOfDays, dayName) => {

    var avsetIndex = uid + ":" + season + ":" + activeComp

    var styleObject = {
      cursor:'pointer',
      color: 'white',
      padding: '2px',
      height: '180px',
      borderBottom: '1px #ccc dotted',
      background: 'grey', // default background colour - no way to change a button to this colour
      borderRadius: '8px',
      boxShadow: '0'
    }

    if ( hasMatchAlreadyBeenPlayed( compRounds[season][activeComp][roundName].days[dayName] ) ) {
      styleObject.opacity = '0.4';
    }

    // check if there is an avset for this user and comp
    if ( typeof(avset[avsetIndex]) !== 'undefined' ) {  
      var dayArray = avset[avsetIndex][roundName]

      // Additional check that rounds is actually defined?
      if ( avset[avsetIndex].hasOwnProperty(roundName) ) {
        // check if this day has an entry in the AvSet
        if (typeof(avset[avsetIndex][roundName][dayName]) != 'undefined') {      
          if ( dayArray[dayName] === "A" ) {
              styleObject.background ='#47b947'
          } 
          else if ( dayArray[dayName] === "M" ) {
              styleObject.background = '#efa92a'
          } 
          else if ( dayArray[dayName] === "U" ) {
              styleObject.background = '#f34949'
          } 
        } 
      }
    }    // console.log(styleObject)
    // Fit 2 day matches into the space of one button
    if ( noOfDays === 2 ) {
      styleObject.width = '50%';
    } else {
      styleObject.width = '100%';
    }
    return styleObject
  }

  const dayUpdate = (e) => {

    e.preventDefault();

    // Error checking - the updateRound and the dayName need to be provided here or else the click breaks!
    console.log("click event: " + e.currentTarget.id)

    var currentClickTargetIdArray = e.currentTarget.id.split(":")

    var updateRound = currentClickTargetIdArray[0]
    var updateDayName = currentClickTargetIdArray[1]

    var currentRoundAvailability
    var updateObject = {}
    var newDayAvailability;

    if ( ! hasMatchAlreadyBeenPlayed(compRounds[season][activeComp][updateRound].days[updateDayName]) ) {    
      console.log('The day was clicked: ' + e.currentTarget.id)

      // var updateDayIndex =  currentClickTargetIdArray[3]
      var availIndex = uid + ":" + season + ":" + activeComp
      // So first we grab the current rounds into an object
      if ( typeof(avset[availIndex]) === 'undefined' ) {
        // there is no availability for this comp so we need to create it.
        var newAvailInsertObject = {}
        compAvailInsert(newAvailInsertObject)
        currentRoundAvailability = {}
        currentRoundAvailability[availIndex] = newAvailInsertObject;
      } else {
        currentRoundAvailability = avset[availIndex];
      }

      // 1. Check the size of typeof(currentRoundAvailability.round) to make sure it is greater than 0 - rounds SHOULD always be defined BUT.
      // 2. Check that typeof(currentRoundAvailability.round[updateRound]) !== 'undefined'
      // 3. Not undefined, so check typeof(currentRoundAvailability.round[updateRound][updateDayName]) !== undefined
      // 4. Not undefined, update it.
      // 5. Undefined, create the new Day with the value 'A'
      // 6. Round Undefinied, create the round, with the new Day with the value 'A'

      if ( typeof(currentRoundAvailability[updateRound]) !== 'undefined' ) {
        if ( typeof(currentRoundAvailability[updateRound][updateDayName]) !== 'undefined' ) {
          if ( currentRoundAvailability[updateRound][updateDayName] === "A"  ) {
            newDayAvailability = "M"
            currentRoundAvailability[updateRound][updateDayName] = newDayAvailability
          } else if ( currentRoundAvailability[updateRound][updateDayName] === "M"  ) {
            newDayAvailability = "U"
            currentRoundAvailability[updateRound][updateDayName] = newDayAvailability

          } else if ( currentRoundAvailability[updateRound][updateDayName] === "U" ) {
            newDayAvailability = "A"
            currentRoundAvailability[updateRound][updateDayName] = newDayAvailability

          } else {
            newDayAvailability = "A"
            currentRoundAvailability[updateRound][updateDayName] = newDayAvailability
          }

        } else {
          currentRoundAvailability[updateRound][updateDayName] = "A" // create the 'dayName' key and value
        }

        } else {
          currentRoundAvailability[updateRound] = {} // create the 'round' object
          currentRoundAvailability[updateRound][updateDayName] = "A" // create the 'dayName' key and value
        }

      updateObject[updateRound] = currentRoundAvailability[updateRound]
      updateObject["season"] = season;
      updateObject["activecomp"] = activeComp;
      updateObject["round"] = updateRound;
      updateObject["action"] = "set";

      // console.log("Debug the params passed to model: " + JSON.stringify(updateObject))
      return availPost(updateObject)
    }
    
    // Ignoring this click because the round occurs in the past.  return nothing
    console.log("Click ignored - past")
 
  }

  const getMatchGround = () => {
    if ( compRounds[season][activeComp][props.rndID].homeAwayInfo === "A" ) {
      return clubs[compRounds[season][activeComp][props.rndID].opposition].clubHomeGround
    } else if ( compRounds[season][activeComp][props.rndID].homeAwayInfo === "H" ){
      return clubs[clientSettings.acronym].clubHomeGround
    } else {
      return "TBA"
    }
  }

  // Takes a date string in the form 10/10/2020 and spits out 10/10/20
  const shortenYear = (dateString) => {
    var strDateDay = dateString.split("/")[0]
    var strDateMonth = dateString.split("/")[1]
    var strDateYear = dateString.split("/")[2]

    return strDateDay + "/" + strDateMonth + "/" + strDateYear.substr(-2)
  }

  const renderItems = []

  Object.keys(compRounds[season][activeComp][props.rndID].days).forEach((dayName)=>{
    renderItems.push(
      <button 
        key={props.rndID + ":" + dayName} 
        id={props.rndID + ":" + dayName} 
        onClick={dayUpdate} 
        style={getStyle(props.rndID, Object.keys(compRounds[season][activeComp][props.rndID].days).length, dayName)}
      >
{Object.keys(compRounds[season][activeComp][props.rndID].days).length === 1 ? roundNames[props.rndID].longName : (isTabletOrMobileDevice ? roundNames[props.rndID].shortName : roundNames[props.rndID].longName )}{<br/>}
        {/* {clientSettings.sport === 'football' ? compRounds[season][activeComp][props.rndID].homeAwayInfo === "H" ? "Home v " : "Away v " : Object.keys(compRounds[season][activeComp][props.rndID].days).length === 1 ? "" : prettyDays[dayName]} */}
        {clientSettings.sport === 'cricket' ? Object.keys(compRounds[season][activeComp][props.rndID].days).length === 1 ? "" : prettyDays[dayName] : "" }
        {clientSettings.sport === 'cricket' ? Object.keys(compRounds[season][activeComp][props.rndID].days).length === 1 ? "" : <br/> : ""}
        {/* Display the date, shorted the year if it is a 2 day game*/}
        {clientSettings.sport === 'cricket' ? Object.keys(compRounds[season][activeComp][props.rndID].days).length === 1 ? compRounds[season][activeComp][props.rndID].days[dayName] : (isTabletOrMobileDevice ? shortenYear(compRounds[season][activeComp][props.rndID].days[dayName]) : compRounds[season][activeComp][props.rndID].days[dayName] ) : ""}{<br/>}
        {/* {compRounds[activeComp].rounds[props.rndID].homeAwayInfo === "H" ? "Home v " : "Away v "} */}
        {"v"}{<br/>}
    <div style={{fontWeight:"Bold"}}>{Object.keys(compRounds[season][activeComp][props.rndID].days).length === 2 ? clubs[compRounds[season][activeComp][props.rndID].opposition].clubShortName : clubs[compRounds[season][activeComp][props.rndID].opposition].clubName}{<br/>}</div>
        <CompRoundsDayLogos
          rndID={props.rndID}
          dayName={dayName}
          homeAwayInfo={compRounds[season][activeComp][props.rndID].homeAwayInfo} 
          clubName={compRounds[season][activeComp][props.rndID].opposition} 
          clubLogoURL={clubs[compRounds[season][activeComp][props.rndID].opposition].clubLogoURL} 
        />
        <div>{compRounds[season][activeComp][props.rndID].time}</div>
        <div style={{fontWeight:"Bold"}}>
          {clientSettings.sport === 'football' ? getMatchGround() : compRounds[season][activeComp][props.rndID].homeAwayInfo}
          </div>
      </button>
    )
    })

  return (
    <React.Fragment>
      {renderItems}
    </React.Fragment>    
  )     
}
  
export default CompRoundsDay
