import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import JarvisButton from '../components/JarvisButton';
import { RadioButton } from 'react-native-paper';

function KYCRetireWithSpouseScreen({navigation}){

   
    const ctx = useContext(UserContext);
    const [buttonBackground,setButtonBackground] = useState("#77f");
    const [retireWithSpouse,setRetireWithSpouse] = useState("yes");
    const [retirementAgeValidation,setRetirementAgeValidation] = useState(false);
    const [birthday,setBirthday] = useState(new Date());
    const [birthdayObject,setBirthdayObject] = useState("{}");
    const [birthdayValidation,setBirthdayValidation] = useState(false);
    const [showDatePicker,setShowDatePicker] = useState(false);
    const [birthdayDisplay,setBirthdayDisplay] = useState((new Date()).toDateString());

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
           //navigation.navigate('KYCRetireWithSpouse');
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
              <Text style={styles.subHeader}>Do you plan retiring with your spouse?</Text>           
            </View>
            <View style={[styles.centerView,{marginTop: 10,marginBottom: 30}]}>
            <MaterialCommunityIcons name="information" color="#888" size={18} />
              <Text style={[styles.subHeader,{fontSize: 16, color: "#888"}]}>Why are we asking you this?</Text>           
            </View>
 
               <View style={styles.borderBox}>
                <View style={styles.centerView}>
                  <Text style={styles.radioText}>Yes</Text>
                <RadioButton
                  value="yes"
                  status={ retireWithSpouse === 'yes' ? 'checked' : 'unchecked' }
                  onPress={() => setRetireWithSpouse('yes')}
                />
                <Text style={[styles.radioText,{marginLeft: 20}]}>No</Text>
                <RadioButton
                  value="no"
                  status={ retireWithSpouse === 'no' ? 'checked' : 'unchecked' }
                  onPress={() => setRetireWithSpouse('no')}
                />
                </View>
                </View>
            {
             retirementAgeValidation && (
            <View style={styles.formGroupError}>
                    <Text style={styles.inputError}>This field is required</Text>
            </View>
             )}

             {
               (retireWithSpouse == "yes") && (
                 <>
                 <View style={styles.inlineForm}>
                   <Text style={styles.inlineFormText}>Enter spouse's name</Text>
                   <View style={styles.inlineFormGroup}>
                       <View style={styles.centerView,{paddingVertical: 5}}>
                           <TextInput 
                               keyboardType="number-pad"
                               style={[styles.formInput,{textAlign: "center"}]}
                               onChangeText={text => {
                                 // setRetirementAge(text);
                                 //if(parseInt(text) > 1) setRetirementAgeValidation(false);
                               }}
                               placeholder="Enter retirement age"                    
                           />
                       </View>
                  </View>
                 </View>
                 <View style={styles.inlineForm}>
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
                   <Text style={styles.inlineFormText}>Enter spouse's name</Text>
                   <View style={styles.inlineFormGroup}>
                       <View style={styles.centerView,{paddingVertical: 5}}>
                          <Text style={styles.bdayText}>{birthdayDisplay}</Text>
                          <JarvisButton
		                      style={[styles.loginButton,{marginVertical: 10}]}
                       bgcolor="#ff6c00"
                       play={() => {setShowDatePicker(true)}}
                       btn="Select date"
                       w="50%"
                    />
                       </View>
                  </View>
                 </View>

                 </>
                 
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
      paddingVertical: 5
    },
    formGroup: {
      width: "90%",
      textAlign: "center",
      marginTop: 20,
      borderWidth: 1,
      borderColor: "#bbb",
      borderRadius: 5
    },
    inlineFormGroup: {
      width: "50%",
      textAlign: "center",
      marginTop: 20,
      borderWidth: 1,
      borderColor: "#bbb",
      borderRadius: 5
    },
    formInput: {
       padding: 5
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
    }
  });

export default KYCRetireWithSpouseScreen;

