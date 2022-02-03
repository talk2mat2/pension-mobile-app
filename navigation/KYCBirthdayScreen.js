import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';

import JarvisButton from '../components/JarvisButton';

function KYCBirthdayScreen({route,navigation}){

   
    const ctx = useContext(UserContext);
    const [buttonBackground,setButtonBackground] = useState("#77f");
    const [birthday,setBirthday] = useState(new Date());
    const [birthdayObject,setBirthdayObject] = useState("{}");
    const [birthdayValidation,setBirthdayValidation] = useState(false);
    const [showDatePicker,setShowDatePicker] = useState(false);
    const [birthdayDisplay,setBirthdayDisplay] = useState((new Date()).toDateString());

	let navv = navigation;
    let {fname,lname} = route.params;

     const updateBirthday = (d) => {
         let tempd = new Date(d);
        setBirthday(tempd);
        setBirthdayDisplay(tempd.toDateString());
      setBirthdayValidation(false);
      setBirthdayObject(JSON.stringify(tempd));
      setShowDatePicker(false);
     }


    const _next = () => {
        if(typeof birthday == "undefined" || !birthday){
           setBirthdayValidation(true);
        }
        else{
            helpers.save("j_kyc_birthday",birthdayObject);
            navigation.navigate('KYCRetirementAge');
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
              <Text style={styles.subHeader}>Thanks {fname}, please can you tell us your date of birth?</Text>           
            </View>
 
          
            <View style={styles.formGroup}>
                <View style={styles.centerView, {paddingVertical: 5,marginTop: 10}}>
                <JarvisButton
		        style={[styles.loginButton,{marginVertical: 10}]}
                bgcolor={buttonBackground}
                 play={() => {setShowDatePicker(true)}}
                 btn={birthdayDisplay}
                />
                {
                 showDatePicker && (
                <DateTimePicker
                  testID="birthdayDateTimePicker"
                  value={birthday}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={(e,d) => {
                      if(typeof d != "undefined"){
                         console.log("d: ",d);
                      updateBirthday(d); 
                      }
                      
                  }}
                />
                 )}
                </View> 
            </View>
            {
             birthdayValidation && (
            <View style={styles.formGroupError}>
                    <Text style={styles.inputError}>This field is required</Text>
            </View>
             )}

            
            <View style={{width: "100%",marginTop: 10}}>
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
      alignItems: 'flex-start',
      paddingLeft: 20,
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
      borderColor: "#bbb",
      borderRadius: 5
    },
    formInput: {
       padding: 5
    },

    inputError: {
        color: "red",
        fontWeight: "bold"
    }
  });

export default KYCBirthdayScreen;

