import React, { useState, useEffect, useContext } from 'react';
import { Platform, Pressable, StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from "jwt-decode";
import * as Random from 'expo-random';
import {Buffer} from 'buffer';
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
	const authorizationEndpoint = "https://pensionjar-development.eu.auth0.com/authorize";
	const oauthEndpoint = "https://pensionjar-development.eu.auth0.com/oauth/token";

    const useProxy = Platform.select({ web: false, default: true });
    const redirectUri = AuthSession.makeRedirectUri({ useProxy });

	//PKCE Authorization flow

	//Create verifier
	let rb = Random.getRandomBytes(32);
	let base64String = Buffer.from(rb).toString('base64');
	let verifier = helpers.base64URLEncode(base64String);

    //Create code challenge
	let cc = helpers.sha(verifier);
	let code_challenge = helpers.base64URLEncode(cc);

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
		  audience: "https://pensionjar-development.eu.auth0.com/api/v2/"
		},
		{ authorizationEndpoint }
	  );
	
	  // Retrieve the redirect URL, add this to the callback URL list
	  // of your Auth0 application.
	  //console.log(`Redirect URL: ${redirectUri}`);

	  useEffect(() => {
		console.log("result",result);
		if (result) {
			let params = result.params;
		  if (result.error) {
			helpers.jarvisAlert({
			  type: "danger",
			  message: result.params.error_description || "Something went wrong.."
			});
			return;
		  }
		  if(params.code){
			//Exchange the authorization code for access and id tokens
			//Send POST request

			let fd = new FormData();
			fd.append("grant_type","authorization_code");
			fd.append("client_id",Auth0_ClientID);
			fd.append("code_verifier",verifier);
			fd.append("code",params.code);
			fd.append("redirect_uri",redirectUri);
			
			//create request
			let url = oauthEndpoint, dest = "";
				   
			const req = new Request(url,{
				method: 'POST', 
				headers: {
					//'Content-Type': 'application/json'
					// 'Content-Type': 'application/x-www-form-urlencoded',
				  },
				body: fd
			});
			
			//fetch request
			fetch(req)
			   .then(response => {
				   /**
				   if(response.status === 200){
					   return response.json();
				   }
				   else{
					   return {status: "error", message: "Technical error"};
				   }
				   **/
				  return response.json();
			   })
				.catch(error => {
					alert("Failed first to send new message: " + error);	
			   })
			   .then(res => {
				   console.log('res: ',res);
				   /**
					// hideElem(['#rp-loading','#rp-submit']); 
				   
				   if(res.status == "ok"){
					  let nm = "Message sent!", ntt = "success";
					 showMessage({
					   message: nm,
					   type: ntt,
					 });
					  dest = "Inbox";	  
					   resetEmailStorage();
						RootNavigation.navigate(dest);	  
				   }
				   else if(res.status == "error"){
					   console.log(res.message);
					 if(res.message == "validation" || res.message == "dt-validation"){
						 alert(`Please enter all required fields.`);
					 }
					 else{
					   alert("Got an error while sending new message: " + res.message);			
					 }					 
				   }
				 **/
								
			   }).catch(error => {
					alert("Failed to send new message: " + error);
			   });
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
				 **/
				
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
