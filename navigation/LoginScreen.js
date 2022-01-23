import React, { useState, useEffect, useRef, useContext } from 'react';
import { Platform, Animated, StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as AuthSession from 'expo-auth-session';
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';
import JarvisButton from '../components/JarvisButton';


function LoginScreen(){
	const ctx = useContext(UserContext);
    const [buttonBackground,setButtonBackground] = useState("#77f");
	const [buttonTextColor,setButtonTextColor] = useState("#fff");
	const [tryLogin,setTryLogin] = useState(true);
	const [hasCode,setHasCode] = useState(false);
	const [discovery,setDiscovery] = useState(null);
	
	const fadeAnim =  useRef(new Animated.Value(1)).current;
	const [isFading, setIsFading] = useState(false);


    const _updateUser = (dt) => {
		         ctx.setAtk(dt.atk);
				 ctx.setRtk(dt.rtk);
		         ctx.setU(dt.u);
		         ctx.setLoggedIn(true);
	}

	useEffect(() => {
          Animated.loop(
          Animated.sequence([
            Animated.timing(fadeAnim,{
               toValue: 0,
               duration: 500,
               useNativeDriver: true
            }),
            Animated.timing(fadeAnim,{
              toValue: 1,
              duration: 500,
              useNativeDriver: true
            })
          ])
		  ).start();
		  //setIsFading(false);
	    
      });

     const requestNewAccessTokenBuffer = 5 * 1000;
	 //Development config
    const Auth0_Domain = "https://pensionjar-development.eu.auth0.com";
    const Auth0_ClientID = "LFi1MZQxXQW4Y1vMhEOXN7Sy11naYTcF";
	const Auth0_ClientSecret = "b8fUvWYThhkLxOf4d_UsGLBayfl1pCnQTkll9U8qtHrB6VPyFsfeIH7CRdcKhh9-";

	/**
	//Staging config
    const Auth0_Domain = "https://pensionjar-staging.eu.auth0.com";
    const Auth0_ClientID = "PAQK5rFTPu2jdg2rSM4I0Nwjcwk8XWkI";
	const Auth0_ClientSecret = "_-NCxLhpJlg5q8J6K2LYKyi_1CNu8uwbrU-X0s3IkxiLj3jhCjF37FdquZK78gUM";
    **/

	const authorizationEndpoint = `${Auth0_Domain}/authorize`;
	const oauthEndpoint = `${Auth0_Domain}/oauth/token`;

    const useProxy = Platform.select({ web: false, default: true });
    const redirectUri = AuthSession.makeRedirectUri({ useProxy });
	let disc = null, auth0 = null, oauthPayload = null,
	    request = null, result = null, promptAsync = null;
    
	useEffect(async () => {
	  if(!hasCode){
		setHasCode(true);
		disc = await AuthSession.fetchDiscoveryAsync(Auth0_Domain);
		setDiscovery(disc);
	  }
	});
	
	const authPayload = {
		redirectUri: redirectUri,
		clientId: Auth0_ClientID,
		responseType: AuthSession.ResponseType.Code,
		// retrieve the user's profile
		scopes: ["openid", "profile", "offline_access"],
		extraParams: {
		  // ideally, this will be a random value
		  audience: `${Auth0_Domain}/api/v2/`
		},
		prompt: AuthSession.Prompt.Login
	  };

	 [request, result, promptAsync] = AuthSession.useAuthRequest(
		authPayload,
		{ authorizationEndpoint }
	  );

	  const _initLogin = () => {
		promptAsync({ useProxy });
	  }
    

	// Retrieve the redirect URL, add this to the callback URL list
	  // of your Auth0 application.
	  //console.log(`Redirect URL: ${redirectUri}`);
	  

	  useEffect(async () => {
		if (result) {
			let params = result.params;
		  if (result.error) {
			helpers.jarvisAlert({
			  type: "danger",
			  message: result.params.error_description || "Something went wrong.."
			});
			return;
		  }
		  if (result.type && result.type == "dismiss") {
			helpers.jarvisAlert({
			  type: "danger",
			  message: "Your login attempt was dismissed."
			});
			return;
		  }
		  if(params.code){
			//Exchange the authorization code for access and id tokens
		
			//Send POST request
           
			 oauthPayload = {
               grant_type: "authorization_code",
			   client_id: Auth0_ClientID,
			   redirect_uri: redirectUri,
			   code: params.code,
			   code_verifier: request.codeVerifier
			};

			
			//create request
			let url = `${Auth0_Domain}/oauth/token`, dest = "";
				   
			const req = new Request(url,{
				method: 'POST', 
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				body: helpers._urlEncode(oauthPayload)
			});
			
			//fetch request
			fetch(req)
			   .then(response => {

				     if(response.status === 200){
					   return response.json();
				   }
				   else{
					   return {status: "error", message: "Technical error"};
				   }
				   
			   })
				.catch(error => {
					console.log("Failed first to fetch token: ",error);	
			   })
			   .then(dt => {	
				console.log("dt: ",dt);			  
                   if(dt.hasOwnProperty('status') && dt.status == "error"){
					helpers.jarvisAlert({
						type: "danger",
						message: `There was an issue with verifying your identity, please try again.`
					  });
				   }
				   else{
					   try{
				       // Refetch the access token before it expires
					   setTimeout(async () => {
							     oauthPayload.refresh_token = dt.refresh_token;
							     oauthPayload.grant_type = "refresh_token";
							     const req2 = new Request(url,{
							     	method: 'POST', 
								    headers: {
									   'Content-Type': 'application/x-www-form-urlencoded',
								    },
								    body: helpers._urlEncode(oauthPayload)
							       });
							     let response2 = await fetch(req2);
	                             let dt3 = await response2.json();
								 console.log("dt3: ",dt3);

							 //Get the user info
							 let url3 = `${Auth0_Domain}/userinfo`;
							 const response3 = await fetch(url3, {
                                   headers: { Authorization: `Bearer ${dt3.access_token}` },
                                });
								let userInfo = await response3.json();
								
                              //Save user info, access token, refresh token and update user context
							  helpers.save('pa_atk',dt3.access_token);
							  helpers.save('pa_rtk',dt3.refresh_token);
							  helpers.save('pa_u',JSON.stringify(userInfo));

		                      _updateUser({
					              u: userInfo,
					              atk: dt3.access_token,
					              rtk: dt.refresh_token
				              });

					        },requestNewAccessTokenBuffer);
					   }
					   catch(error){
						   console.log("error in try block: ",error);
					   }
					}
				
			   }).catch(error => {
					console.log("Failed to fetch tokens: ",error);
			   });
		  }
	    }
	  }, [result]);

    

	return (
	   <View style={styles.container}>
		   <Animated.View
             style={{opacity: fadeAnim}}
           >
		      <View style={styles.loginLogo}>
		        <MaterialCommunityIcons name="alert" color="#FFA500" size={200} />
		      </View>
           </Animated.View>
		   <View>
		      <Text style={styles.loginText}>You need to login to continue to Jarvis. Click the button below when you're ready!</Text>
		   </View>
	     
		   <JarvisButton
		        style={styles.loginButton}
                bgcolor={buttonBackground}
                 play={_initLogin}
                 btn="Login with Auth0"
            />
	   </View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
	paddingLeft: 5,
    //justifyContent: 'center',
  },
  validation: {
    fontSize: 16,
	fontWeight: "bold",
	color: "red"
  },
  loginLogo: {
	marginTop: 30,
	marginLeft: Dimensions.get('window').width / 6
  },
  loginText: {
	  marginTop: 30,
      fontSize: 16,
	  fontWeight: "bold",
	 // padding: 10
  },
  loginButton: {
	 alignItems: 'center',
	 marginTop: 50
             
  },
  loginButtonText: {		
  },
});

export default LoginScreen;
