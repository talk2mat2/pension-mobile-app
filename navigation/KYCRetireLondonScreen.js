import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, Text, ImageBackground, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';
import JarvisButton from '../components/JarvisButton';
import JarvisLoading from '../components/JarvisLoading';
import { RadioButton, ProgressBar } from 'react-native-paper';

function KYCRetireLondonScreen({navigation}){

   
    const ctx = useContext(UserContext);
    let u = ctx.u;
    console.log("u in retire london: ",u);
    const [buttonBackground,setButtonBackground] = useState("#77f");
    const [retireLondon,setRetireLondon] = useState("yes");
    const [isLoading, setIsLoading] = useState(false);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

    const _next = () => {
       let go = false;
       console.log(retireLondon);
       setIsLoading(true);
       setNextButtonDisabled(true);


        /*
            //Save data to backend
            let url3 = `${helpers.API2}/users/me`;
							 
							console.log(ctx.atk);

							 let userInfo = await axios({
								method: "patch",
								url: url3,
								headers: {
									Authorization: `Bearer ${ctx.atk}`,
								  },
                data: {
                  type: "user",
                  firstName: u.attributes.fname,
                  lastName: u.attributes.lname,
                  name: `${u.attributes.fname} ${u.attributes.lname}`,
                  title: u.attributes.title,
                  gender: u.attributes.gender
                }
							  });
                             
							
							 if(userInfo.status == "200"){
								 let uidt = userInfo.data;
								console.log("userInfo update: ",uidt);
               }
               */
            //Done, navigate to the next screen
            setTimeout(() => {
              setIsLoading(false);
              setNextButtonDisabled(false);
              navigation.navigate('KYCComplete');
            },2000);
        
    }

    const _goBack = () => {
      navigation.goBack();
    }

    return (
      <View style={{flex: 1,  marginTop: 30,paddingTop: 10}}>
       <ImageBackground source={require('../assets/london.jpg')} resizeMode="cover" style={styles.imageBackground}>
       <View style={{alignContent:"flex-start", flexDirection: "row"}}>
         <View style={{marginLeft: 10,marginTop: 10}}>
           <Pressable
            onPress={_goBack}
           >
             <MaterialCommunityIcons name="chevron-left-circle-outline" color="#fff" size={40}/>
           </Pressable>
         </View>
         <View style={{marginLeft: 60, marginTop: 20}}>
            <View>
              <Text style={[styles.loginText,styles.textWhite,{ fontSize: 20}]}>Step 1 of 3</Text>
            </View>
            <View>
             <Text style={[styles.loginText,styles.textWhite,{ fontSize: 15}]}>Personal Information</Text>
            </View>
          </View>
       </View>
        <View style={styles.container}>

            <View style={[styles.centerView,{marginTop: 70}]}>
              <Text style={[styles.subHeader,styles.textWhite]}>Do you plan to retire in London?</Text>           
            </View>
            <View style={[styles.centerView,{marginTop: 10,marginBottom: 30, padding: 10, borderRadius: 20, backgroundColor:"#555"}]}>
            <MaterialCommunityIcons name="information" color="#fff" size={18} />
              <Text style={[styles.subHeader,styles.textWhite,{fontSize: 16, color: "#fff"}]}>Why are we asking you this?</Text>           
            </View>
 
               <View style={styles.borderBox}>
                <View style={styles.centerView}>
                  <Text style={[styles.radioText,styles.textWhite]}>Yes</Text>
                <RadioButton
                  value="yes"
                  status={ retireLondon === 'yes' ? 'checked' : 'unchecked' }
                  onPress={() => setRetireLondon('yes')}
                />
                <Text style={[styles.radioText,styles.textWhite,{marginLeft: 20}]}>No</Text>
                <RadioButton
                  value="no"
                  status={ retireLondon === 'no' ? 'checked' : 'unchecked' }
                  onPress={() => setRetireLondon('no')}
                />
                </View>
               </View>
        
            

            <View style={{width: "100%",marginTop: 100}}>
            { isLoading && (<JarvisLoading color="#fff" text="Please wait"/>)}
              <View style={[styles.centerView]}>
		         <JarvisButton
		           style={[styles.loginButton,{marginTop: 10}]}
                   bgcolor={buttonBackground}
                   play={_next}
                   btn="Next"
                   disabled={nextButtonDisabled}
                />
			       </View>
              <View style={{marginTop: 80,width: "80%", alignSelf: "center"}}>
                <ProgressBar progress={0.2} color="#fff"/>
                <Text style={{textAlign: "center", color: "#fff", fontSize: 20}}>5/5</Text>
              </View>
            </View>
     </View>
     </ImageBackground>
     </View>
     );
  
}


const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    centerView: {
        flexDirection: "row", 
        alignSelf: "center"
      },
    loginButton: {
      // alignItems: 'center',
       marginTop: 50,
       marginLeft: 20
               
    },
    subHeader: {	
       fontSize: 20,
       alignSelf:"center"
    },
    radioText: {
        paddingVertical: 8,
        fontWeight: "bold",
        fontSize: 16
    },
    borderBox: {
      marginTop: 20,
      width: "100%",
      borderBottomWidth: 1,
      borderTopWidth: 1,
      paddingVertical: 5,
      borderColor: "#fff"
    },
    imageBackground:{
      flex: 1
    },
    formGroup: {
      width: "90%",
      textAlign: "center",
      marginTop: 20,
      borderRadius: 5
    },
    inlineFormGroup: {
      width: "50%",
      textAlign: "center",
      marginTop: 20,
      borderWidth: 1,
      borderColor: "#fff",
      borderRadius: 5
    },
    formInput: {
       padding: 5
    },
    formText: {
      marginTop: 10,
      marginRight: 5
    },
    textWhite: {
      color: "#fff"
    },
    inlineForm: {
      flexDirection: "row"
    },
    inlineFormText: {
      marginTop: 10,
      marginRight: 5,
      alignSelf: "center"
    },
    inputError: {
        color: "red",
        fontWeight: "bold"
    },
    hrView: {
      borderBottomWidth: 1, 
      paddingBottom: 15,
       width: "100%"
    }
  });

export default KYCRetireLondonScreen;

