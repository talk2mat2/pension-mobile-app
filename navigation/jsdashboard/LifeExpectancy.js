import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import MyGradientBackground from "../../components/grdientBackGround";
import { myColorsLight } from "../../constant/colors";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import FullScreenContext from "../../contexts/fullScreenContext";
import UserContext from "../../contexts/UserContext";
const LifeExpectancy = ({ handleToggleFullScreen, closeCard }) => {
  const { togglrFullScreen, isfullScreen } = useContext(FullScreenContext);
  const ctx = useContext(UserContext);

  const userArray = () => {
    let arrs = [];
    if (ctx?.retireProfile?.attributes?.lifeExpectancies?.length > 0) {
      ctx?.retireProfile?.attributes?.lifeExpectancies?.map((data) => {
        data.user && arrs.push(data.user);
      });
    }
    return arrs;
  };
  const combinedArray = () => {
    let arrs = [];
    if (ctx?.retireProfile?.attributes?.lifeExpectancies?.length > 0) {
      ctx?.retireProfile?.attributes?.lifeExpectancies?.map((data) => {
        data.combined && arrs.push(data.combined);
      });
    }
    return arrs;
  };
  // const probabilityArray = () => {
  //   let arrs = [];
  //   if (ctx?.retireProfile?.attributes?.lifeExpectancies?.length > 0) {
  //     ctx?.retireProfile?.attributes?.lifeExpectancies?.map((data) => {
  //       arrs.push(data.probability);
  //     });
  //   }
  //   return arrs;
  // };
  const spouseArray = () => {
    let arrs = [];
    if (ctx?.retireProfile?.attributes?.lifeExpectancies?.length > 0) {
      ctx?.retireProfile?.attributes?.lifeExpectancies?.map((data) => {
        data.spouse && arrs.push(data.spouse);
      });
    }
    return arrs;
  };
  // React.useEffect(() => {
  //   console.log(ctx.retireProfile?.attributes?.lifeExpectancies);
  // }, []);
  return (
    <MyGradientBackground>
      {/* <View
        style={{ marginTop: 15, alignItems: "flex-end", paddingHorizontal: 20 }}
      >
        <TouchableOpacity>
          <AntDesign name="closecircle" size={24} color="black" />
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          marginBottom: isfullScreen ? 40 : 20,
        }}
      >
        <TouchableOpacity onPress={closeCard}>
          <Text style={styles.cardName}>Life Expectancy</Text>
        </TouchableOpacity>
        {!isfullScreen ? (
          <TouchableOpacity onPress={handleToggleFullScreen}>
            <MaterialIcons
              name="fullscreen"
              size={40}
              color={myColorsLight.black}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleToggleFullScreen}>
            <AntDesign name="closecircle" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
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
                { fontSize: 25, textAlign: "center", fontWeight: "bold" },
              ]}
            >
              Life Expectancy
            </Text>
          </View>
        </View>
      </View>

      <View>
        <Text
          style={{
            ...styles.subHeader,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur{"\n"}
          adipiscing elit. Curabitur arcu erat{"\n"}
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            ...styles.subHeader,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur{"\n"}
          adipiscing elit. Curabitur arcu erat{"\n"}
        </Text>
        <View>
          <TouchableOpacity>
            <Entypo name="info-with-circle" size={14} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {ctx?.retireProfile?.attributes?.lifeExpectancies?.length > 0 ? (
          <>
            <LineChart
              data={{
                labels: ["95%", "50%", "5%"].reverse(),
                datasets: [
                  {
                    data: userArray(),
                    strokeWidth: 2,
                    color: (opacity = 1) => myColorsLight.grey1,
                  },
                  {
                    data: spouseArray(),
                    strokeWidth: 2,
                    color: (opacity = 1) => myColorsLight.grey7,
                  },
                  {
                    data: combinedArray(),
                    strokeWidth: 2,
                    color: (opacity = 1) => myColorsLight.grey3,
                  },
                  // {
                  //   data: probabilityArray(),
                  //   strokeWidth: 2,
                  //   color: (opacity = 1) => myColorsLight.grey2,
                  // },
                ],
              }}
              width={Dimensions.get("window").width - 30}
              height={400}
              fromZero={true}
              withDots={false}
              withShadow={false}
              withInnerLines={false}
              chartConfig={{
                backgroundGradientFrom: myColorsLight.white,
                backgroundGradientTo: myColorsLight.white,
                decimalPlaces: 0,
                color: (opacity = 1) => myColorsLight.grey1,
                style: {},
              }}
              style={{
                marginVertical: 40,
                borderRadius: 16,
              }}
            />
          </>
        ) : (
          <Text style={{ textAlign: "center", fontSize: 17 }}>No Record</Text>
        )}
        <View>
          <View style={{ display: "flex", marginTop: -15 }}>
            <Text style={{ marginTop: -55, marginLeft: 110 }}>You</Text>
            <View
              style={{
                backgroundColor: myColorsLight.grey1,
                opacity: 1,
                marginLeft: 90,
                height: 5,
                width: 15,
                marginTop: -10,
              }}
            ></View>
          </View>
          <View style={{ display: "flex", marginTop: -15 }}>
            <Text style={{ marginTop: -55, marginLeft: 170 }}>Spouse</Text>
            <View
              style={{
                backgroundColor: myColorsLight.grey7,
                opacity: 1,
                marginLeft: 150,
                height: 5,
                width: 15,
                marginTop: -10,
              }}
            ></View>
          </View>
          <View style={{ display: "flex", marginTop: -15 }}>
            <Text style={{ marginTop: -55, marginLeft: 250 }}>Combined</Text>
            <View
              style={{
                backgroundColor: "#858482",
                opacity: 1,
                marginLeft: 230,
                height: 5,
                width: 15,
                marginTop: -10,
              }}
            ></View>
          </View>
        </View>
      </ScrollView>
    </MyGradientBackground>
  );
};

const styles = StyleSheet.create({
  hrView: {
    width: "100%",
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
  cardName: {
    fontSize: 18,
  },
  cardsContainer: {
    marginTop: 17,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default LifeExpectancy;
