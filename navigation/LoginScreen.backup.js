import React, { useState, useEffect, useContext } from 'react';
import { Platform, Pressable, StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from "jwt-decode";
import * as Random from 'expo-random';
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';


function LoginScreen(){
	const ctx = useContext(UserContext);
    const [buttonBackground,setButtonBackground] = useState("#77f");
	const [buttonTextColor,setButtonTextColor] = useState("#fff");

    const _updateUser = (dt) => {
		helpers.save('pa_u',dt.em);
		         ctx.setTk(dt.tk);
		         ctx.setU(dt.em);
		         ctx.setName(dt.name);
		         ctx.setLoggedIn(true);
	}

	/**
	 Test config
    const Auth0_Domain = "https://dev-phszir2j.us.auth0.com";
    const Auth0_ClientID = "wxFJ14uFwhvQg2dHZWPDJfIAyC5A7wXG";
	const authorizationEndpoint = "https://dev-phszir2j.us.auth0.com/authorize";
	**/

	 //Main config
    const Auth0_Domain = "https://pensionjar-development.eu.auth0.com";
    const Auth0_ClientID = "LFi1MZQxXQW4Y1vMhEOXN7Sy11naYTcF";
	const authorizationEndpoint = "https://pensionjar-development.eu.auth0.com/authorize"

    const useProxy = Platform.select({ web: false, default: true });
    const redirectUri = AuthSession.makeRedirectUri({ useProxy });

	//PKCE Authorization flow

	//Create verifier
	let verifier = helpers.base64URLEncode(Random.getRandomBytes(32));
    //Create code challenge
	let code_challenge = helpers.sha(verifier);

	const [request, result, promptAsync] = AuthSession.useAuthRequest(
		{
		  redirectUri,
		  clientId: Auth0_ClientID,
		  codeChallenge: code_challenge,
          codeChallengeMethod: "S256",
		  // id_token will return a JWT token
		  responseType: "code",
		  // retrieve the user's profile
		  scopes: ["openid", "profile"],
		  extraParams: {
			// ideally, this will be a random value
			nonce: "nonce",
		  },
		},
		{ authorizationEndpoint }
	  );
	
	  // Retrieve the redirect URL, add this to the callback URL list
	  // of your Auth0 application.
	  //console.log(`Redirect URL: ${redirectUri}`);

	  useEffect(() => {
		console.log("result",result);
		if (result) {
		  if (result.error) {
			helpers.jarvisAlert({
			  type: "danger",
			  message: result.params.error_description || "Something went wrong.."
			});
			return;
		  }
		  if(result.type){
			switch(result.type){
			    case "dismiss":
				  helpers.jarvisAlert({
					message: "Login attempt dismissed",
					type: "info",
				  });
				break;

				case "success":
                  // Retrieve the JWT token and decode it
				  /**
				   * An example (social)
				   * decoded:  Object {
  "aud": "wxFJ14uFwhvQg2dHZWPDJfIAyC5A7wXG",
  "exp": 1641507709,
  "family_name": "Kudayisi",
  "given_name": "Tobi",
  "iat": 1641471709,
  "iss": "https://dev-phszir2j.us.auth0.com/",
  "locale": "en",
  "name": "Tobi Kudayisi",
  "nickname": "kudayisitobi",
  "nonce": "nonce",
  "picture": "https://lh3.googleusercontent.com/a/AATXAJwWJndrzmWLbbcSbMaFAAD07UUGkHihOUyQIKGP=s96-c",
  "sub": "google-oauth2|117923176164825259890",
  "updated_at": "2022-01-06T12:20:07.094Z",
}

*Another example (email)
decoded:  Object {
  "aud": "LFi1MZQxXQW4Y1vMhEOXN7Sy11naYTcF",
  "exp": 1641515647,
  "iat": 1641479647,
  "iss": "https://pensionjar-development.eu.auth0.com/",
  "name": "test@yahoo.com",
  "nickname": "test",
  "nonce": "nonce",
  "picture": "https://s.gravatar.com/avatar/88e478531ab3bc303f1b5da82c2e9bbb?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
  "sub": "auth0|61d6fa7a8959640073099134",
  "updated_at": "2022-01-06T14:19:40.349Z",
}
				   **/
			      //const jwtToken = result.params.id_token;
			      //const decoded = jwtDecode(jwtToken);
	             console.log("decoded: ",decoded);
				 helpers.save('pa_tk',decoded.sub);

				 //get the email from the sub
				 let em = "", n = "", authType = decoded.sub.split('|');
                 if(authType == "auth0"){
					 em = decoded.name;
                     n = decoded.nickname;
				 }
				 else if(authType == "google-oauth2"){
					em = `${decoded.nickname}@gmail.com`;
					n = decoded.name;
				}
		         _updateUser({
					 tk: decoded.sub,
					 em: em,
					 name: n
				 });
			      //const { name } = decoded;
			      //setName(name);
				break;
			   }
		   }
	    }
	  }, [result]);

    

	return (
	   <View style={styles.container}>
		   <View style={styles.loginLogo}>
		     <MaterialCommunityIcons name="login" color="#77f" size={200} />
		   </View>

		   <View>
		      <Text style={styles.loginText}>You need to login to continue to Jarvis. Click the button below when you're ready!</Text>
		   </View>
	     
		 
		   <Pressable
			  onPress={() => {
              /** Do Something **/
			  console.log("moving..");
			  setButtonBackground("#fff");
			  setButtonTextColor("#77f");
			  setTimeout(() => {
				setButtonBackground("#77f");
				setButtonTextColor("#fff");
			  },700);
			  promptAsync({ useProxy });
             }}
           >
		     <View style={[styles.loginButton,{backgroundColor: buttonBackground}]}>
				 <Text style={[styles.loginButtonText,{color: buttonTextColor}]}>Login with Auth0</Text>
			 </View>
           </Pressable>
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
	 marginTop: 50,
	 padding: 20,
	 color: "#fff",
     width: Dimensions.get('window').width-20
             
  },
  loginButtonText: {		
  },
});

export default LoginScreen;
