import React, { useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import JSDashPension from "./JSDashPension";
import Swiper from "react-native-swiper";
import JSDashboardMain from "./JSDashboardmain";
import FullScreenContext from "../../contexts/fullScreenContext";
import jwtDecode from "jwt-decode";
import { myColorsLight } from "../../constant/colors";
import JSDashboardnav from "../../components/JSDashboardnav";
// import BudgetBenchmark2 from "./BudgetBenchmark2";
import RTDashboardMain from "./rtDashboard/RtDashboardmain";
import RealityDashboardMain from "./RealityDashbord/RealityDashboardmain";
import api from "../../api";
import UserContext from "../../contexts/UserContext";

const JSDasboard = () => {
  const [mounted, setMounted] = React.useState(1);
  const [isfullScreen, setIsfullScreen] = React.useState(false);
  const [rtisfullScreen, seRttIsfullScreen] = React.useState(false);
  const togglrFullScreen = () => setIsfullScreen(!isfullScreen);
  const togglrRtFullScreen = () => seRttIsfullScreen(!rtisfullScreen);
  const ctx = useContext(UserContext);
  const lockscroll = () => {
    //prevent swipper horizontal scroll if the cards is in full screen
    let value = true;
    if (isfullScreen) {
      value = false;
    } else if (rtisfullScreen) {
      value = false;
    }
    return value;
  };
  const checkTokenExpiration = () => {
    const token = ctx?.atk;
    if (token) {
      if (jwtDecode(token).exp < Date.now() / 1000) {
        // next(action );
        // localStorage.clear();
        console.log("token expired");
        //log user out
      }
    }
  };
  const Get_retirement_profile_user = async () => {
    await api
      .Get_retirement_profile_user(ctx?.atk, ctx?.u?.id)
      .then((res) => {
        // setRetireProfile(res?.data);
        // console.log(res.data);
        // retireProfile,
        ctx?.setRetireProfile(res.data);

        // ctx.setRetireProfile(res.data),
      })
      .catch((err) => {
        console.log(err);
        if (err?.errors[0]?.details) {
          Alert.alert("Failed to get RT profile, server says", err?.errors[0].details);
        } else {
          Alert.alert("An error occured, try again");
        }

        return err;
      });
  };
  const retrieve_all_jars_Jar = async () => {
    await api
      .retrieve_all_jars_Jar(ctx?.atk, ctx?.u?.id)
      .then((res) => {
        // setRetireProfile(res?.data);
        // console.log(res.data);
        // retireProfile,
        ctx?.setPensionJars(res.data);

        // ctx.setRetireProfile(res.data),
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Network error, unable to retrieve your pension jars");
        return err;
      });
  };
  React.useEffect(() => {
    checkTokenExpiration();
    Promise.resolve(Get_retirement_profile_user().then(retrieve_all_jars_Jar));
  }, []);
  return (
    <FullScreenContext.Provider
      value={{
        togglrFullScreen,
        isfullScreen,
        rtisfullScreen,
        togglrRtFullScreen,
      }}
    >
      <View style={styles.container}>
        {/* {mounted === 1 && <JSDashboardMain />} */}
        {mounted === 1 && (
          <Swiper
            loop={false}
            paginationStyle={{
              bottom: 0,
            }}
            loadMinimal={true}
            scrollEnabled={lockscroll()}
            loadMinimalSize={1}
            activeDot={
              <View
                style={{
                  backgroundColor: myColorsLight.black,
                  width: 13,
                  height: 13,
                  borderRadius: 7,
                  marginLeft: 7,
                  marginRight: 7,
                }}
              />
            }
            style={styles.wrapper}
            showsButtons={false}
          >
            <JSDashboardMain />
            <RTDashboardMain />
            <RealityDashboardMain />
          </Swiper>
        )}
        {mounted === 2 && <JSDashPension />}
        {!isfullScreen && !rtisfullScreen && (
          <JSDashboardnav {...{ mounted, setMounted }} />
        )}
      </View>
    </FullScreenContext.Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {},
});
export default JSDasboard;
