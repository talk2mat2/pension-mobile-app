import React, { useContext } from "react";
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import MyGradientBackground from "../../components/grdientBackGround";
import { AntDesign } from '@expo/vector-icons';
import { myColorsLight } from "../../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import FullScreenContext from "../../contexts/fullScreenContext";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");
const JsTimelineCard = ({ handleshowCards }) => {
  const { togglrFullScreen, isfullScreen } = useContext(FullScreenContext);
  const position = React.useRef(
    new Animated.ValueXY({ x: 0, y: deviceHeight / 2 - 130 })
  ).current;

  React.useEffect(() => {
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeCard = () => {
    Animated.timing(position, {
      toValue: { x: 0, y: deviceHeight / 2 - 120 },
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start(() => {
      handleshowCards();
      if (isfullScreen) {
        togglrFullScreen();
      }
    });
  };

  const handleToggleFullScreen = () => {
    // togglrFullScreen();
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 500,
      delay: 300,
      useNativeDriver: true,
    }).start(() => togglrFullScreen());
  };
  const handleBackButton = () => {
    if (isfullScreen) {
      togglrFullScreen();
    } else {
      closeCard();
    }
  };
  React.useEffect(() => {
    const banckhandle = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );
    return () => {
      banckhandle.remove();
    };
  }, []);
  return (
    <Animated.View
      style={{
        height: isfullScreen ? deviceHeight - 20 : 400,
        ...styles.container,
        ...styles.card,
        transform: [{ translateY: position.y }],
        paddingTop: isfullScreen ? 40 : 20,
      }}
    >
     <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={closeCard}>
            <Text style={styles.cardName}>Timeline</Text>
          </TouchableOpacity>
          {!isfullScreen ? (
            <TouchableOpacity onPress={handleToggleFullScreen}>
              <MaterialIcons
                name="fullscreen"
                size={40}
                color={myColorsLight.black}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleToggleFullScreen}>
              <AntDesign
                name="closecircle"
                size={24}
                color={myColorsLight.grey4}
              />
            </TouchableOpacity>
          )}
        </View>
      <>
     
      <View
        style={{
          marginTop: 5,
          alignContent: "flex-start",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View>
          <View>
            <Text
              style={[
                styles.loginText,
                ,
                { fontSize: 30, textAlign: "center", fontWeight: "bold" },
              ]}
            >
            Timeline
            </Text>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <Text
          style={{
            ...styles.subHeader,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur{"\n"}
         
        </Text>
      </View>
      <View style={styles.nameContainer}>
        <View style={{width:'50%' , alignItems:"center", marginTop:10}}><Text>Micheal</Text></View>
        <View style={{width:1, height:8, backgroundColor: '#000000', height:40}}></View>
        <View style={{borderEndColor:'#00000', width:'50%', marginTop:10,alignItems:"center"}}><Text>Sarah</Text></View>
      </View>
      <View style={styles.dividerContainer}>
        <View style={styles.divider1}>
        </View>
        <View style={styles.divider2}></View>
        <View style={styles.divider3}></View>
      </View>
      {/* <View style={styles.leftTimeline}>
       <View style={styles.timeline1}>
        <View style={styles.date}>
          <Text style={styles.dateFont}>0000</Text>
        </View>
        <View>
          <Text style={styles.text}> Lorem ipsum dolor sit amet, consectetur{"\n"}
          Lorem ipsum dolor sit amet, consectetur
          </Text>
        </View>
       </View>
       <View style={styles.timeline2}>
       <View style={styles.date}>
          <Text style={styles.dateFont}>0000</Text>
        </View>
        <View>
          <Text style={styles.text}> Lorem ipsum dolor sit amet, consectetur{"\n"}
          Lorem ipsum dolor sit amet, consectetur
          </Text>
        </View>
        </View>
        <View style={styles.timeline3}>
        <View style={styles.date}>
          <Text style={styles.dateFont}>0000</Text>
        </View>
        <View>
          <Text style={styles.text}> Lorem ipsum dolor sit amet,{"\n"} consectetur{"\n"}
          Lorem ipsum dolor sit amet, consectetur
          </Text>
        </View>
        </View>
      </View>
      <View style={styles.rightTimeline}>
       <View style={styles.rightTimeline1}>
        <View style={styles.rightDate}>
          <Text style={styles.dateFont}>0000</Text>
        </View>
        <View>
          <Text style={styles.rightText}> Lorem ipsum dolor sit amet,{"\n"} consectetur
          Lorem ipsum dolor {"\n"}sit amet, consectetur
          </Text>
        </View>
       </View>
       <View style={styles.rightTimeline2}>
       <View style={styles.rightDate}>
          <Text style={styles.dateFont}>0000</Text>
        </View>
        <View>
          <Text style={styles.rightText}> Lorem ipsum dolor sit amet, consectetur{"\n"}
          Lorem ipsum dolor sit amet, consectetur
          </Text>
        </View>
        </View>
        <View style={styles.rightTimeline3}>
        <View style={styles.rightDate}>
          <Text style={styles.dateFont}>0000</Text>
        </View>
        <View>
          <Text style={styles.rightText}> Lorem ipsum dolor sit amet, consectetur{"\n"}
          Lorem ipsum dolor sit amet, consectetur
          </Text>
        </View>
        </View>
      </View> */}
     

    
     
    </>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: myColorsLight.white,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  cardName: {
    fontSize: 18,
  },
  card: {
    borderRadius: 10,
    // padding: 10,
    // paddingLeft: 20,
  },
  dividerContainer:{
    flexDirection:"column",
    alignItems:'center',
  
  },
  divider1:{
    height:150,
    // marginRight:10,
    width: 14,
    borderBottomRightRadius:20, 
    borderBottomLeftRadius:20,
    backgroundColor:myColorsLight.black
  },
  divider2:{
    backgroundColor:myColorsLight.grey2, 
    height: 150, 
    // marginRight:10, 
    width: 14, 
    borderBottomRightRadius:20, 
    borderBottomLeftRadius:20
  },
  divider3:{
    backgroundColor:myColorsLight.grey3, 
    height: 150, 
    // marginRight:10,
     width: 14, 
     borderBottomRightRadius:20,
    borderBottomLeftRadius:20
  },
  nameContainer:{
    marginTop:20, 
    // marginLeft:-19,  
    borderColor: myColorsLight.grey4, 
    borderWidth: 1, 
    height: 40, 
    flexDirection: "row", 
    width:'100%'
  },
  leftTimeline:{
    marginLeft:5,
    marginTop:-400
  },
  rightTimeline:{
    marginLeft:200,
  marginTop:-400
  },
   text:{
    fontSize: 10
  },
  date:{
    marginLeft: 100,
  },
  timeline2:{
    marginTop:100
  },
  timeline3:{
    marginTop:110
  },
  rightText:{
    fontSize: 10
  },
  rightTimeline1:{
    marginTop:72
  },
  rightTimeline2:{
    marginTop:100
  },
  rightTimeline3:{
    marginTop:110
  },
  dateFont:{
    fontWeight: "bold"
  }
});
export default JsTimelineCard;
