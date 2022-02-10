import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as helpers from '../Helpers';
import UserContext from '../contexts/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import JarvisButton from '../components/JarvisButton';
import { RadioButton } from 'react-native-paper';

function KYCRetireLondonScreen({navigation}){

   
    const ctx = useContext(UserContext);
    const [buttonBackground,setButtonBackground] = useState("#77f");
    const [retireLondon,setRetireLondon] = useState("yes");

	let navv = navigation;



    const _next = () => {
       let go = false;
       console.log(retireLondon);

      
        helpers.save("j_kyc_retire_london",retireLondon);
        navigation.navigate('KYCComplete');
        
    }


    return (
        <View style={styles.container}>
             <View style={styles.centerView}>
                 <Text style={[styles.loginText,{ fontSize: 20}]}>Step 1 of 3</Text>
             </View>
             <View style={styles.centerView}>
                 <Text style={[styles.loginText,{ fontSize: 15}]}>Personal Information</Text>
             </View>
            <View style={[styles.centerView,{marginTop: 70}]}>
              <Text style={styles.subHeader}>Do you plan to retire in London?</Text>           
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
                  status={ retireLondon === 'yes' ? 'checked' : 'unchecked' }
                  onPress={() => setRetireLondon('yes')}
                />
                <Text style={[styles.radioText,{marginLeft: 20}]}>No</Text>
                <RadioButton
                  value="no"
                  status={ retireLondon === 'no' ? 'checked' : 'unchecked' }
                  onPress={() => setRetireLondon('no')}
                />
                </View>
               </View>
        
            
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

export default KYCRetireLondonScreen;

