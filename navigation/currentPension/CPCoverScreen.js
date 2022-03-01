import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Platform,
  Animated,
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  ImageBackground,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as AuthSession from "expo-auth-session";
const axios = require("axios");
import * as helpers from "../../Helpers";
import UserContext from "../../contexts/UserContext";
import JarvisButton from "../../components/JarvisButton";

function CpCoverScreen({ navigation }) {
  const ctx = useContext(UserContext);
  const [buttonBackground, setButtonBackground] = useState("#77f");

  const _next = () => {
    navigation.navigate("CPAddStatePension");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        // source={require("../../assets/cov.png")}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <View style={{ marginTop: 10 }}>
          <Text style={[styles.subHeader]}>
            Planning your{"\n"}
            retirement now is{"\n"}
            the best thing you{"\n"}
            can do for your{"\n"}
            future self.
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={[styles.midsubHeader, ]}>
            Now that we have your desired{"\n"}
            retirement lifestyle lets start{"\n"}
            building your retirement fund.{"\n"}
          </Text>
        </View>

        <>
          <View style={{ width: "100%", marginTop: 7 }}>
            <View style={[styles.centerView, { marginTop: 30 }]}>
              <JarvisButton
                style={[styles.continueButton, { marginTop: 90 }]}
                bgcolor={buttonBackground}
                play={_next}
                btn="Continue"
                w="55%"
              />
            </View>
          </View>
        </>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    marginTop: 30,
    //justifyContent: 'center',
  },
  midsubHeader: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 1.4,
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
    justifyContent: "center",
    //alignItems: "center",
    width: "100%",
  },
  textWhite: {
    color: "#fff",
  },
  subHeader: {
    fontSize: 30,
    textAlign: "center",
  },
  hrView: {
    width: "100%",
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
});

export default CpCoverScreen;
