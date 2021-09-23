// import API from '@aws-amplify/api';
// import Auth from '@aws-amplify/auth';
import { API, Auth, Storage } from 'aws-amplify';
import { action, thunk } from 'easy-peasy';
import clubs from './clubs';
import fixtures from './fixtures'

export default {

    setUid: action((state, uid) => {
        state.uid = uid;
      }),
    setUserDetails: action((state, userDetails) => {
      state.userDetails = userDetails;
    }),
    userAttributes: {},
    userAttributesIsFetching: {},
    setUserAttributesIsFetching: action((state,payload)=> {
      state.userAttributesIsFetching = payload;
    }),
    getUserAttributes: thunk( async (actions,payload) => {
      actions.setUserAttributesIsFetching(true)
      const info = await Auth.currentAuthenticatedUser()
      actions.setUserAttributes(info)
    }),
    setUserAttributes: action((state, payload) => {
      state.userAttributes = payload;
      state.userAttributesIsFetching = false
    }),
    roleAccess: {
      senior: ["pre-season","prem","colts","t20"],
      u13: ["u13"],
      u14: ["u14"],
      u15: ["u15"],
      u17: ["u17"],
      admin: ["pre-season","prem","colts","t20","u13","u14","u15","u17"]
    },
    filterA: true,
    filterM: true,
    filterU: true,
    setFilter: action((state,payload)=>{
      if (payload === "filterA") {
        state.filterA = !state.filterA
      }
      if (payload === "filterM") {
        state.filterM = !state.filterM
      }
      if (payload === "filterU") {
        state.filterU = !state.filterU
      }
    }),
    availabilitySorting: "no-sort",
    setAvailabliltySorting: action((state,payload) => {
      state.availabilitySorting = payload;
    }),
    playersAvailability: {},
    playersAvailabilityLastModified: "",
    setPlayersAvailabilityLastModified: action((state,payload)=> {
      state.playersAvailabilityLastModified = payload
    }),
    playersAvailabilityIsFetching:false,
    setPlayersAvailabilityIsFetching: action((state,payload)=> {
      state.playersAvailabilityIsFetching = payload;
    }),
    getPlayersAvailabilityJSON: thunk( async (actions,payload) => {
      // Get Players Availability as a pre-written JSON document on S3
      // I think we only really need the season parameter on this request
      actions.setPlayersAvailabilityIsFetching(true)
      const availabilityData = await Storage.get(
        payload.season + "_" + payload.role + "_PlayersAvailability.json", 
        {
          download:  true,
          contentType: "application/json",
          cacheControl: "no-cache"
        }
      )
      actions.setPlayersAvailabilityIsFetching(false)
      console.log("Get Player Availability file success: " + JSON.stringify(availabilityData))
      actions.setPlayersAvailabilityLastModified(availabilityData.LastModified)
      const availabilityDataJSON = await availabilityData.Body.text()
      actions.setPlayersAvailability(JSON.parse(availabilityDataJSON))
  
    }),
    setPlayersAvailability: action((state, payload) => {
      state.playersAvailability[state.activeSeason] = payload;
    }),
    activeComp: "prem",
    season: "2122",
    activeSeason: "2122",
    seasons:[
      "2020",
      "2122"
    ],
    setActiveSeason: action((state,payload) => {
      state.activeSeason = payload
    }),
    prettyDays: {
        "day_1": "Day One",
        "day_2": "Day Two"
    },
    activeRound: "round_1",
    setActiveRound: action((state,payload) => {
      state.activeRound = payload
    }),
    setUid: action((state, uid) => {
      state.uid = uid;
    }),
    roundNames: {
      "round_1" : { "shortName": "Rnd 1","longName": "Round One"},
      "round_2" : { "shortName": "Rnd 2","longName": "Round Two"},
      "round_3" : { "shortName": "Rnd 3","longName": "Round Three"},
      "round_4" : { "shortName": "Rnd 4","longName": "Round Four"},
      "round_5" : { "shortName": "Rnd 5","longName": "Round Five"},
      "round_6" : { "shortName": "Rnd 6","longName": "Round Six"},
      "round_7" : { "shortName": "Rnd 7","longName": "Round Seven"},
      "round_8" : { "shortName": "Rnd 8","longName": "Round Eight"},
      "round_9" : { "shortName": "Rnd 9","longName": "Round Nine"},
      "round_10" : { "shortName": "Rnd 10","longName": "Round Ten"},
      "round_11" : { "shortName": "Rnd 11","longName": "Round Eleven"},
      "round_12" : { "shortName": "Rnd 12","longName": "Round Twelve"},
      "round_13" : { "shortName": "Rnd 13","longName": "Round Thirteen"},
      "round_14" : { "shortName": "Rnd 14","longName": "Round Fourteen"},
      "round_15" : { "shortName": "Rnd 15","longName": "Round Fifteen"},
      "round_16" : { "shortName": "Rnd 16","longName": "Round Sixteen"},
      "round_17" : { "shortName": "Rnd 17","longName": "Round Seventeen"},
      "round_18" : { "shortName": "Rnd 18","longName": "Round Eighteen"},
      "round_19" : { "shortName": "Rnd 19","longName": "Round Ninteen"},
      "round_20" : { "shortName": "Rnd 20","longName": "Round Twenty"},
      "round_21" : { "shortName": "Rnd 21","longName": "Round Twenty One"},
      "round_22" : { "shortName": "Rnd 22","longName": "Round Twenty Two"},
      "EF" : { "shortName": "EF","longName": "Elimination Final"},
      "QF" : { "shortName": "QF","longName": "Quarter Final"},
      "SF" : { "shortName": "SF","longName": "Semi Final"},
      "GF" : { "shortName": "GF","longName": "Grand Final"}
    },
    rounds: {
      "round_1" : { "roundName": "Round One", "roundShortName": "Rnd 1"},
      "round_2" : { "roundName": "Round Two", "roundShortName": "Rnd 2"},
      "round_3" : { "roundName": "Round Three  ", "roundShortName": "Rnd 3"},
      "round_4" : { "roundName": "Round Four", "roundShortName": "Rnd 4"},
      "round_5" : { "roundName": "Round Five", "roundShortName": "Rnd 5"},
      "round_6" : { "roundName": "Round Six", "roundShortName": "Rnd 6"},
      "round_7" : { "roundName": "Round Seven", "roundShortName": "Rnd 7"},
      "round_8" : { "roundName": "Round Eight", "roundShortName": "Rnd 8"},
      "round_9" : { "roundName": "Round Nine", "roundShortName": "Rnd 9"},
      "round_10" : { "roundName": "Round Ten", "roundShortName": "Rnd 10"},
      "round_11" : { "roundName": "Round Eleven", "roundShortName": "Rnd 11"},
      "round_12" : { "roundName": "Round Twelve", "roundShortName": "Rnd 12"},
      "round_13" : { "roundName": "Round Thirteen", "roundShortName": "Rnd 13"},
      "round_14" : { "roundName": "Round Fourteen", "roundShortName": "Rnd 14"},
      "round_15" : { "roundName": "Round Fifteen", "roundShortName": "Rnd 15"},
      "round_16" : { "roundName": "Round Sixteen", "roundShortName": "Rnd 16"},
      "round_17" : { "roundName": "Round Seventeen", "roundShortName": "Rnd 17"},
      "round_18" : { "roundName": "Round Eighteen", "roundShortName": "Rnd 18"},
      "round_19" : { "roundName": "Round Ninteen", "roundShortName": "Rnd 19"},
      "round_20" : { "roundName": "Round Twenty", "roundShortName": "Rnd 20"},
      "round_21" : { "roundName": "Round Twenty One", "roundShortName": "Rnd 21"},
      "round_22" : { "roundName": "Round Twenty Two", "roundShortName": "Rnd 22"},
      "QF" : { "roundName": "Qualifying Final", "roundShortName": "QF"},
      "EF" : { "roundName": "Elimination Final", "roundShortName": "EF"},
      "SF" : { "roundName": "Semi Final", "roundShortName": "SF"},
      "GF" : { "roundName": "Grand Final", "roundShortName": "GF"},
    },
    competitions: {
      "pre-season": {"name": "PS"},
      "prem": {"name": "Senior"},
      "u13": {"name": "U13"},
      "u14": {"name": "U14"},
      "u15": {"name": "U15"},
      "u17": {"name": "U17"},
      "colts": {"name": "Colts"},
      "t20": {"name": "T20"}
    },
    nbsc_competitions: {
      "prem": {"name": "Premier"},
      "reserves": {"name": "Reserves"},
      "social1": {"name": "Thirds"},
      "social2": {"name": "Fourths"},
    },
    uid: "",
    userDetails: {
      isFetching: false
    },
    avset:
    {
      isFetching: false
    },
    // Thunks
    getAvSet: thunk ( async (actions, payload) => {
      // console.log(debug("Get AvSet Payload: " + payload))
      actions.setAvSet({isFetching:true})
      // console.log(debug(`Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`))
      // console.log(debug(`Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`))
      let apiName = 'apiGWta'; // replace this with your api name.
      let path = '/getAvailability'; //replace this with the path you have configured on your API
      let myInit = {
        body: {
          "season": payload.season,
          "competitions": payload.competitions, 
          "action": "get"
        }, // replace this with attributes you need
        headers: {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Methods,Access-Control-Allow-Origin,access-control-allow-origin,access-control-allow-headers",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
        } // OPTIONAL
      }
      await API.post(apiName, path, myInit).then(response => {
          // Add your code here
          console.log("getAvailability Success Response: " + JSON.stringify(response))
          response.isFetching = false;
          actions.setAvSet(response)
      }).catch(error => {
          console.log("getAvailability Error Response: " + error)
      });
    }),
    setAvSet: action((state, payload) => {
      state.avset = payload;
    }),
    setActiveComp: action((state,payload) => {
      state.activeComp = payload
    }),
    compAvailInsert: action((state,payload) => {
      // console.log(debug(payload));
      var availIndex = state.uid + ":" + state.season + ":" + state.activeComp
      state.avset[availIndex] = payload;
    }),
    availPost: thunk( async (actions, payload) => {
      // console.log(debug("Availability Update Payload: " + JSON.stringify(payload)));
      let apiName = 'apiGWta'; // replace this with your api name.
      let path = '/setAvailability'; //replace this with the path you have configured on your API
      let myInit = {
        body: payload,
        headers: {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Methods,Access-Control-Allow-Origin,access-control-allow-origin,access-control-allow-headers",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
        } // OPTIONAL
      }
      await API.post(apiName, path, myInit).then(response => {
          // Add your code here
          // console.log("setAvailability Success Response: " + JSON.stringify(response))
          // actions.setAvSet(payload)
          actions.availUpdate(payload)
      }).catch(error => {
          console.log("setAvailability Error Response: " + JSON.stringify(error))
      });
    }),
    allAvailPost: thunk( async (actions, payload) => {
      // console.log(debug("setAllAvailability Update Payload: " + JSON.stringify(payload)));
      let apiName = 'apiGWta'; // replace this with your api name.
      let path = '/setAllAvailability'; //replace this with the path you have configured on your API
      let myInit = {
        body: payload,
        headers: {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Methods,Access-Control-Allow-Origin,access-control-allow-origin,access-control-allow-headers",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
        } // OPTIONAL
      }
      await API.post(apiName, path, myInit).then(response => {
          // Add your code here
          // console.log("setAllAvailability Success Response: " + JSON.stringify(response))
          // actions.setAvSet(payload)
          actions.allAvailUpdate(payload)
      }).catch(error => {
          console.log("setAllAvailability Error Response: " + JSON.stringify(error))
      });
    }),
    availUpdate: action((state, payload) => {
      // Needs review.
      // console.log(debug("Availability Update Payload: " + JSON.stringify(payload)));
      // console.log(debug(Object.keys(payload)[0]));
      // console.log(debug(Object.values(payload)[0]));
      // seems like you need to declare the state object and then add the value to it.
      var key = {} 
      key = Object.keys(payload)[0];
      var value = {} 
      value = Object.values(payload)[0];
      var avSetIndex = state.uid + ":" + state.season + ":" + state.activeComp
      state.avset[avSetIndex][key] = {};
      state.avset[avSetIndex][key] = value;
      // state.avset.isFetching = false;
    }),
    allAvailUpdate: action((state, payload) => {
      // console.log(debug("AllAvailability Update Payload: " + JSON.stringify(payload)));
      var avid = state.uid + ":" + state.season + ":" + state.activeComp;
      state.avset[avid] = payload.roundspayload;
    }),
    getUserPost: thunk( async (actions,payload) => {
            actions.getUser({isFetching:true})
            console.debug("getUser Payload: " + JSON.stringify(payload));
            let apiName = 'apiGWta'; // replace this with your api name.
            let path = '/getuser'; //replace this with the path you have configured on your API
            let myInit = {
              body: payload,
              headers: {
                "Access-Control-Allow-Headers": "Access-Control-Allow-Methods,Access-Control-Allow-Origin,access-control-allow-origin,access-control-allow-headers",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
              } // OPTIONAL
            }
            await API.post(apiName, path, myInit).then(response => {
              console.log("getUser Success Response: " + JSON.stringify(response))
              response.isFetching = false // not sure about this!
              actions.getUser(response)
              
            }).catch(error => {
                console.log("getUser Error Response: " + JSON.stringify(error))
            });
    }),
    getUser: action((state, payload) => {
      state.userDetails =  payload;
    }),
    setUserPost: thunk( async (actions, payload) => {
      // console.log(debug("Availability Update Payload: " + JSON.stringify(payload)));
      actions.setUser({isFetching: true})
      let apiName = 'apiGWta'; // replace this with your api name.
      let path = '/setuser'; //replace this with the path you have configured on your API
      let myInit = {
        body: payload,
        headers: {
          "Access-Control-Allow-Headers": "Access-Control-Allow-Methods,Access-Control-Allow-Origin,access-control-allow-origin,access-control-allow-headers",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
        } // OPTIONAL
      }
      await API.post(apiName, path, myInit).then(response => {
          // Add your code here
          console.log("setUser Success Response: " + JSON.stringify(response))
          actions.setUser(payload)
      }).catch(error => {
          console.log("setUser Error Response: " + JSON.stringify(error))
      });
    }),
    setUser: action((state, payload) => {
      console.log('userDetails Payload: ' + JSON.stringify(payload))
      state.userDetails = payload;
    }),
    editMode: false,
    toggleEditModeAction: action((state, currentEditMode) => {
      state.editMode = !currentEditMode
    }),
    clubs: clubs,
    compRounds: fixtures,
    fixtures
  }