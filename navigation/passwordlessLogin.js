import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Platform,
  Animated,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { myColorsLight } from "../constant/colors";
import Api from "../api";
import JarvisLoader from "../components/JarvisLoader";
import * as helpers from "../Helpers";
import JarvisButton from "../components/JarvisButton";
import { TextInput, HelperText } from "react-native-paper";

const PasswordLess = ({ visible, setVisiblility, navigation }) => {
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);
  const [buttonBackground, setButtonBackground] = useState("#77f");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = useState(false);
  // const ctx = React.useContext(userContext);
  const [emailError, setEmailError] = React.useState({
    status: true,
    messagge: "",
  });

  const sendCodeByEmail = async () => {
    if (!email) {
      return setEmailError({
        status: true,
        messagge: "Provide an email to continue",
      });
    }
    setLoading(true);
    await Api.passwordless_start({ email: email })
      .then((res) => {
        // console.log(res);
        setLoading(false);
        if (res.status == "200") {
          navigation.navigate("CodeScreen", { email: email });
          setVisiblility(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Alert.alert("An error occured, Try again");
      });
  };
  const setEmailStart = (data) => {
    helpers.save("emailStart", JSON.stringify(data));
    //ctx.setEmailStart(data);
  };
  React.useEffect(async () => {
    const persistDta = await helpers.getValueFor("emailStart");
    if (persistDta) {
      setEmail(JSON.parse(persistDta));
    }
  }, []);
  const _next = () => {
    setEmailStart(email);
    sendCodeByEmail();
  };
  function ValidateEmail(text) {
    setEmail(text);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError({
        status: false,
        messagge: "",
      });
      setLoginButtonDisabled(false);
      return true;
    }
    setEmailError({
      status: true,
      messagge: "Please enter a valid email address!",
    });
    setLoginButtonDisabled(true);
    return false;
  }

  React.useEffect(() => {
    if (email) {
      ValidateEmail(email);
    }
  }, [email]);
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => setVisiblility(false)}
      visible={visible}
    >
      <View style={{ flex: 1, paddingTop: 90 }}>
        <View style={{ position: "absolute", left: 10, top: 20 }}>
          <Pressable onPress={() => setVisiblility(false)}>
            <MaterialCommunityIcons
              name="chevron-left-circle-outline"
              color={myColorsLight.lightGreyDark}
              size={40}
            />
          </Pressable>
        </View>
        <Text style={{ fontSize: 23, fontWeight: "900", textAlign: "center" }}>
          Passwordless authentication
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            textAlign: "center",
            color: myColorsLight.grey6,
            marginTop: 20,
          }}
        >
          Login/Register by Email
        </Text>
        {loading && <JarvisLoader />}
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <TextInput
            style={{ width: "90%", backgroundColor: myColorsLight.grey9 }}
            Type="flat"
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            onBlur={() => ValidateEmail(email)}
          />
        </View>
        {emailError.status == true && (
          <View style={{ paddingHorizontal: 20 }}>
            <HelperText type="error" visible={emailError.status}>
              {emailError.messagge}
            </HelperText>
          </View>
        )}
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <JarvisButton
            style={styles.loginButton}
            disabled={emailError.status || loading}
            bgcolor={buttonBackground}
            play={_next}
            btn="Send Code by Email"
            w={150}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  loginButton: {
    // alignItems: "center",
    marginTop: 50,
    // marginLeft: 20,
  },
});
export default PasswordLess;
