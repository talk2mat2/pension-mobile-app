import React from "react";
import { View, Text, StyleSheet } from "react-native";
import JSDashPension from "./JSDashPension";
import Swiper from "react-native-swiper";
import JSDashboardMain from "./JSDashboardmain";
import FullScreenContext from "../../contexts/fullScreenContext";
import { myColorsLight } from "../../constant/colors";
import JSDashboardnav from "../../components/JSDashboardnav";
// import BudgetBenchmark2 from "./BudgetBenchmark2";
import RTDashboardMain from "./rtDashboard/RtDashboardmain";
import RealityDashboardMain from "./RealityDashbord/RealityDashboardmain";

const JSDasboard = () => {
  const [mounted, setMounted] = React.useState(1);
  const [isfullScreen, setIsfullScreen] = React.useState(false);
  const [rtisfullScreen, seRttIsfullScreen] = React.useState(false);
  const togglrFullScreen = () => setIsfullScreen(!isfullScreen);
  const togglrRtFullScreen = () => seRttIsfullScreen(!rtisfullScreen);

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
