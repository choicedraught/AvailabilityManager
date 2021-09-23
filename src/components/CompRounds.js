import Auth from '@aws-amplify/auth';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { default as React, useEffect } from 'react';
import CompRoundsDay from './CompRoundsDay';
import '../css/buttonHolder.css';
import clientSettings from '../clientSettings';

// this was change to a function, rather than an export class with a render().  
const CompRounds = () => {

  const avset = useStoreState(state => state.avset);

  const season = useStoreState(state => state.season);

  const setUid = useStoreActions(actions => actions.setUid);
  const setUserAttributes = useStoreActions(actions => actions.setUserAttributes);

  const getAvSet = useStoreActions(actions => actions.getAvSet);

  useEffect(() => {

    var competitions = Object.keys(compRounds[season]);
    var payload = {
      season,
      competitions
    }

    // First things first, make a request to the getAvailability API and return existing AvSet.
    getAvSet(payload);

    // Also grab the UID from the AWS Auth SDK so that we have it for future requests
    Auth.currentAuthenticatedUser().then((user) => {
      setUid(user.attributes.sub);
      // setUserAttributes(user);
      // getAvSet(user.username + ":" + season);
    })
    .catch((err) => {
      console.log(err);
      // Flash up a warning about not being able to get the UID?
      // or redirect to logout page
    })
    if (clientSettings.sport === 'cricket') {
      Auth.currentAuthenticatedUser().then((info) => {
        setUserAttributes(info);
      })
      .catch((err) => {
        console.log(err);
        // Flash up a warning about not being able to get the UID?
        // or redirect to logout page
      })
    }
    // eslint-disable-next-line
  }, []);

  // setup our Global State objects from easy peasy
  const activeComp = useStoreState(state => state.activeComp); // this should be a prop that is passed from the App.js I thinK?  Not global state.  NA global state is good
  const compRounds = useStoreState(state => state.compRounds);
  
  // Render a div for each round
  // Render a new Component

  const returnItems = [];

  if (avset.isFetching) {
    //  render the spinner
    // Push 4 divs to occupy the first 4 grid sections before the spinner
    returnItems.push(
      <div key='occ1'></div>
    )
    returnItems.push(
      <div key='occ2'></div>
    )
    returnItems.push(
      <div key='occ3'></div>
    )
    returnItems.push(
      <div key='occ4'></div>
    )
    returnItems.push(
      <div key={'loading'} style={{
        background: 'white',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(data:image/gif;base64,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)`
      }}><canvas/></div>
    )
  } else {
    Object.keys(compRounds[season][activeComp]).forEach((rndID) => (
      returnItems.push(
        <div key={rndID} id={rndID} >
          <CompRoundsDay key={rndID} rndID={rndID}/>
        </div>
      )
    ))
  }

  return (
    <React.Fragment>
      {returnItems}
    </React.Fragment>
    
  )
}
  
export default CompRounds
