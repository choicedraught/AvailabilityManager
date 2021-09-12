const dev = {
    s3: {
      BUCKET: "nbscdev"
    },
    apiGateway: {
      REGION: "ap-southeast-2",
      URL: "https://736jmbecvg.execute-api.ap-southeast-2.amazonaws.com/dev"
    },
    cognito: {
      REGION: "ap-southeast-2",
      USER_POOL_ID: "ap-southeast-2_W0MfPldD3",
      WEB_CLIENT_ID: "41f9la56p9ctd66kfg2a6ovuqf",
      APP_CLIENT_ID: "",
      IDENTITY_POOL_ID: "ap-southeast-2:dc27100d-9d0c-4f29-baba-186c55d2b571",
      DOMAIN: "nbscdev-playermanagement.auth.ap-southeast-2.amazoncognito.com",
      REDIRECT_SIGN_IN: "http://localhost:3000/",
      REDIRECT_SIGN_OUT: "http://localhost:3000/logout/"
    }
  };
  
  const prod = {
    s3: {
      BUCKET: "nbscprod"
    },
    apiGateway: {
      REGION: "ap-southeast-2",
      URL: "https://b4ldv231ii.execute-api.ap-southeast-2.amazonaws.com/prod"
    },
    cognito: {
      REGION: "ap-southeast-2",
      USER_POOL_ID: "ap-southeast-2_FcvaCUUa5",
      WEB_CLIENT_ID: "64uessga80p3a67ht0vske7uhh", // 55ae3opj5okpbsaqg064mp9u67
      APP_CLIENT_ID: "5d2vm7aokb93r0vrfu9p03nis2",  // 5d2vm7aokb93r0vrfu9p03nis2
      IDENTITY_POOL_ID: "ap-southeast-2:8d11b2de-53ca-4539-9dff-5460de966d23",
      DOMAIN: "nbsc-playermanagement.auth.ap-southeast-2.amazoncognito.com",
      REDIRECT_SIGN_IN: "https://nbsc.myplayers.club/",
      REDIRECT_SIGN_OUT: "https://nbsc.myplayers.club/logout/"
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