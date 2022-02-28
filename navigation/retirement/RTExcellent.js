import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Platform,
  Animated,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  ImageBackground,
  Pressable,
} from "react-native";
import * as helpers from "../../Helpers";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";
import { List } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function RTExcellent({ navigation }) {
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");

  const _next = () => {
    // navigation.navigate('');
  };
  const _goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/cover.jpg")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View
          style={{
            marginTop: 10,
            alignContent: "flex-start",
            flexDirection: "row",
            justifyContent: "center",
          }}
        ></View>

        <View style={{ alignItems: "center" }}>
          <MaterialCommunityIcons
            name="party-popper"
            size={60}
            style={styles.textWhite}
          />
          <Text
            style={{
              ...styles.subHeader,
              ...styles.textWhite,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Excellent
          </Text>
          <Text
            style={{
              ...styles.subHeader,
              ...styles.textWhite,
              textAlign: "center",
              fontSize: 17,
              marginTop: 5,
            }}
          >
            You have completed step 2. To achieve your{"\n"} desired retirement
            lifestyle in will need a {"\n"}monthly retirement income of
          </Text>
        </View>
        <View
          style={{
            ...styles.hrView,
            width: "90%",
            alignSelf: "center",
            marginTop: 30,
          }}
        />
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              ...styles.subHeader,
              ...styles.textWhite,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            £2779
          </Text>
          <Text style={{ ...styles.textWhite, textAlign: "center" }}>
            (£33,348 Per Annum)
          </Text>
        </View>
        <View
          style={{
            ...styles.hrView,
            width: "90%",
            alignSelf: "center",
            marginTop: 10,
          }}
        />
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              ...styles.subHeader,
              ...styles.textWhite,
              textAlign: "center",
              fontSize: 17,
              marginTop: 5,
            }}
          >
            You have also earned your second Javis Insights{"\n"}card on Saving
            & Investing
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <View style={{ marginTop: 20 }}>
            <Text style={{ textAlign: "center", ...styles.textWhite }}>
              Facts & Stats On Saving/Investing
            </Text>
          </View>
          <View
            style={{
              ...styles.hrView,
              width: "100%",
              alignSelf: "center",
              marginTop: 10,
              height: 2,
              backgroundColor: "grey",
            }}
          />
          <View style={{ marginTop: 30 }}>
            <Text
              style={{ ...styles.textWhite, textAlign: "center", fontSize: 18 }}
            >
              Place holder for useful actionable stats and facts on saving and
              investing for the future
            </Text>
          </View>
          <View style={styles.footerSection}>
            <Text
              style={{
                ...styles.textWhite,
                textAlign: "center",
                fontSize: 14,
                marginBottom: 8,
              }}
            >
              You’re just one steps away from completion. Next step{" "}
            </Text>
            <JarvisButton
              bgcolor={buttonBackground}
              play={_next}
              btn="Pensions & Savings"
              w={200}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  sum: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 10,
  },
  footerSection: {
    ...{ alignItems: "center", marginTop: "auto", height: 120 },
    borderTopColor: "#bbb",
    borderTopWidth: 2,
    paddingTop: 10,
    paddingBottom:10
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",

    marginTop: 30,
    //justifyContent: 'center',
  },
  footerContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // backgroundColor: "#f1f3f2",
    height: 300,
    marginTop: 20,
    borderTopColor: "#bbb",
    borderLeftColor: "#bbb",
    borderRightColor: "#bbb",
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
  },
  cardsContainer: {
    marginTop: 17,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  centerView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  continueButton: {
    marginTop: 50,
    marginLeft: 20,
  },
  imageBackground: {
    flex: 1,
    // justifyContent: "center",
    //alignItems: "center",
    width: "100%",
  },
  textWhite: {
    color: "#fff",
  },
  subHeader: {
    fontSize: 22,
    textAlign: "center",
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
});

export default RTExcellent;
