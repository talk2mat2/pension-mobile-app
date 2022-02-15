import React, { useState, useEffect, useContext } from 'react';
import {StyleSheet, View, Text, TextInput, Pressable, ImageBackground} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as helpers from '../Helpers';
const axios = require('axios');
import UserContext from '../contexts/UserContext';
import JarvisButton from '../components/JarvisButton';
import JarvisLoading from '../components/JarvisLoading';
import {Picker} from '@react-native-picker/picker';

function KYCRetirementAgeScreen({navigation}){

   
    const ctx = useContext(UserContext);
    let u = ctx.u;
    console.log("u retire age: ",u);

    const [buttonBackground,setButtonBackground] = useState("#77f");
    const [retirementAge,setRetirementAge] = useState("65");
    const [retirementAgeValidation,setRetirementAgeValidation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

	let navv = navigation;

  let ages = []; 
  for(let i = 18; i <= 100; i++) ages.push(i);
 
     const updateBirthday = (d) => {
        let tempd = new Date(d);
        setBirthday(tempd);
        setBirthdayDisplay(tempd.toDateString());
      setBirthdayValidation(false);
      setShowDatePicker(false);
     }


    const _next = async () => {
        if(retirementAge == "none"|| parseInt(retirementAge) < 1){
           setRetirementAgeValidation(true);
        }
        else{
             setIsLoading(true);
            setNextButtonDisabled(true);
            
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
            //Done, navigate to the next screen
            //navigation.navigate('KYCRetireWithSpouse');
        }
        
    }

    const _goBack = () => {
      navigation.goBack();
    }


    return (
      <View style={{flex: 1, marginTop: 30,paddingTop: 10, backgroundColor: "#fff"}}>
       <ImageBackground source={require('../assets/retire.jpg')} resizeMode="cover" style={styles.imageBackground}>
       <View style={{marginLeft: 5, marginTop: 5 ,alignContent:"flex-start"}}>
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
            <View style={[styles.centerView,{marginTop: 60}]}>
              <Text style={[styles.subHeader,styles.textWhite]}>At what age would you like to retire?</Text>           
            </View>
            <View style={[styles.centerView,{marginTop: 10,marginBottom: 30, padding: 10, borderRadius: 20, backgroundColor:"#666"}]}>
            <MaterialCommunityIcons name="information" color="#fff" size={18} />
              <Text style={[styles.subHeader,styles.textWhite,{fontSize: 16, color: "#fff"}]}>Why are we asking you this?</Text>           
            </View>
 
          
            <View style={styles.formGroup}>
                <View style={styles.centerView,{paddingVertical: 2}}>
                    
                    <Picker
                     selectedValue={retirementAge}
                     onValueChange={(itemValue, itemIndex) =>{
                         setRetirementAge(itemValue);
                           if(parseInt(itemValue) > 1) setRetirementAgeValidation(false);
                        }
                      }
                      style={styles.textWhite}
                   >
                    <Picker.Item key="age-none" label="Select your age" value="none" />
                    <Picker.Item key="age-0" label="18" value="18" />
<Picker.Item key="age-1" label="19" value="19" />
<Picker.Item key="age-2" label="20" value="20" />
<Picker.Item key="age-3" label="21" value="21" />
<Picker.Item key="age-4" label="22" value="22" />
<Picker.Item key="age-5" label="23" value="23" />
<Picker.Item key="age-6" label="24" value="24" />
<Picker.Item key="age-7" label="25" value="25" />
<Picker.Item key="age-8" label="26" value="26" />
<Picker.Item key="age-9" label="27" value="27" />
<Picker.Item key="age-10" label="28" value="28" />
<Picker.Item key="age-11" label="29" value="29" />
<Picker.Item key="age-12" label="30" value="30" />
<Picker.Item key="age-13" label="31" value="31" />
<Picker.Item key="age-14" label="32" value="32" />
<Picker.Item key="age-15" label="33" value="33" />
<Picker.Item key="age-16" label="34" value="34" />
<Picker.Item key="age-17" label="35" value="35" />
<Picker.Item key="age-18" label="36" value="36" />
<Picker.Item key="age-19" label="37" value="37" />
<Picker.Item key="age-20" label="38" value="38" />
<Picker.Item key="age-21" label="39" value="39" />
<Picker.Item key="age-22" label="40" value="40" />
<Picker.Item key="age-23" label="41" value="41" />
<Picker.Item key="age-24" label="42" value="42" />
<Picker.Item key="age-25" label="43" value="43" />
<Picker.Item key="age-26" label="44" value="44" />
<Picker.Item key="age-27" label="45" value="45" />
<Picker.Item key="age-28" label="46" value="46" />
<Picker.Item key="age-29" label="47" value="47" />
<Picker.Item key="age-30" label="48" value="48" />
<Picker.Item key="age-31" label="49" value="49" />
<Picker.Item key="age-32" label="50" value="50" />
<Picker.Item key="age-33" label="51" value="51" />
<Picker.Item key="age-34" label="52" value="52" />
<Picker.Item key="age-35" label="53" value="53" />
<Picker.Item key="age-36" label="54" value="54" />
<Picker.Item key="age-37" label="55" value="55" />
<Picker.Item key="age-38" label="56" value="56" />
<Picker.Item key="age-39" label="57" value="57" />
<Picker.Item key="age-40" label="58" value="58" />
<Picker.Item key="age-41" label="59" value="59" />
<Picker.Item key="age-42" label="60" value="60" />
<Picker.Item key="age-43" label="61" value="61" />
<Picker.Item key="age-44" label="62" value="62" />
<Picker.Item key="age-45" label="63" value="63" />
<Picker.Item key="age-46" label="64" value="64" />
<Picker.Item key="age-47" label="65" value="65" />
<Picker.Item key="age-48" label="66" value="66" />
<Picker.Item key="age-49" label="67" value="67" />
<Picker.Item key="age-50" label="68" value="68" />
<Picker.Item key="age-51" label="69" value="69" />
<Picker.Item key="age-52" label="70" value="70" />
<Picker.Item key="age-53" label="71" value="71" />
<Picker.Item key="age-54" label="72" value="72" />
<Picker.Item key="age-55" label="73" value="73" />
<Picker.Item key="age-56" label="74" value="74" />
<Picker.Item key="age-57" label="75" value="75" />
<Picker.Item key="age-58" label="76" value="76" />
<Picker.Item key="age-59" label="77" value="77" />
<Picker.Item key="age-60" label="78" value="78" />
<Picker.Item key="age-61" label="79" value="79" />
<Picker.Item key="age-62" label="80" value="80" />
<Picker.Item key="age-63" label="81" value="81" />
<Picker.Item key="age-64" label="82" value="82" />
<Picker.Item key="age-65" label="83" value="83" />
<Picker.Item key="age-66" label="84" value="84" />
<Picker.Item key="age-67" label="85" value="85" />
<Picker.Item key="age-68" label="86" value="86" />
<Picker.Item key="age-69" label="87" value="87" />
<Picker.Item key="age-70" label="88" value="88" />
<Picker.Item key="age-71" label="89" value="89" />
<Picker.Item key="age-72" label="90" value="90" />
<Picker.Item key="age-73" label="91" value="91" />
<Picker.Item key="age-74" label="92" value="92" />
<Picker.Item key="age-75" label="93" value="93" />
<Picker.Item key="age-76" label="94" value="94" />
<Picker.Item key="age-77" label="95" value="95" />
<Picker.Item key="age-78" label="96" value="96" />
<Picker.Item key="age-79" label="97" value="97" />
<Picker.Item key="age-80" label="98" value="98" />
<Picker.Item key="age-81" label="99" value="99" />
<Picker.Item key="age-82" label="100" value="100" />
                  </Picker>
                  <Text style={{width: '100%', height: 60, position: 'absolute', bottom: 0, left: 0}}>{' '}</Text>
                </View>
            </View>
            {
             retirementAgeValidation && (
            <View style={styles.formGroupError}>
                    <Text style={styles.inputError}>Please input your desired retirement age</Text>
            </View>
             )}

            
            <View style={{width: "100%",marginTop: 100}}>
            { isLoading && (<JarvisLoading color="#fff" text="Please wait"/>)}
           <View style={styles.centerView}>
		   <JarvisButton
		        style={[styles.loginButton,{marginTop: 10}]}
                bgcolor={buttonBackground}
                 play={_next}
                 btn="Next"
                 disabled={nextButtonDisabled}
            />
			</View>
            </View>
        </View>
        </ImageBackground>
      </View>
     );
  
}


const styles = StyleSheet.create({
    container: {
     // flex: 1,
      //backgroundColor: '#fff',
      alignItems: 'center',
     // marginTop: 30,
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
    imageBackground:{
      flex: 1,
      //justifyContent: "center",
      //alignItems: "center",
      //width: "100%"
  },
    subHeader: {	
       fontSize: 20,
       alignSelf:"center"
    },
    textWhite: {
      color: "#fff"
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

