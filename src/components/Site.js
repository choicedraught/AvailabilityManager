import Amplify from 'aws-amplify';
import React from 'react';
import Menu from 'react-burger-menu/lib/menus/slide';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../App.css';
import About from './About';
import AllOnOffButtons from './AllOnOffButtons';
import Comp from './Comp';
import CompRounds from './CompRounds';
import '../css/buttonHolder.css';
import Header from './Header';
import Profile from './Profile';
import UserDetails from './UserDetails';
import Footer from './Footer';

// const store = createStore(model);

function signOut() {
    Amplify.Auth.signOut().then(() => {
      this.setState({authState: 'signIn'});
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

function Site() {
  
    return (
        // <StoreProvider store={store}>
          <Router>         
          <div id="outer-container">
          <Header/>
            <Menu left pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } >
              <a id="availability" className="menu-item" href="/">availability</a>
              <a id="profile" className="menu-item" href="/profile">profile</a>
              {/* <a id="subs" className="menu-item" href="/subs">subs</a> */}
              <a id="about" className="menu-item" href="/about">about</a>
              <a onClick={ signOut } className="menu-item" href="/logout">logout</a>
            </Menu>
            <div className="App">
              <main id="page-wrap">
                <div className="container">
                  {/* <button onClick={() => Amplify.Auth.federatedSignIn()}>Sign In</button>
                  <button onClick={checkUser}>Check User</button>
                  <button onClick={signOut}>Sign Out</button> */}
                  <Route exact path="/" render={
                    props => (
                      <React.Fragment>
                        {/* This div is to hold the tabs menu and the OnOff buttons and keep them on seperate lines */}
                        <div style={{fontSize: "75%", display: "flex"}}>
                          <UserDetails />
                        </div>
                        <div style={{display: "grid",gridTemplateColumns: "1", gridTemplateRows: "2"}}>
                          <div className='tabs'>
                            <Comp />
                          </div>
                          <div className='allOnOffButtons'>
                            <AllOnOffButtons />
                          </div>
                        </div>
                        <div className='button-holder'>
                          <CompRounds />
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
                  <Route exact path="/profile" render={
                    props => (
                      <React.Fragment>
                        <Profile />
                      </React.Fragment>
                    )} />
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
        // </StoreProvider>
  
    );
  }

export default Site;