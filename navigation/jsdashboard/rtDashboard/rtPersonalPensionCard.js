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
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import RtPersonlaUsers from "./rtPersonalUsers";
import PersoanalPensionModal from "../../../components/rtPersonalPensionModal";
import EditPersoanalPensionModal from "../../../components/EditPersonalPensionModal";
import { Modal, Portal, Button, Provider, Title } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { myColorsLight } from "../../../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import FullScreenContext from "../../../contexts/fullScreenContext";
import JarvisButton from "../../../components/JarvisButton";
import UserContext from "../../../contexts/UserContext";
import api from "../../../api";
import JarvisLoader from "../../../components/JarvisLoader";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");
const RtPersonalPensionCard = ({ handleshowCards }) => {
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
  const position = React.useRef(
    new Animated.ValueXY({ x: 0, y: deviceHeight / 2 - 130 })
  ).current;
  const [visible, setVisible] = React.useState(false);
  const [editVisible, setEditVisible] = React.useState(false);
  const ctx = useContext(UserContext);
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
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 500,
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
        (jars) => jars.attributes?.jarSubType === "external" && jars.attributes?.jarType === "asset"
      );
      if (statePenJars) {
        return statePenJars;
      } else return [];
    } else return [];
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
  const sumPersonalJarsValue = () => {
    let sum = 0;
    if (ctx?.pensionJars?.length > 0) {
      ctx?.pensionJars?.map((jar) => {
        if (jar.attributes.jarSubType === "external" && jar.attributes?.jarType === "asset") {
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
    retrieve_all_jars_Jar();
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
        height: rtisfullScreen ? deviceHeight - 20 : 400,
        ...styles.container,
        ...styles.card,
        transform: [{ translateY: position.y }],
      }}
    >
      <PersoanalPensionModal
        {...{
          visible,
          setVisible,
          submitFilledJars: submitFilledJars,
          personData: personData,
          changeStatePension: () => {},
          setPersoData: setPersoData,
          AddJar: () => {},
        }}
      />
      <EditPersoanalPensionModal
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
      />
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
            <Text style={styles.cardName}>Personal Pensions</Text>
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
            Personal Pensions
          </Text>
        </View>
        {loading && <JarvisLoader />}
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <Text style={{ textAlign: "center", color: myColorsLight.grey3 }}>
            Total Personal Pension(s)
          </Text>
        </View>
        <View style={{ marginTop: 9, alignItems: "center", marginBottom: 15 }}>
          <Text
            style={{
              textAlign: "center",
              color: myColorsLight.black,
              fontSize: 55,
            }}
          >
            £{sumPersonalJarsValue()}
          </Text>
        </View>

        <View style={{ marginTop: "auto", maxHeight: 400 }}>
          <ScrollView style={{}}>
            {selectStatePension()?.map((users) => (
              <RtPersonlaUsers
                showEditModal={showEditModal}
                user={users}
                ctxData={ctx.u}
                key={users.id}
                name="Micheal Spender"
                budget="£17,345"
              />
            ))}
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
export default RtPersonalPensionCard;
