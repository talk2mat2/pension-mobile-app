import React, { useState, useEffect, useContext } from 'react';
import { Platform, Pressable, StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from "jwt-decode";
import * as Random from 'expo-random';
import {Buffer} from 'buffer';
import * as crypto from 'expo-crypto';
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';
import { setNotificationCategoryAsync } from 'expo-notifications';


function LoginScreen(){
	const ctx = useContext(UserContext);
    const [buttonBackground,setButtonBackground] = useState("#77f");
	const [buttonTextColor,setButtonTextColor] = useState("#fff");
	const [tryLogin,setTryLogin] = useState(true);
	const [code_challenge,setCodeChallenge] = useState(null);
	const [verifier,setVerifier] = useState(null);
	const [encryptedVerifier,setEncryptedVerifier] = useState(null);
	const [hasCode,setHasCode] = useState(false);
	const [discovery,setDiscovery] = useState(null);

    const _updateUser = (dt) => {
		helpers.save('pa_u',dt.em);
		         ctx.setTk(dt.tk);
		         ctx.setU(dt.em);
		         ctx.setName(dt.name);
		         ctx.setLoggedIn(true);
	}

	async function sha(buffer){
		let ret = await crypto.digestStringAsync(
			crypto.CryptoDigestAlgorithm.SHA256,
			buffer,
			{encoding: crypto.CryptoEncoding.BASE64}
		  );
		  return ret;
	  }

	function URLEncode(str){
		return str.toString('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=/g, '');
	  }
    
	async function getPKCE(){
       //Get PKCE codes from external Nodejs server
	   let pkceEndpoint = "https://floating-ocean-67333.herokuapp.com/pkce";
	   const req = new Request(pkceEndpoint,{
		method: 'GET'
	});
	
	const response = await fetch(req);
	let res = await response.json();
	return res;

	/**
	//fetch request
	fetch(req)
	   .then(response => {
		return response.json(); 
	   })
		.catch(error => {
			console.log("Failed first to fetch PKCE codes: ",error);	
	   })
	   .then(res => {
		   console.log('res: ',res);
      return res;
	   })
	   .catch(error => {
		console.log("Failed to fetch PKCE codes: ", error);	
       });
	**/
	}


	 //Main config
    const Auth0_Domain = "https://pensionjar-staging.eu.auth0.com";
    const Auth0_ClientID = "PAQK5rFTPu2jdg2rSM4I0Nwjcwk8XWkI";
	const Auth0_ClientSecret = "_-NCxLhpJlg5q8J6K2LYKyi_1CNu8uwbrU-X0s3IkxiLj3jhCjF37FdquZK78gUM";
	const authorizationEndpoint = `${Auth0_Domain}/authorize`;
	const oauthEndpoint = `${Auth0_Domain}/oauth/token`;

    const useProxy = Platform.select({ web: false, default: true });
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
	let disc = null, authPayload = null;
    
	useEffect(async () => {
	  if(!hasCode){
		setHasCode(true);
	    let dt = await getPKCE();
	    console.log("redirectUri:",redirectUri);
	    setCodeChallenge(dt.code_challenge);
	    setVerifier(dt.verifier);
		setEncryptedVerifier(dt.encryptedVerifier);
		setHasCode(true);
		disc = await AuthSession.fetchDiscoveryAsync(Auth0_Domain);
		setDiscovery(disc);
	  }
	});
	
	authPayload = {
		redirectUri: redirectUri,
		usePKCE: true,
		clientId: Auth0_ClientID,
		//clientSecret: Auth0_ClientSecret,
		//codeChallenge: code_challenge,
		//codeChallengeMethod: ".S256",
		// id_token will return a JWT token
		responseType: AuthSession.ResponseType.Code,
		// retrieve the user's profile
		scopes: ["openid", "profile", "email", "offline_access"],
		extraParams: {
		  // ideally, this will be a random value
		  nonce: "nonce",
		  access_type: "offline",
		  audience: `${Auth0_Domain}/api/v2/`
		}
	  }
	 
	// setRequest(r1); setResult(r2), setPromptAsync(pa);
	
	const [request, result, promptAsync] = AuthSession.useAuthRequest(
		authPayload,
		{ authorizationEndpoint }
	  );

	// Retrieve the redirect URL, add this to the callback URL list
	  // of your Auth0 application.
	  //console.log(`Redirect URL: ${redirectUri}`);
	  

	  useEffect(async () => {
		console.log("authPayload: ",authPayload);
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
		  if (result.type && result.type == "dismiss") {
			helpers.jarvisAlert({
			  type: "danger",
			  message: "Your login attempt was dismissed."
			});
			return;
		  }
		  if(params.code){
			//Exchange the authorization code for access and id tokens
			//console.log("discovery: ",discovery);
			let oauthPayload = {
				redirectUri: redirectUri,
				clientId: Auth0_ClientID,
				code: params.code,
				extraParams: { 
					code_verifier: verifier || ""
				}
				
			};
			console.log("oauthPayload: ",oauthPayload);
			let oauthRequest = await AuthSession.exchangeCodeAsync(oauthPayload,discovery);
			console.log("oauthRequest: ",oauthRequest);

			//Send POST request
            /**
			let fd = `grant_type=authorization_code&client_id=${Auth0_ClientID}&code_verifier=${v}&code=${params.code}&redirect_uri=${redirectUri}`;
			
			//create request
			let url = "https://pensionjar-development.eu.auth0.com/oauth/token", dest = "";
				   
			const req = new Request(url,{
				method: 'POST', 
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				body: new URLSearchParams(fd)
			});
			
			//fetch request
			fetch(req)
			   .then(response => {
				return response.json();
				 
				     if(response.status === 200){
					   return response.json();
				   }
				   else{
					   return {status: "error", message: "Technical error"};
				   }
				   
				   
			   })
				.catch(error => {
					alert("Failed first to send new message: " + error);	
			   })
			   .then(res => {
				   console.log('res: ',res);
				   helpers.jarvisAlert({
					type: "info",
					message: `The result of /oauth/token API call: ${JSON.stringify(res)}`
				  });
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
				
								
			   }).catch(error => {
					alert("Failed to send new message: " + error);
			   });
			   **/
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
			  promptAsync({ useProxy: true });
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
