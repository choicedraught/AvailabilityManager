import { default as React } from 'react';
// import {useMediaQuery} from 'react-responsive';

function Footer() {

  // const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 })

  return (
      // isTabletOrMobileDevice ?  
      // <div><header style={headerStyle}>Claremont Nedlands Cricket Club<br/> Player Manager App</header></div> 
      // : 
      // <div><header style={headerStyle}>Claremont Nedlands Cricket Club - Player Manager App</header></div>
      <div key='footer'  style={{alignItems:"center",fontSize:10}}>
        Copyright 2021, B3 Solutions | <a target="_blank" rel="noreferrer" href="https://cnccmanager.myplayers.club/privacy_policy.html">Privacy Policy</a> 
        <br/>
      </div>
  )
}

// const headerStyle = {
//   textAlign: 'right',
//   background: '#223A78',
//   color: 'white',
//   padding: '17px'
// }

//  burgundy color: '#9c2646',

export default Footer
