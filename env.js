import Constants from "expo-constants";

///env isolation

const ENV = {
  dev: {
    Auth0_Domain: "https://pensionjar-development.eu.auth0.com",
    Auth0_ClientID: "LFi1MZQxXQW4Y1vMhEOXN7Sy11naYTcF",
    Auth0_ClientSecret:
      "b8fUvWYThhkLxOf4d_UsGLBayfl1pCnQTkll9U8qtHrB6VPyFsfeIH7CRdcKhh9-",
    Base_Url: "https://pj-jarvis-backend-development.herokuapp.com/v1",
    audience: "https://getjarvis.local",
    redirectUrl:"https://getjarvis.local"
  },
  staging: {
    //Staging config
    Auth0_Domain: "https://pensionjar-staging.eu.auth0.com",
    Auth0_ClientID: "PAQK5rFTPu2jdg2rSM4I0Nwjcwk8XWkI",
    Auth0_ClientSecret:
      "_-NCxLhpJlg5q8J6K2LYKyi_1CNu8uwbrU-X0s3IkxiLj3jhCjF37FdquZK78gUM",
    Base_Url: "https://api.getjarvis.dev/v1",
    audience: "https://getjarvis.dev",
    redirectUrl:"https://getjarvis.dev"
  },
  prod: {
    //production config ------
    //we will change this to production.config later, once prod. env is available
    //when prod is available
    Auth0_Domain: "https://pensionjar-staging.eu.auth0.com",
    Auth0_ClientID: "PAQK5rFTPu2jdg2rSM4I0Nwjcwk8XWkI",
    Auth0_ClientSecret:
      "_-NCxLhpJlg5q8J6K2LYKyi_1CNu8uwbrU-X0s3IkxiLj3jhCjF37FdquZK78gUM",
    BaseUrl: "https://api.getjarvis.dev/v1",
    audience: "https://getjarvis.dev",
  },
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("staging") !== -1) return ENV.staging;
  if (env.indexOf("prod") !== -1) return ENV.prod;
}

//export default getEnvVars(Constants.manifest.releaseChannel);
export default getEnvVars("staging");
