import React, { useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import JSDashPension from "./JSDashPension";
import Swiper from "react-native-swiper/src";
import JSDashboardMain from "./JSDashboardmain";
import FullScreenContext from "../../contexts/fullScreenContext";
import jwtDecode from "jwt-decode";
import * as helpers from "../../Helpers";
import { myColorsLight } from "../../constant/colors";
import JSDashboardnav from "../../components/JSDashboardnav";
import JSDashProfile from "./JSDashProfile";
// import BudgetBenchmark2 from "./BudgetBenchmark2";
import RTDashboardMain from "./rtDashboard/RtDashboardmain";
import RealityDashboardMain from "./RealityDashbord/RealityDashboardmain";
import api from "../../api";
import UserContext from "../../contexts/UserContext";
import AppTab from "../AppTab";

const JSDasboard = () => {
  const [mounted, setMounted] = React.useState(1);
  const [isfullScreen, setIsfullScreen] = React.useState(false);
  const [rtisfullScreen, seRttIsfullScreen] = React.useState(false);
  const togglrFullScreen = () => setIsfullScreen(!isfullScreen);
  const togglrRtFullScreen = () => seRttIsfullScreen(!rtisfullScreen);
  const ctx = useContext(UserContext);
  const prevScreen = React.useRef();
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
  const openProfile = (prev) => {
    if (prev) {
      prevScreen.current = prev;
    }
    setMounted(3);
  };
  const closeProfile = () => {
    if (prevScreen.current) {
      setMounted(prevScreen.current);
    } else {
      setMounted(1);
    }
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
  const handleLogout = () => {
    //console.log(ctx)
    helpers.remove("pa_u");
    ctx?.setAtk(null);
    ctx?.setRtk(null);
    ctx?.setU(null);
    ctx?.setLoggedIn(false);
    // navigation.replace("logins");
  };
  const Get_retirement_profile_user = async () => {
    await api
      .Get_retirement_profiles_user(ctx?.atk)
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
          //logout in cse token hs expired
          //might change this later
          handleLogout();
          Alert.alert(
            "Failed to get RT profile, server says",
            err?.errors[0].details
          );
        } else {
          Alert.alert("An error occured, try again");
        }

        return err;
      });
  };
  const syncUsersProfileData = async () => {
 
    await api
      .retrieve_users_profile(ctx?.atk)

      .then((res) => {
        // console.log(ctx?.u)
        // console.log(res.data)
  
        // ctx?.setRetireProfile(res.data);
        // console.log(res.data);
        // ctx.setRetireProfile(res.data),
        let attributes = res.data.attributes
          // included = res.data.included[0];
        // included?.attributes?.lifeExpectancies &&
        //   delete included.attributes.lifeExpectancies;
        let trimmedUserInfo = {
          attributes: {
            title: attributes.title,
            name: attributes.name,
            fname: attributes.firstName,
            lname: attributes.lastName,
            email: attributes.email,
            gender: attributes.gender,
          },
          type: attributes.type,
          id: attributes.id,
          included:ctx?.u?.included,
        };
        helpers.save("pa_u", JSON.stringify(trimmedUserInfo));
      })
      .catch((err) => {
        console.log(err);
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
    Promise.resolve(
      syncUsersProfileData()
        .then(Get_retirement_profile_user)
        .then(retrieve_all_jars_Jar)
    );
  }, []);
  return (
    <FullScreenContext.Provider
      value={{
        togglrFullScreen,
        isfullScreen,
        rtisfullScreen,
        togglrRtFullScreen,
        openProfile,
        closeProfile,
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
        {mounted === 3 && <JSDashProfile handleLogout={handleLogout} />}
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
