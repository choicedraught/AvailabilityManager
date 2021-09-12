import { default as React } from 'react';
import {useMediaQuery} from 'react-responsive';
import clientSettings from '../clientSettings'

function Header() {

  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 })

  return (
      isTabletOrMobileDevice ?  
      <div><header style={headerStyle}>{clientSettings.longName}<br/> Player Management</header></div> 
      : 
      <div><header style={headerStyle}>{clientSettings.longName} - Player Management</header></div>
  )
}

const headerStyle = {
  textAlign: 'right',
  background: clientSettings.primaryColour,
  color: 'white',
  padding: '17px'
}

export default Header
