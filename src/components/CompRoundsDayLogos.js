import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import clientSettings from '../clientSettings';

// export class CompRoundsDayLogos extends Component {
function CompRoundsDayLogos (props) {

  const getLogo = (l, CN) => {
    if (l === "H") {
      return CN.logo
    } else if (l === "A") {
      // console.log("URL: " + props.clubLogoURL || "https://www.waca.com.au/Content/statesite/img/WACA-master-notag.png")
      return props.clubLogoURL || clientSettings.clubLogoUrl
    } else if ( l === "B") {
      // return "https://banner2.kisspng.com/20171220/vye/letter-b-png-5a3a4f45d40d77.40891921151377082186862035.jpg"
      return "https://freeiconshop.com/wp-content/uploads/edd/cross-flat.png"
    } else  {
      return clientSettings.clubLogoUrl
    }
  }
  const getName = (n, CN) => {
    if (n === "H") {
      return CN.name
    } else if (n === "A") {
      return props.clubName || "TBA"
    } else if ( n === "B") {
      return "BYE"
    } else if ( n === "T") {
      return "TBA"
    }
  }

  // const handlecClick = (e) => {
  //   // console.log(JSON.stringify(e))
  // }

    const CN = {
      name: clientSettings.name,
      logo: clientSettings.clubLogoUrl
    }
    const returnItems = []
    
    returnItems.push(
      <img 
      key={uuidv4()}
      id={props.rndID + ":" + props.dayName} // Done to match the element id of the parent ( so that the click event works).  #Kludge
      src={getLogo("A", CN)}
      alt={getName("A", CN)}
      style={{width:"50px", height:"50px", paddingLeft:"3px", paddingRight:"3px", paddingTop:"3px", cursor:'pointer'}}
      >
      </img>
    ) 

    return (
      <React.Fragment>
        { returnItems }
      </React.Fragment>
    )
  }

export default CompRoundsDayLogos