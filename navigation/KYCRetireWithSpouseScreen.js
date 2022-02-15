import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, Text, TextInput, Pressable, ImageBackground,ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import JarvisButton from '../components/JarvisButton';
import { RadioButton } from 'react-native-paper';

function KYCRetireWithSpouseScreen({navigation}){

   
    const ctx = useContext(UserContext);
    let u = ctx.u;

    const [buttonBackground,setButtonBackground] = useState("#77f");
    const [retireWithSpouse,setRetireWithSpouse] = useState("yes");
    const [spouseRetirementAgeValidation,setSpouseRetirementAgeValidation] = useState(false);
    const [spouseName,setSpouseName] = useState("");
    const [spouseRetirementAge, setSpouseRetirementAge] = useState("");
    const [birthday,setBirthday] = useState(new Date());
    const [showDatePicker,setShowDatePicker] = useState(false);
    const [birthdayDisplay,setBirthdayDisplay] = useState((new Date()).toDateString());
    const [spouseNameValidation, setSpouseNameValidation] = useState(false);
    const [retireWithSpouseValidation, setRetireWithSpouseValidation] = useState(false);


     const updateBirthday = (d) => {
        let tempd = new Date(d);
        setBirthday(tempd);
        setBirthdayDisplay(tempd.toDateString());
     setShowDatePicker(false);
     }

    const _updateUser = async () => {
      u.included[0].spouseName = spouseName;
      let bd = birthday.toISOString().split('T');
      u.included[0].spouseDateOfBirth = bd[0];
      u.included[0].spouseGender = u.attributes.gender == "Male" ? "Female" : "Male";
      u.included[0].spouseRetirementAge = spouseRetirementAge;
      let retirementDay =  new Date(), retirementDayArray = u.included[0].spouseDateOfBirth.split("-");
      retirementDay.setFullYear(parseInt(retirementDayArray[0]) + parseInt(spouseRetirementAge));
      u.included[0].spouseRetirementDate = `${retirementDay.getFullYear()}-${retirementDay.getMonth()}-${retirementDay.getDate()}`;

      if(retireWithSpouse == "yes"){
        u.included[0].maritalStatus = "married";
        u.included[0].isSingle = false;
      }
      ctx.setU(u);
      helpers.save('pa_u',JSON.stringify(u));
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
          _updateUser();
            navigation.navigate('KYCRetireLondon');
        }
        
    }

    const _goBack = () => {
      navigation.goBack();
    }

    return (
      <View style={{flex: 1,  marginTop: 30,paddingTop: 10}}>
       <ImageBackground source={require('../assets/retire.jpg')} resizeMode="cover" style={styles.imageBackground}>
         <ScrollView>
        <View style={{marginLeft: 5,marginTop: 5,alignContent:"flex-start"}}>
      <View>
        <Pressable
         onPress={_goBack}
        >
        <MaterialCommunityIcons name="chevron-left-circle-outline" color="#fff" size={26} />
        </Pressable>
      </View>
       </View>
        <View style={styles.container}>
             <View style={styles.centerView}>
                 <Text style={[styles.loginText,styles.textWhite,{ fontSize: 20}]}>Step 1 of 3</Text>
             </View>
             <View style={styles.centerView}>
                 <Text style={[styles.loginText,styles.textWhite,{ fontSize: 15}]}>Personal Information</Text>
             </View>
            <View style={[styles.centerView,{marginTop: 50}]}>
              <Text style={[styles.subHeader,styles.textWhite]}>Do you plan retiring with your spouse?</Text>           
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
                  status={ retireWithSpouse === 'yes' ? 'checked' : 'unchecked' }
                  onPress={() => setRetireWithSpouse('yes')}
                />
                <Text style={[styles.radioText,styles.textWhite,{marginLeft: 20}]}>No</Text>
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
                   <Text style={[styles.inlineFormText,styles.textWhite,{marginLeft: 5}]}>Enter spouse's name</Text>
                   <View style={styles.inlineFormGroup}>
                       <View style={styles.centerView,{paddingVertical: 5}}>
                           <TextInput 
                               style={[styles.formInput,styles.textWhite,{textAlign: "center"}]}
                               onChangeText={text => {
                                 setSpouseName(text);
                                 setSpouseNameValidation(false);
                               }}
                               placeholder="Spouse's name"
                               placeholderTextColor="#fff"
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
                 
                   <Text style={[styles.formText,styles.textWhite,{marginLeft: 5}]}>Enter spouse's date of birth</Text>
                   <View style={[styles.formGroup,{marginLeft: 5}]}>
                       <View style={{flexDirection: "row", paddingVertical: 5}}>
                          <Text style={[styles.formText,styles.textWhite]}>{birthdayDisplay}</Text>
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
                        updateBirthday(d); 
                      }
                      
                  }}
                />
                 )}
                 </View>
                 <View style={[styles.inlineForm,styles.hrView,{marginLeft: 5}]}>
                   <Text style={[styles.inlineFormText,styles.textWhite]}>Spouse's retirement age</Text>
                   <View style={styles.inlineFormGroup}>
                       <View style={styles.centerView,{paddingVertical: 5}}>
                          <TextInput 
                           keyboardType="number-pad"
                           style={[styles.formInput,styles.textWhite,{textAlign: "center"}]}
                           onChangeText={text => {
                             setSpouseRetirementAge(text);
                             if(parseInt(text) > 1) setSpouseRetirementAgeValidation(false);
                           }}
                       placeholder="Enter retirement age"
                       placeholderTextColor="#fff"
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
        </ScrollView>
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
    imageBackground:{
      flex: 1
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
    textWhite: {
      color: "#fff"
    },
    inlineForm: {
      flexDirection: "row"
    },
    inlineFormText: {
      marginTop: 20,
      marginRight: 5,
      alignSelf: "center",
      
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

