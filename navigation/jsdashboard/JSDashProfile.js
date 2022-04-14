import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight } from "../../constant/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FullScreenContext from "../../contexts/fullScreenContext";

const JSDashProfile = () => {
  const { closeProfile } = useContext(FullScreenContext);
  const [isfullScreen, setIsfullScreen] = React.useState(false);
  const togglrFullScreen = () => setIsfullScreen(!isfullScreen);
  const proptLogout = () =>
    Alert.alert("Log out", "Are you sure you want to log out", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  return (
    <MyGradientBackground>
      <View style={{ alignItems: "flex-end", paddingHorizontal: 20 }}></View>
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
              Profile
            </Text>
          </View>
        </View>
      </View>
      <View style={{ position: "absolute", left: 10, marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => {
            closeProfile();
          }}
        >
          <MaterialCommunityIcons
            name="chevron-left-circle-outline"
            color={myColorsLight.lightGreyDark}
            size={40}
          />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center", marginTop: 30 }}>
        <FontAwesome
          name="user-circle-o"
          size={120}
          color={myColorsLight.black}
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Text style={{ fontSize: 30 }}>Chukwuma Martins</Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 2 }}>
        <Text style={{ fontSize: 20, color: myColorsLight.grey6 }}>
          talk2mat@yahoo.com
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: 5,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{ fontWeight: "200", color: myColorsLight.lightGreyDim }}
          >
            Your Desired Retirement{"\n"}
            lifestyle monthly cost is :
          </Text>
          <Text style={styles.boldtxt}>£718,925</Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{ fontWeight: "200", color: myColorsLight.lightGreyDim }}
          >
            Your Desired Retirement{"\n"}
            lifestyle monthly cost is :
          </Text>
          <Text style={styles.boldtxt}>£718,925</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={styles.profileItem}>
            <Ionicons
              name="logo-codepen"
              size={24}
              color={myColorsLight.grey2}
            />
            <Text style={{ marginLeft: 10, fontSize: 17 }}>Preferences</Text>
          </View>
          <View style={styles.profileItem}>
            <Entypo name="tools" size={24} color={myColorsLight.black} />
            <Text style={{ marginLeft: 10, fontSize: 17 }}>Settings</Text>
          </View>
          <TouchableOpacity onPress={proptLogout}>
            <View style={styles.profileItem}>
              <AntDesign name="logout" size={20} color="black" />
              <Text style={{ marginLeft: 10, fontSize: 17 }}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </MyGradientBackground>
  );
};

const styles = StyleSheet.create({
  profileItem: {
    flexDirection: "row",
    marginVertical: 5,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  hrView: {
    width: "100%",
    // marginTop: 10,
    // paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#bbb",
    height: 2,
    backgroundColor: "#bbb",
  },
  subHeader: {
    fontSize: 22,
    textAlign: "center",
  },
  boldtxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default JSDashProfile;
