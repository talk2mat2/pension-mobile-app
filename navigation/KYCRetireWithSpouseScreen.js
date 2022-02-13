import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, Text, TextInput, Pressable} from 'react-native';
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
    const [spouseRetirementAgeValidation,setSpouseRetirementAgeValidation] = useState(false);
    const [spouseName,setSpouseName] = useState("");
    const [spouseRetirementAge, setSpouseRetirementAge] = useState("");
    const [birthday,setBirthday] = useState(new Date());
    const [birthdayObject,setBirthdayObject] = useState("{}");
    const [birthdayValidation,setBirthdayValidation] = useState(false);
    const [showDatePicker,setShowDatePicker] = useState(false);
    const [birthdayDisplay,setBirthdayDisplay] = useState((new Date()).toDateString());
    const [spouseNameValidation, setSpouseNameValidation] = useState(false);
    const [retireWithSpouseValidation, setRetireWithSpouseValidation] = useState(false);

	let navv = navigation;

     const updateBirthday = (d) => {
        let tempd = new Date(d);
        setBirthday(tempd);
        setBirthdayDisplay(tempd.toDateString());
      setBirthdayValidation(false);
      setBirthdayObject(JSON.stringify(tempd));
      setShowDatePicker(false);
     }


    const _next = () => {
       let go = false;

      if(retireWithSpouse == "yes"){
        if(spouseName == "" || (spouseRetirementAge.length < 1 || parseInt(spouseRetirementAge) < 1)){
        if(spouseName == ""){
          setSpouseNameValidation(true);
        }

        if(spouseRetirementAge.length < 1 || parseInt(spouseRetirementAge) < 1){
          setSpouseRetirementAgeValidation(true);
       }
      }
      else{
        go = true;
      }
      }
      else if(retireWithSpouse == "no"){
        go = true;
      }

        if(go){
          helpers.save("j_kyc_retire_with_spouse",retireWithSpouse);
          helpers.save("j_kyc_spouse_name",spouseName);
          helpers.save("j_kyc_spouse_birthday",birthdayObject);
          helpers.save("j_kyc_spouse_retirement_age",spouseRetirementAge);
            navigation.navigate('KYCRetireLondon');
        }
        
    }


    return (
      <View style={{flex: 1, marginTop: 30,paddingTop: 10, backgroundColor: "#fff"}}>
        <View style={{marginLeft: 5,alignContent:"flex-start"}}>
      <View>
        <Pressable
         onPress={_goBack}
        >
        <MaterialCommunityIcons name="chevron-left-circle-outline" color="#666" size={26} />
        </Pressable>
      </View>
       </View>
        <View style={styles.container}>
             <View style={styles.centerView}>
                 <Text style={[styles.loginText,{ fontSize: 20}]}>Step 1 of 3</Text>
             </View>
             <View style={styles.centerView}>
                 <Text style={[styles.loginText,{ fontSize: 15}]}>Personal Information</Text>
             </View>
            <View style={[styles.centerView,{marginTop: 70}]}>
              <Text style={styles.subHeader}>Do you plan retiring with your spouse?</Text>           
            </View>
            <View style={[styles.centerView,{marginTop: 10,marginBottom: 20}]}>
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
             retireWithSpouseValidation && (
            <View style={styles.formGroupError}>
                    <Text style={styles.inputError}>This field is required</Text>
            </View>
             )}

             {
               (retireWithSpouse == "yes") && (
                 <>
                 <View style={[styles.inlineForm,styles.hrView]}>
                   <Text style={[styles.inlineFormText,{marginLeft: 5}]}>Enter spouse's name</Text>
                   <View style={styles.inlineFormGroup}>
                       <View style={styles.centerView,{paddingVertical: 5}}>
                           <TextInput 
                               style={[styles.formInput,{textAlign: "center"}]}
                               onChangeText={text => {
                                 setSpouseName(text);
                                 setSpouseNameValidation(false);
                               }}
                               placeholder="Spouse's name"
                               value={spouseName}                    
                           />
                       </View>
                  </View>
                 </View>
                 {
                    spouseNameValidation && (
                     <View style={styles.formGroupError}>
                        <Text style={styles.inputError}>Please input your spouse's name</Text>
                     </View>
                  )}
                 <View style={[styles.hrView,{alignContent: "space-between"}]}>
                 
                   <Text style={[styles.formText,{marginLeft: 5}]}>Enter spouse's date of birth</Text>
                   <View style={[styles.formGroup,{marginLeft: 5}]}>
                       <View style={{flexDirection: "row", paddingVertical: 5}}>
                          <Text style={styles.formText}>{birthdayDisplay}</Text>
                          <JarvisButton
		                      style={[styles.loginButton]}
                       bgcolor="#ff6c00"
                       play={() => {setShowDatePicker(true)}}
                       btn="Select date"
                       w="40%"
                    />
                       </View>
                  </View>
                  
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
                 <View style={styles.inlineForm}>
                   <Text style={styles.inlineFormText}>Spouse's retirement age</Text>
                   <View style={styles.inlineFormGroup}>
                       <View style={styles.centerView,{paddingVertical: 5}}>
                          <TextInput 
                           keyboardType="number-pad"
                           style={[styles.formInput,{textAlign: "center"}]}
                           onChangeText={text => {
                             setSpouseRetirementAge(text);
                             if(parseInt(text) > 1) setSpouseRetirementAgeValidation(false);
                           }}
                       placeholder="Enter retirement age"
                       value={spouseRetirementAge}
                    />
                       </View>
                  </View>
                 </View>
                 {
                    spouseRetirementAgeValidation && (
                     <View style={styles.formGroupError}>
                        <Text style={styles.inputError}>Please input your spouse's retirement age</Text>
                     </View>
                  )}

                 </>
                 
               )}

            
            <View style={{width: "100%",marginTop: 50}}>
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
      </View>
     );
  
}


const styles = StyleSheet.create({
    container: {
      //flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      //marginTop: 30,
      //justifyContent: 'center',
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
      paddingVertical: 5
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
      borderColor: "#bbb",
      borderRadius: 5
    },
    formInput: {
       padding: 5
    },
    formText: {
      marginTop: 10,
      marginRight: 5
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

export default KYCRetireWithSpouseScreen;

