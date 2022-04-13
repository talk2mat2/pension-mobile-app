import React, { useContext } from "react";
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  PanResponder,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import RelityIncomeUsers from "./RelityIncomeUsers";
import DesiredrtLifestyle from "./DesiredrtLifestyle";
import Desiredrtage from "./desiredrtage";
import RelityIncomeUsersFund from './RelityIncomeUsers'
import CurrentPensionFund from "./CurrentPensionFund";
// import PersoanalPensionModal from "../../../components/rtPersonalPensionModal";
// import EditPersoanalPensionModal from "../../../components/EditPersonalPensionModal";
import { Modal, Portal, Button, Provider, Title } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { myColorsLight } from "../../../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import FullScreenContext from "../../../contexts/fullScreenContext";
import JarvisButton from "../../../components/JarvisButton";
import UserContext from "../../../contexts/UserContext";
import api from "../../../api";
import JarvisLoader from "../../../components/JarvisLoader";
import { PanGestureHandler } from "react-native-gesture-handler";
import RealityIncomeUsersFund from "./RelityIncomeUsersFund";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");
const WhenRetire = ({ handleshowCards }) => {
  const [loading, setIsLoading] = React.useState(false);
  const [personData, setPersoData] = React.useState({
    id: Math.floor(Math.random() * 100),
    provider: "",
    name: "",
    currentValue: "",
    regularContribution: "",
    contributeBasics: "",
    monthlyContribution: "",
    regContributionAmount: "",
    spousePension: "no",
    secclExternalProviderId: "",
    jarType: "asset",
    jarSubType: "external",
    regContributionFrequency: "monthly",
    isSpouse: false,
  });
  const [editPersonData, setEditPersoData] = React.useState({});
  const { rtisfullScreen, togglrRtFullScreen } = useContext(FullScreenContext);
  const outcomePopper = new Animated.ValueXY({
    x: 0,
    y: 0,
  });
  const position = React.useRef(
    new Animated.ValueXY({ x: 0, y: deviceHeight })
  ).current;
  const [visible, setVisible] = React.useState(false);
  const [editVisible, setEditVisible] = React.useState(false);
  const ctx = useContext(UserContext);
  React.useEffect(() => {
    Animated.timing(position, {
      toValue: { x: 0, y: deviceHeight / 2 },
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
      if (rtisfullScreen) {
        togglrRtFullScreen();
      }
    });
  };
  const retireProfile = {};

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const handleToggleFullScreen = () => {
    // togglrRtFullScreen();
    !rtisfullScreen &&
      Animated.timing(position, {
        toValue: { x: 0, y: 2 },
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }).start(() => togglrRtFullScreen());
    rtisfullScreen &&
      Animated.timing(position, {
        toValue: { x: 0, y: deviceHeight / 2 },
        duration: 300,
        delay: 300,
        useNativeDriver: true,
      }).start(() => togglrRtFullScreen());
  };
  const handleBackButton = () => {
    if (rtisfullScreen) {
      togglrRtFullScreen();
    } else {
      closeCard();
    }
  };
  const selectStatePension = () => {
    // console.log(ctx?.pensionJars)
    if (ctx?.pensionJars?.length > 0) {
      const statePenJars = ctx?.pensionJars?.filter(
        (jars) =>
          jars.attributes?.jarSubType === "external" &&
          jars.attributes?.jarType === "asset"
      );
      if (statePenJars) {
        return statePenJars;
      } else return [];
    } else return [];
  };
  //   const retrieve_all_jars_Jar = async () => {
  //     await api
  //       .retrieve_all_jars_Jar(ctx?.atk, ctx?.u?.id)
  //       .then((res) => {
  //         // setRetireProfile(res?.data);
  //         // console.log(res.data);
  //         // retireProfile,
  //         ctx?.setPensionJars(res.data);

  //         // ctx.setRetireProfile(res.data),
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         Alert.alert("Network error, unable to retrieve your pension jars");
  //         return err;
  //       });
  //   };
  const sumPersonalJarsValue = () => {
    let sum = 0;
    if (ctx?.pensionJars?.length > 0) {
      ctx?.pensionJars?.map((jar) => {
        if (
          jar.attributes.jarSubType === "external" &&
          jar.attributes?.jarType === "asset"
        ) {
          sum += jar.attributes.currentValue;
        }
      });
    }
    return sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const submitFilledJars = async () => {
    //iterate and make api call per jar
    const isExist =
      personData.currentValue !== "" && personData.currentValue !== "";
    const jarData = {
      type: "jar",
      attributes: { ...personData },
    };
    if (isExist) {
      setIsLoading(true);
      await api
        .create_Jar(ctx?.atk, jarData)
        .then((res) => {
          console.log("jar created");
          setIsLoading(false);
          Alert.alert("Successful");
          retrieve_all_jars_Jar();
        })
        .catch((err) => {
          Alert.alert("Unable to add new personal pension");
          setIsLoading(false);
          console.log("error occured", err);
        });
    }
  };
  const updateFilledJars = async (id) => {
    //iterate and make api call per jar
    const isExist =
      editPersonData.currentValue !== "" && editPersonData.name !== "";
    const jarData = {
      type: "jar",
      attributes: { ...editPersonData },
    };
    if (isExist) {
      setIsLoading(true);
      await api
        .update_filled_Jar(id, ctx?.atk, jarData)
        .then((res) => {
          console.log("jar updated");
          setIsLoading(false);
          Alert.alert("Successfully updated");
          retrieve_all_jars_Jar();
        })
        .catch((err) => {
          Alert.alert("Unable to add new personal pension");
          setIsLoading(false);
          console.log("error occured", err);
        });
    }
  };
  const showEditModal = (data, id) => {
    setEditPersoData({ ...data, id: id });
    // console.log(data)
    setEditVisible(true);
  };
  React.useEffect(() => {
    // retrieve_all_jars_Jar();
    const banckhandle = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );
    return () => {
      banckhandle.remove();
    };
  }, []);

  const handleGesture = (evt) => {
    const { nativeEvent } = evt;

    if (nativeEvent.velocityY > 0) {
      //on swipe down
      closeCard();
    } else {
      //on swipe up

      if (!rtisfullScreen) {
        handleToggleFullScreen();
      }
    }
  };
  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View
        // {...pan.panHandlers}
        style={{
          //height: rtisfullScreen ? deviceHeight - 20 : 400,
          height: deviceHeight,
          ...styles.container,
          ...styles.card,
          transform: [{ translateY: position.y }],
        }}
      >
        {/* <PersoanalPensionModal
          {...{
            visible,
            setVisible,
            submitFilledJars: submitFilledJars,
            personData: personData,
            changeStatePension: () => {},
            setPersoData: setPersoData,
            AddJar: () => {},
          }}
        /> */}
        {/* <EditPersoanalPensionModal
          {...{
            visible: editVisible,
            updateFilledJars: updateFilledJars,
            showEditModal: showEditModal,
            setVisible: setEditVisible,
            submitFilledJars: () => {},
            personData: editPersonData,
            changeStatePension: () => {},
            setPersoData: setEditPersoData,
            AddJar: () => {},
          }}
        /> */}
        <View
          // Background Linear Gradient
          // colors={[myColorsLight.grey8, "transparent"]}
          style={{ ...styles.background, paddingTop: rtisfullScreen ? 40 : 20 }}
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
              <Text style={styles.cardName}>When Can I Retire?</Text>
            </TouchableOpacity>
            {!rtisfullScreen ? (
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
          <View style={{ marginTop: 30 }}>
            <Text
              style={[
                styles.loginText,
                ,
                { fontSize: 23, textAlign: "center", fontWeight: "bold" },
              ]}
            >
              When Can I Retire?
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
              alignItems: "center",
              marginTop: 40,
              marginBottom:40
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: myColorsLight.grey3,
                paddingTop: 10,
               
              }}
            >
              Based on your current pension{"\n"}
              fund and the lifestye you want{"\n"}
              in retirement, your{"\n"}
              retirement age will be:
            </Text>
            <Text
              style={{
                color: myColorsLight.black,
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              <Text
                style={{
                  color: myColorsLight.black,
                  fontSize: 55,
                }}
              >
                71{"\n"}
              </Text>
              years
            </Text>
          </View>
          {loading && <JarvisLoader />}

          <View style={{ marginTop: "auto", maxHeight: 400 }}>
            <ScrollView style={{}}>
              <RealityIncomeUsersFund
                showEditModal={showEditModal}
                user={{ id: 4 }}
                key={223}
                ctxData={ctx.u}
                name="Micheal Spender"
                budget="£17,345"
              />
              <Desiredrtage
                showEditModal={showEditModal}
                user={{ id: 4 }}
                key={222}
                ctxData={ctx.u}
                name="Micheal Spender"
                budget="£17,345"
              />
              <DesiredrtLifestyle
                showEditModal={showEditModal}
                user={{ id: 4 }}
                key={229}
                ctxData={ctx.u}
                name="Micheal Spender"
                budget="£17,345"
              />
            </ScrollView>
          </View>
        </View>

        <View
          style={{ alignItems: "center", marginBottom: 90, marginTop: "auto" }}
        >
          <JarvisButton
            bgcolor={myColorsLight.black}
            play={showModal}
            btn="Add Pension"
            w={200}
          />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: myColorsLight.white,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
  },
  cardName: {
    fontSize: 18,
  },
  cardUsers: {
    backgroundColor: myColorsLight.white,
    height: 90,
    flexDirection: "row",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  background: {
    minHeight: deviceHeight / 1.8,
    // position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    right: 0,
    backgroundColor: myColorsLight.grey8,
  },
  cardsContainer: {
    marginTop: 17,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  sum: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 10,
    paddingHorizontal: 30,
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
  cardConteent: {
    flexDirection: "row",
    minWidth: 90,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default WhenRetire;
