import { default as React } from 'react';
import '../css/buttonHolder.css';

const About = () => {

  return (
    <div className='about-title'>
      <h3>About Tigers Player Management</h3>
      <div><h3>How to use</h3></div><div></div>
          <div>
            Select the competition from the Competition selection tabs Prem / Under 15 & 17 / T20 / Colts
          </div>
          <br/>
        <div className='howto' style={{display: "grid", gridTemplateColumns: "25% 75%"}}>
          <div>
            <button className='available float-left' style={{width:"100%"}}>Round 1<br/>Day 1<br/>5/10/19<br/>Mount Lawley</button>
          </div>
          <div style={{textAlign: "right"}}>
            Mark a button as green with a single click, to indicate you are available for a match / day.
          </div>
          <div><br/></div><div></div>
          <div>
            <button className='maybe float-left' style={{width:"100%"}}>Round 2<br/>Day 1<br/>5/10/19<br/>University</button>
          </div>
          <div style={{textAlign: "right"}}>
            Mark a button as orange with a second click, to indicate you are unsure if you can play a match / day and will discuss this with the Chairman of Selectors or Coaches.
          </div>
          <div><br/></div><div></div>
          <div>
            <button className='unavailable float-left' style={{width:"100%"}}>Round 3<br/>Day 1<br/>5/10/19<br/>South Perth</button>
          </div>
          <div style={{textAlign: "right"}}>
            Mark a button as red with a third click, to indicate you are unavailable to play a match / day.
          </div>
        </div>
        <br/>
        <div>
            You can continue clicking a button to cycle through the states available/maybe/unavailable for a particular match or day.
        </div>
        <br/>
        <div style={{textAlign: "left"}}>Alternatively you can use these buttons to update an entire competition - season availablitity in one click. </div><div></div>
        <div style={{display: "grid",gridTemplateColumns: "50% 50%"}}>
          <button className='available'>Set all Available</button>
          <button className='unavailable'>Set all Unavailable</button>
        </div>
        <br/>
        <div style={{textAlign: "left", fontSize: "10"}}>
          <table>
            <tr>
              <td><b>Prem </b></td><td>A:H:A:H </td><td> 1's Away, 2's Home, 3's Away, 4's Home</td>
            </tr>
            <tr>
              <td><b>U15 / 17's</b></td><td>A:H </td><td> 17's Away, 15's Home</td>
            </tr>
            <tr>
              <td><b>All</b></td><td> T </td><td> Venue to be advised.</td>
            </tr>
          </table>
        </div>
        <br/>

        <div><h3>Report Problems</h3></div><div></div>
        <div>Contact Jack by <a href="http://m.me/jack.bryant79" rel='noopener noreferrer' target="_blank" >messaging me on Facebook</a></div>
        <br/>

    </div>
    
  )
}
  
export default About;