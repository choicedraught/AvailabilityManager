const dev = {
    s3: {
      BUCKET: "cnccdev",
      REGION:"ap-southeast-2"
    },
    apiGateway: {
      REGION: "ap-southeast-2",
      URL: "https://bl61e0d9a7.execute-api.ap-southeast-2.amazonaws.com/dev"
    },
    cognito: {
      REGION: "ap-southeast-2",
      USER_POOL_ID: "ap-southeast-2_CiyQjUNXP",
      WEB_CLIENT_ID: "3i5q2g3nparu6lbk5jvih3t0l",
      APP_CLIENT_ID: "",
      IDENTITY_POOL_ID: "ap-southeast-2:ac0f516f-8bb8-483f-b361-87d96cf9f6d3",
      DOMAIN: "cnccdev-playermanagement.auth.ap-southeast-2.amazoncognito.com",
      REDIRECT_SIGN_IN: "http://localhost:3001/",
      REDIRECT_SIGN_OUT: "http://localhost:3001/logout/"
    }
  };
  
  const prod = {
    s3: {
      BUCKET: "cnccprod",
      REGION:"ap-southeast-2"
    },
    apiGateway: {
      REGION: "ap-southeast-2",
      URL: "https://88y2bui3e7.execute-api.ap-southeast-2.amazonaws.com/prod"
    },
    cognito: {
      REGION: "ap-southeast-2",
      USER_POOL_ID: "ap-southeast-2_SZKN9U2PC",
      WEB_CLIENT_ID: "324ivvmjtpfnnja5ljbmcfhlgm", // 55ae3opj5okpbsaqg064mp9u67
      APP_CLIENT_ID: "461m1t5315tgd8ososdpp2fv9e",  // 5d2vm7aokb93r0vrfu9p03nis2
      IDENTITY_POOL_ID: "ap-southeast-2:1110bf6d-d62b-4a86-b7e7-2f8270b36ac7",
      DOMAIN: "cnccprod-playermanagement.auth.ap-southeast-2.amazoncognito.com",
      REDIRECT_SIGN_IN: "https://cncc.myplayers.club/",
      REDIRECT_SIGN_OUT: "https://cncc.myplayers.club/logout/"
    }
  };
    
  const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev;
  
  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
  };