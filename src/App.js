import Amplify, { Auth, Hub } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import './App.css';
import { createButton, FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import config from './config';
import clientSettings from './clientSettings';
import Site from './components/Site.js';
import { createStore, StoreProvider } from 'easy-peasy';
import model from './models/model';

Amplify.configure({
  Auth: {
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      userPoolWebClientId: config.cognito.WEB_CLIENT_ID,
      oauth: {
          domain: config.cognito.DOMAIN,
          scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
          // scope: ['email', 'openid', 'aws.cognito.signin.user.admin'],
          redirectSignIn: config.cognito.REDIRECT_SIGN_IN,
          redirectSignOut: config.cognito.REDIRECT_SIGN_OUT,
          responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
      }
  },
  API: {
    endpoints: [
      {
        name: "apiGWta",
        endpoint: config.apiGateway.URL
      } 
    ]
  },
  Storage: {
    AWSS3: {
      bucket: config.s3.BUCKET,
      region: config.s3.REGION
    }
  }
});

const signInButtonConfig = {
  text: "Please Sign In",
  iconFormat: name => `fa fa-${name}`,
  style: { background: clientSettings.secondaryColour, color: clientSettings.primaryColour, display:"flex", justifyContent:"center", alignItems:"center" },
  activeStyle: { background: "#293e69", color:"white" }
};

const MySignInOutButton = createButton(signInButtonConfig);

const store = createStore(model);

// const userDetails = useStoreState(state => state.userDetails);
// const setUserDetails = useStoreActions(actions => actions.setUserDetails);


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // const currentConfig = Auth.configure();
    // console.log("Dumping Cognito Config: ")
    // console.log(currentConfig)

    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
        default:
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  function myFederatedSignIn() {
    Auth.federatedSignIn()
  }

  return (
    <StoreProvider store={store}>
      <div style={{textAlign:'center', alignItems:'center'}}>
        { user ? <Site/>  : 
          <React.Fragment>
            <h2 style={{color: clientSettings.primaryColour}}>
                {clientSettings.acronym} Availability App
            </h2>
            <br/>
              <img alt={clientSettings.acronym} width='40%' height='40%' src='/client_logo.png'></img>
            <br/>
            <div>
              <GoogleLoginButton key='google' onClick={() => Auth.federatedSignIn({provider: 'Google'})}/>
              <FacebookLoginButton key='facebook' onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}/>
              {/* <MySignInOutButton icon={clientSettings.clubLogoUrl} key='oauth' onClick={this.props.OAuthSignIn}/> */}
              <MySignInOutButton icon={'/client_logo.png'} key='oauth' onClick={myFederatedSignIn}/>
              <br/>
            </div>
          </React.Fragment>
        }
      </div>
      </StoreProvider>
  );
}

export default App;