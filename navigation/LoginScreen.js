import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Platform,
  Animated,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from "react-native";
import Env from "../env";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as AuthSession from "expo-auth-session";
const axios = require("axios");
import * as helpers from "../Helpers";
import UserContext from "../contexts/UserContext";
import JarvisButton from "../components/JarvisButton";
import JarvisLoading from "../components/JarvisLoading";

function LoginScreen() {
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");
  const [buttonTextColor, setButtonTextColor] = useState("#fff");
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);
  const [hasCode, setHasCode] = useState(false);
  const [discovery, setDiscovery] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isFading, setIsFading] = useState(false);

  const _updateUser = (dt) => {
    ctx.setAtk(dt.atk);
    ctx.setRtk(dt.rtk);
    ctx.setU(dt.u);
    ctx.setLoggedIn(true);
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
    //setIsFading(false);
  });

  const requestNewAccessTokenBuffer = 1000;
  //Development config
  //const Auth0_Domain = "https://pensionjar-development.eu.auth0.com";
  // const Auth0_Domain = helpers.API;
  // const Auth0_ClientID = "LFi1MZQxXQW4Y1vMhEOXN7Sy11naYTcF";
  // const Auth0_ClientSecret =
  //   "b8fUvWYThhkLxOf4d_UsGLBayfl1pCnQTkll9U8qtHrB6VPyFsfeIH7CRdcKhh9-";

  /**
	//Staging config
    const Auth0_Domain = "https://pensionjar-staging.eu.auth0.com";
    const Auth0_ClientID = "PAQK5rFTPu2jdg2rSM4I0Nwjcwk8XWkI";
	const Auth0_ClientSecret = "_-NCxLhpJlg5q8J6K2LYKyi_1CNu8uwbrU-X0s3IkxiLj3jhCjF37FdquZK78gUM";
    **/
  const {
    Auth0_Domain,
    Auth0_ClientID,
    Auth0_ClientSecret,
    Base_Url,
    audience,
  } = Env;
  const authorizationEndpoint = `${Auth0_Domain}/authorize`;
  const oauthEndpoint = `${Auth0_Domain}/oauth/token`;

  const useProxy = Platform.select({ web: false, default: true });
  const redirectUri = AuthSession.makeRedirectUri({ useProxy });
  let disc = null,
    auth0 = null,
    oauthPayload = null,
    request = null,
    result = null,
    promptAsync = null;

  useEffect(async () => {
    if (!hasCode) {
      setHasCode(true);
      disc = await AuthSession.fetchDiscoveryAsync(Auth0_Domain);
      setDiscovery(disc);
    }
    // console.log(Env);
  }, []);

  const authPayload = {
    redirectUri: redirectUri,
    clientId: Auth0_ClientID,
    clientSecret: Auth0_ClientSecret,
    responseType: AuthSession.ResponseType.Code,
    // retrieve the user's profile
    scopes: ["openid", "profile", "offline_access"],
    //audience: "https://auth.expo.io/@pensionjar/jarvis",
    // audience: "https://getjarvis.local",
    audience,
    extraParams: {
      // ideally, this will be a random value
    },
    prompt: AuthSession.Prompt.Login,
  };

  [request, result, promptAsync] = AuthSession.useAuthRequest(authPayload, {
    authorizationEndpoint,
  });

  const _initLogin = () => {
    promptAsync({ useProxy });
  };

  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  //console.log(`Redirect URL: ${redirectUri}`);

  useEffect(async () => {
    if (result) {
      let params = result.params;
      if (result.error) {
        helpers.jarvisAlert({
          type: "danger",
          message: result.params.error_description || "Something went wrong..",
        });
        return;
      }
      if (result.type && result.type == "dismiss") {
        helpers.jarvisAlert({
          type: "danger",
          message: "Your login attempt was dismissed.",
        });
        return;
      }
      if (params.code) {
        //Exchange the authorization code for access and id tokens

        //Send POST request
        setLoginLoading(true);
        setLoginButtonDisabled(true);
        oauthPayload = {
          grant_type: "authorization_code",
          client_id: Auth0_ClientID,
          redirect_uri: redirectUri,
          code: params.code,
          code_verifier: request.codeVerifier,
        };

        //create request
        let url = `${Auth0_Domain}/oauth/token`,
          dest = "";

        let payload = await axios({
          method: "post",
          url: url,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: helpers._urlEncode(oauthPayload),
        });

        if (payload?.status == "200") {
          let dt = payload.data;

          //console.log("dt: ",dt);
          if (dt.hasOwnProperty("access_token") && dt.access_token.length < 1) {
            helpers.jarvisAlert({
              type: "danger",
              message: `There was an issue with verifying your identity, please try again.`,
            });
          } else {
            try {
              // Refetch the access token before it expires
              setTimeout(async () => {
                oauthPayload.refresh_token = dt.refresh_token;
                oauthPayload.grant_type = "refresh_token";
                // console.log("oauthPayload: ",oauthPayload);

                let dt3response = await axios({
                  method: "post",
                  url: url,
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  data: helpers._urlEncode(oauthPayload),
                });
                let dt3 = dt3response?.data;

                console.log("dt3: ", dt3);

                //Get the user info

                let url3 = `${Base_Url}/users/me`;

                let userInfo = await axios({
                  method: "get",
                  url: url3,
                  headers: {
                    Authorization: `Bearer ${dt3.access_token}`,
                  },
                });

                if (userInfo?.status == "200") {
                  let uidt = userInfo.data;
                  // console.log("userInfo: ",uidt);
                  //Save user info, access token, refresh token and update user context
                  //User info
                  //console.log("userinfo dt: ",uidt.data);
                  console.log("userInfo is-");
                  let attributes = uidt.data.attributes,
                    included = uidt.data.included[0];
                  included?.attributes?.lifeExpectancies &&
                    delete included.attributes.lifeExpectancies;
                  let trimmedUserInfo = {
                    attributes: {
                      title: attributes.title,
                      name: attributes.name,
                      fname: attributes.firstName,
                      lname: attributes.lastName,
                      email: attributes.email,
                      gender: attributes.gender,
                    },
                    type: included.type,
                    id: included.id,
                    included: [included.attributes],
                  };
                  console.log("trimmedUserInfo: ", trimmedUserInfo);
                  helpers.save("pa_atk", dt3.access_token);
                  helpers.save("pa_rtk", dt3.refresh_token);

                  helpers.save("pa_u", JSON.stringify(trimmedUserInfo));

                  _updateUser({
                    u: trimmedUserInfo,
                    atk: dt3.access_token,
                    rtk: dt.refresh_token,
                  });
                } else {
                  console.log("error fetching user profile");

                  /*skipping to setup for presenttion purposes
								_updateUser({
									u: {
										name: "Default User",
										fname: "Default",
										lname: "User",
										email: "default@esoftresponse.com",
										type: "retirementProfile",
										id: "default-12343-222",
										attributes: {}
									},
									atk: dt3.access_token,
									rtk: dt.refresh_token
								});
								*/
                }
              }, requestNewAccessTokenBuffer);
            } catch (error) {
              console.log("error in try block: ", error);
            }
          }
        } else {
          return { status: "error", message: "Technical error" };
        }
      }
    }
    //console.log("OS:",Platform.OS);
  }, [result]);

  return (
    <View style={styles.container}>
      <View style={{ ...styles.centerView, marginTop: 100 }}>
        <Text style={[styles.loginText, { marginBottom: 100, fontSize: 40 }]}>
          Jarvis
        </Text>
      </View>
      <View style={{ alignItems: "center", marginVertical: 30 }}>
        <Text style={[styles.loginText, { marginBottom: 50 }]}>
          Welcome to Jarvis!
        </Text>
        <Text style={styles.subText}>
          Click the button below to continue to login or signup
        </Text>

        {loginLoading && <JarvisLoading />}
      </View>

      <View style={{ alignItems: "center" }}>
        <JarvisButton
          style={styles.loginButton}
          disabled={loginButtonDisabled}
          bgcolor={buttonBackground}
          play={_initLogin}
          btn="Continue"
          w={150}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    paddingLeft: 5,
    //justifyContent: 'space-around',
  },
  centerView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  subText: {
    textAlign: "center",
    fontWeight: "100",
  },
  validation: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  loginLogo: {
    marginTop: 30,
    marginLeft: Dimensions.get("window").width / 6,
  },
  loginText: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
    // padding: 10
  },
  loginButton: {
    // alignItems: "center",
    marginTop: 50,
    // marginLeft: 20,
  },
  form: {},
});

export default LoginScreen;
