import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';

import JarvisButton from '../components/JarvisButton';

function KYCRetirementAgeScreen({navigation}){

   
    const ctx = useContext(UserContext);
    const [buttonBackground,setButtonBackground] = useState("#77f");
    const [retirementAge,setRetirementAge] = useState("");
    const [retirementAgeValidation,setRetirementAgeValidation] = useState(false);

	let navv = navigation;

     const updateBirthday = (d) => {
        let tempd = new Date(d);
        setBirthday(tempd);
        setBirthdayDisplay(tempd.toDateString());
      setBirthdayValidation(false);
      setShowDatePicker(false);
     }


    const _next = () => {
        if(retirementAge.length < 1 || parseInt(retirementAge) < 1){
           setRetirementAgeValidation(true);
        }
        else{
            helpers.save("j_kyc_retirement_age",retirementAge);
            navigation.navigate('KYCRetireWithSpouse');
        }
        
    }


    return (
        <View style={styles.container}>
             <View style={styles.centerView}>
                 <Text style={[styles.loginText,{ fontSize: 20}]}>Step 1 of 3</Text>
             </View>
             <View style={styles.centerView}>
                 <Text style={[styles.loginText,{ fontSize: 15}]}>Personal Information</Text>
             </View>
            <View style={[styles.centerView,{marginTop: 100}]}>
              <Text style={styles.subHeader}>At what age would you like to retire?</Text>           
            </View>
            <View style={[styles.centerView,{marginTop: 10,marginBottom: 30}]}>
            <MaterialCommunityIcons name="information" color="#888" size={18} />
              <Text style={[styles.subHeader,{fontSize: 16, color: "#888"}]}>Why are we asking you this?</Text>           
            </View>
 
          
            <View style={styles.formGroup}>
                <View style={styles.centerView,{paddingVertical: 15}}>
                    <TextInput 
                       keyboardType="number-pad"
                       style={[styles.formInput,{textAlign: "center"}]}
                       onChangeText={text => {
                           setRetirementAge(text);
                           if(parseInt(text) > 1) setRetirementAgeValidation(false);
                       }}
                       placeholder="Enter retirement age"
                       value={retirementAge}
                    />
                </View>
            </View>
            {
             retirementAgeValidation && (
            <View style={styles.formGroupError}>
                    <Text style={styles.inputError}>Please input your desired retirement age</Text>
            </View>
             )}

            
            <View style={{width: "100%",marginTop: 100}}>
           <View style={styles.centerView}>
		   <JarvisButton
		        style={[styles.loginButton,{marginTop: 10}]}
                bgcolor={buttonBackground}
                 play={_next}
                 btn="Next"
            />
			</View>
            </View>
        </View>
     );
  
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop: 30,
      //justifyContent: 'center',
    },
    centerView: {
        flexDirection: "row", 
        alignSelf: "center"
      },
    loginButton: {
       alignItems: 'center',
       marginTop: 50,
       marginLeft: 20
               
    },
    subHeader: {	
       fontSize: 20,
       alignSelf:"center"
    },
    formGroup: {
      width: "90%",
      textAlign: "center",
      marginTop: 20,
      borderWidth: 1,
      borderColor: "#bbb",
      borderRadius: 5
    },

    formGroupError: {
        marginTop: 5
    },
    formInput: {
       padding: 5
    },

    inputError: {
        color: "red",
        fontWeight: "bold"
    }
  });

export default KYCRetirementAgeScreen;

