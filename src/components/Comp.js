import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import clientSettings from '../clientSettings';



function Comp() {

  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 })
  const activeComp = useStoreState(state => state.activeComp);
  const compRounds = useStoreState(state => state.compRounds);
  const season = useStoreState(state => state.season);
  const competitions = useStoreState(state => state.competitions);

  const setActiveComp = useStoreActions(
    actions => actions.setActiveComp
  );


  const getStyle = (compRoundID) => {
    var styleObject = {
      // backgroundColor: 'inherit',
      overflow: 'hidden',
      float: 'left',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      padding: '8px 8px',
      transition: '0.3s',
      fontSize: '24px',
      fontWeight: 'bold',
      color: clientSettings.primaryColour,
      backgroundColor: 'inherit'
    }

    isTabletOrMobileDevice ? styleObject.fontSize = '14px' : styleObject.fontSize = '24px';

    if (compRoundID === activeComp) {
      styleObject.backgroundColor = '#ccc';
      return styleObject
    } else {
      return styleObject;
    }
  }

  const setComp = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.id)

    setActiveComp(e.currentTarget.id);
  }


  var returnItems = [];
  Object.keys(compRounds[season]).forEach((i) => {
    returnItems.push(
      <button 
      id={ i } 
      key={ i }
      label={competitions[i].name} 
      style={getStyle(i)}
      onClick={setComp}
    >
      {competitions[i].name}
    </button>
    )
  });

  return returnItems;
}

export default Comp
