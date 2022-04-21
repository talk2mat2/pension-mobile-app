import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, Alert } from "react-native";
import { myColorsLight } from "../constant/colors";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import * as helpers from "../Helpers";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import JarvisButton from "../components/JarvisButton";
import JarvisLoader from "../components/JarvisLoader";
import api from "../api";
import UserContext from "../contexts/UserContext";
const CELL_COUNT = 6;
const CodeScreen = ({ navigation, route }) => {
  const [buttonBackground, setButtonBackground] = useState("#77f");
  const ctx = React.useContext(UserContext);
  const { email } = route.params;
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const _updateUser = (dt) => {
    ctx.setAtk(dt.atk);
    ctx.setRtk(dt.rtk);
    ctx.setU(dt.u);
    ctx.setLoggedIn(true);
    if (dt?.u?.included[0]?.onboardingCompleted != null) {
      ctx.setOnboardingCompleted(dt?.u?.included[0]?.onboardingCompleted);
    }
  };
  const getUsersData = async (dt3) => {
    await api
      .retrieve_users_profile(dt3.access_token)
      .then(async (userInfo) => {
        if (userInfo) {
          let uidt = userInfo;
          // console.log("userInfo: ",uidt);
          //Save user info, access token, refresh token and update user context
          //User info
          //console.log("userinfo dt: ",uidt.data);
          console.log("userInfo is-", userInfo);
          let attributes = uidt.data.attributes,
            included = uidt.data?.included?.[0] || {};
          included?.attributes?.lifeExpectancies &&
            delete included.attributes.lifeExpectancies;
          let trimmedUserInfo = {
            attributes: {
              title: attributes.title,
              name: attributes.name,
              fname: attributes.firstName,
              lname: attributes.lastName,
              email: attributes.email,
              gender: attributes.gender,
            },
            type: included.type,
            id: included.id,
            included: [included.attributes || {}],
          };
          console.log("trimmedUserInfo: ", trimmedUserInfo);
          helpers.save("pa_atk", dt3.access_token);
          dt3.refresh_token && helpers.save("pa_rtk", dt3.refresh_token);
          let includes = [{}];
          // helpers.save("pa_u", JSON.stringify(trimmedUserInfo));
          //check onbording completed
          await api
            .Get_retirement_profiles_user(dt3.access_token)
            .then((resp) => {
              // console.log("resp is", resp)
              // console.log(resp?.data?.attributes?.onboardingCompleted)
              if (resp?.data?.attributes?.onboardingCompleted == true) {
                ctx.setOnboardingCompleted(true);
                includes = [{ ...resp?.data?.attributes }];
              } else {
              }
            })
            .catch((err) => {});
          _updateUser({
            u: {
              ...trimmedUserInfo,
              included: includes,
            },
            atk: dt3.access_token,
            rtk: "",
          });
          helpers.save(
            "pa_u",
            JSON.stringify({
              ...trimmedUserInfo,
              included: includes,
            })
          );
        } else {
          console.log("error fetching user profile");
        }
        setLoading(false);
      });
  };
  const passwordlessTokenStart = async () => {
    setLoading(true);
    await api
      .passwordless_token({ email, otp: value })
      .then((res) => {
        console.log(res);
        getUsersData(res);
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(err?.message);
        console.log(err?.message);
      });
  };
  React.useEffect(() => {
    if (value.length == CELL_COUNT) {
      passwordlessTokenStart();
    }
  }, [value]);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>
        Verification Code Sent !
      </Text>
      <Text
        style={{
          color: myColorsLight.grey6,
          fontSize: 16,
          fontWeight: "800",
          textAlign: "center",
          marginTop: 15,
        }}
      >
        {email}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginTop: 40,
          textAlign: "center",
          color: myColorsLight.grey6,
        }}
      >
        Please check your email inbox and {"\n"}enter the one-time passcode
      </Text>
      <View style={{ position: "absolute", left: 10, top: 50 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left-circle-outline"
            color={myColorsLight.lightGreyDark}
            size={40}
          />
        </Pressable>
      </View>
      <View style={{ marginTop: 30, paddingHorizontal: 40 }}>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      {loading && <JarvisLoader />}
      <View style={{ alignItems: "center", marginTop: 60 }}>
        <JarvisButton
          style={styles.loginButton}
          disabled={value.length != CELL_COUNT || loading}
          bgcolor={buttonBackground}
          play={() => passwordlessTokenStart()}
          btn="Verify"
          w={150}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: myColorsLight.white,
  },
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});
export default CodeScreen;
