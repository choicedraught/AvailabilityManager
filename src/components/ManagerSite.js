import Amplify from 'aws-amplify';
import React from 'react';
import Menu from 'react-burger-menu/lib/menus/slide';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../css/burgerMenu.css'
import About from './About';
import Header from './Header';
import Footer from './Footer';
import MatchSelector from './MatchSelector';
import MatchOppositionAndLocation from './MatchOppositionAndLocation';
import SortAndFilterSelector from './SortAndFilterSelector';
import TeamLists2 from './TeamLists2';


// const store = createStore(model);


function signOut() {
  Amplify.Auth.signOut().then(() => {
    // this.setState({authState: 'signIn'});
    this.state = {
      authState: 'signIn',
      authData: null,
      authError: null
    }
  }).catch(e => {
    console.log(e);
  });
}

// function checkUser() {
//   Amplify.Auth.currentAuthenticatedUser({
//     bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
//   }).then(user => console.log(user))
//   .catch(err => console.log(err));
// }

// function getToken() {
//   Amplify.Auth.currentSession((session)=>{
//     session.getIdToken().getJwtToken()
//   }).then(token => console.log(token))
//   .catch(err => console.log(err));
// }



function ManagerSite () {

    return (
        <Router>         
        <div id="outer-container">
        <Header/>
          <Menu left pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } >
            <a id="lineups" className="menu-item" href="/">team lists</a>
            {/* <a id="teamlists" className="menu-item" href="/teamlists">team lists</a> */}
            {/* <a id="profile" className="menu-item" href="/profile">profile</a> */}
            {/* <a id="subs" className="menu-item" href="/subs">subs</a> */}
            <a id="about" className="menu-item" href="/about">about</a>
            <a onClick={signOut} className="menu-item" href="/logout">logout</a> 
          </Menu>
          <div className="App">
            <main id="page-wrap">
              <div className="container" >
                {/* <button onClick={() => Amplify.Auth.federatedSignIn()}>Sign In</button>
                <button onClick={checkUser}>Check User</button>
                <button onClick={signOut}>Sign Out</button>
                <button onClick={getToken}>Get Token</button> */}

                <Route exact path="/" render={
                  props => (
                    <React.Fragment>
                      <div style={{width: '100%'}}>
                        <div style={{display:'grid',gridTemplateColumns:'20% 35% 45%',width: '100%'}}>
                          <MatchSelector />
                        </div>
                      </div>
                      <div>
                        <div>
                          <MatchOppositionAndLocation />
                        </div>
                      </div>
                      <div>
                        <div >
                          <SortAndFilterSelector />
                        </div>
                      </div>
                      <div style={{display:'grid',gridTemplateColumns:'15% 75% 10%',width: '100%'}}>
                      {/* <QueryClientProvider client={queryClient}> */}
                        <TeamLists2 /> 
                      {/* </QueryClientProvider> */}
                      </div>
                      <div>
                        <Footer />
                      </div>
                      {/* <div>
                        <DebugState />
                      </div> */}
                    </React.Fragment>
                  )
                } />
                <Route exact path="/about" render={
                  props => (
                    <React.Fragment><About/></React.Fragment>

                )} />
                <Route exact path="/logout" render={
                  props => (
                  <div>
                    {/* This is never rendered */}
                    You have been logged out.  Login again <a href="/">here</a>
                  </div>
                )} />
              </div>
            </main>
          </div>
          </div>
        </Router>
    )
}

export default ManagerSite;