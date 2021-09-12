import { useStoreState } from 'easy-peasy';
import { default as React } from 'react';
import { useMediaQuery } from 'react-responsive';



// this was change to a function, rather than an export class with a render().  
const DebugState = () => {

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
  }
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return isNotMobile ? children : null
  }

  // setup our Global State objects from easy peasy
  const uid = useStoreState(state => state.uid);
  const season = useStoreState(state => state.season);
  const activeComp = useStoreState(state => state.activeComp); // this should be a prop that is passed from the App.js I thinK?  Not global state.
  const avset = useStoreState(state => state.avset);
  // const compRounds = useStoreState(state => state.compRounds);

  const availIndex = uid + ":" + activeComp + ":" + season

  // const availUpdate = useStoreActions(
  //   actions => actions.availUpdate
  // );

  var debugReturn = []

  debugReturn.push(
    <br key="br1"/>
  );
  debugReturn.push(
    <div key="uid" style={{textAlign:"left"}}>:: Debug Component ::</div>
  )
  debugReturn.push(
    <br key="br2"/>
  );
  debugReturn.push(
    <div key="seasons" style={{textAlign:"left"}}>UID: {uid} | Season: {season} | Active Comp: {activeComp}</div>
  )

  debugReturn.push(
    <div key="av" style={{textAlign:"left"}}><pre>{JSON.stringify(avset[availIndex], null, 2) }</pre></div>
  )
  debugReturn.push(
    <div key='deviceType'>
      <Desktop>Desktop or laptop</Desktop>
      <Tablet>Tablet</Tablet>
      <Mobile>Mobile</Mobile>
      <Default>Not mobile (desktop or laptop or tablet)</Default>
    </div>
  )
  
  return (
    <React.Fragment>
      {debugReturn}
    </React.Fragment>
  )      
}

export default DebugState
