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
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import * as helpers from "../../Helpers";
import UserContext from "../../contexts/UserContext";
import api from "../../api";
import { useDispatch, useSelector } from "react-redux";
import JarvisButton from "../../components/JarvisButton";
import { List, ProgressBar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OtherSwipper from "../../components/OthehrSwipper";
import CPDatatable from "../../components/CPDatatable";
import { myColorsLight } from "../../constant/colors";
import { LinearGradient } from "expo-linear-gradient";
import jarslice, {
  cleanBenefitJars,
  cleanIncomePension,
  cleanProviderJars,
  cleanSavingPension,
  cleanSpousepension,
  cleanStatepension,
  updateIncomePension,
  updateSavingPension,
} from "../../redux/slices/jarslice";
import MyGradientBackground from "../../components/grdientBackGround";
import OtherpenContext from "../../contexts/otherPenContext";
import PanableCard from "../../components/pannableCard";
import { useCreateJarsMutation } from "../../redux/query";

function OtherPension({ navigation }) {
  const [startScroll, setStartScroll] = React.useState(false);
  const [iDontHhaveState, setIdontHaveState] = React.useState(null);
  const jarSlices = useSelector(({ jarSlice }) => jarSlice);
  const [createJars, result] = useCreateJarsMutation();
  const [person1, setPerson1Data] = React.useState({
    expectedAnualIncome: "",
    gender: "",
    expectedIncomeDate: "",
    spousePension: "no",
    isSpouse: false,
    name: "Retirement Savings",
    jarType: "asset",
    jarSubType: "other",
    currentValue: "",
  });
  const [person2, setPerson2Data] = React.useState({
    expectedAnualIncome: "",
    name: "Retirement Income",
    gender: "",
    expectedIncomeDate: "",
    spousePension: "no",
    isSpouse: false,
    jarType: "income",
    jarSubType: "other",
    currentValue: "",
    incomeAmount: "",
    incomeAmountStartDate: "",
  });
  const ctx = useContext(UserContext);
  const dispatch = useDispatch();

  const createOtherPensions = async () => {
    if (person1.currentValue) {
      dispatch(updateSavingPension(person1));
      await createJars({
        token: ctx?.atk,
        data: {
          type: "jar",
          attributes: { ...person1 },
        },
      })
        .unwrap()
        .then((fuilfiled) => {
          console.log("saving");
          dispatch(cleanSavingPension());
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (person2.currentValue) {
      dispatch(updateIncomePension(person2));
      await createJars({
        token: ctx?.atk,
        data: {
          type: "jar",
          attributes: { ...person2 },
        },
      })
        .unwrap()
        .then((fuilfiled) => {
          console.log("income");
          dispatch(cleanIncomePension());
        })
        .catch((err) => {});
    }
  };
  const setPerson1 = (data) => {
    helpers.save("person1", JSON.stringify(data));
    setPerson1Data(data);
  };
  const setPerson2 = (data) => {
    helpers.save("person2", JSON.stringify(data));
    setPerson2Data(data);
  };
  const createStatePensions = async (jars) => {
    const { statePension, spouseStatePension } = jarSlices;
    // console.log(statePension);
    if (statePension?.attributes?.incomeAmount) {
      await createJars({
        token: ctx?.atk,
        data: statePension,
      })
        .unwrap()
        .then((fuilfiled) => {
          // console.log("statecreate");
          dispatch(cleanStatepension());
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (spouseStatePension?.attributes?.incomeAmount) {
      await createJars({
        token: ctx?.atk,
        data: spouseStatePension,
      })
        .unwrap()
        .then((fuilfiled) => {
          // console.log("spouse");
          dispatch(cleanSpousepension());
        })
        .catch((err) => {});
    }
  };

  const createPersonalPensions = async () => {
    //iterate and make api call per jar
    const { providerJars } = jarSlices;
    const isExist = providerJars.filter(
      (item) => item.currentValue !== "" && item.currentValue !== ""
    );
    if (isExist.length > 0) {
      for (let i = 0; i < isExist.length; i++) {
        const jarData = {
          type: "jar",
          attributes: { ...isExist[i] },
        };
        await createJars({ token: ctx?.atk, data: jarData })
          .unwrap()
          .then((fuilfiled) => {
            // console.log("personal");
            dispatch(cleanProviderJars());
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  const createBenefitJarsPensions = async () => {
    //iterate and make api call per jar
    const { benefitJars } = jarSlices;
    const isExist = benefitJars.filter(
      (item) => item.currentValue !== "" && item.currentValue !== ""
    );
    if (isExist.length > 0) {
      for (let i = 0; i < isExist.length; i++) {
        const jarData = {
          type: "jar",
          attributes: { ...isExist[i] },
        };
        await createJars({ token: ctx?.atk, data: jarData })
          .unwrap()
          .then((fuilfiled) => {
            // console.log("benefit");
            dispatch(cleanBenefitJars());
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  React.useEffect(async () => {
    const persistDta1 = await helpers.getValueFor("person1");
    if (persistDta1) {
      setPerson1Data(JSON.parse(persistDta1));
    }
    const persistDta2 = await helpers.getValueFor("person2");
    if (persistDta2) {
      setPerson2Data(JSON.parse(persistDta2));
    }
  }, []);
  const _updateUser = () => {
    //Update the frontend: context and async storage
    let u = ctx?.u;
    u.included[0].onboardingCompleted == true;
    ctx.setU(u);
    helpers.save("pa_u", JSON.stringify(u));
  };
  const updateUsersMe = async () => {
    const usersAttrib = {
      firstName: ctx?.u?.attributes?.fname,
      lastName: ctx?.u?.attributes?.lname,
      title: ctx?.u?.attributes?.title,
      name: `${ctx?.u?.attributes?.fname} ${ctx?.u?.attributes?.lname}`,
    };

    const usersData = {
      data: {
        type: "user",
        attributes: {
          ...usersAttrib,
          onboardingCompleted: true,
        },
      },
    };
    await api
      .update_user_profile(usersData, ctx?.atk)
      .then((res) => {
        // console.log("user information updted", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const completeOnboarding = async () => {
    _updateUser();
    const newData = {
      data: {
        type: "retirementProfile",
        attributes: {
          onboardingCompleted: true,
        },
      },
    };
    await api
      .Update_retirement_profile(ctx?.retireProfile?.id, ctx?.atk, newData)
      .then((res) => {
        console.log("done", res);
        ctx.setRetireProfile(res?.data);
      })
      .catch((err) => {
        console.log("undone", err);
      });
  };

  const _next = () => {
    //sync users data
    Promise.resolve(createOtherPensions())
      .then(createStatePensions)
      .then(createPersonalPensions)
      .then(createBenefitJarsPensions)
      .then(() => {
        Promise.resolve(completeOnboarding())
          .then(updateUsersMe())
          .then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "CPCongrat" }],
            });
          });
      })
      .catch((err) => {
        Promise.resolve(completeOnboarding())
          .then(updateUsersMe())
          .then(() => {
            // navigation.navigate("CPCongrat");
            navigation.reset({
              index: 0,
              routes: [{ name: "CPCongrat" }],
            });
          });
      });
  };
  const _goBack = () => {
    navigation.goBack();
  };

  const handleTextbtn = () => {
    if (!person1.currentValue && !person2.currentValue) {
      return "Continue without other savings/income";
    }
    if (person1.currentValue && !person2.currentValue) {
      return "Continue with only savings";
    }
    if (!person1.currentValue && person2.currentValue) {
      return "Continue with only income";
    }
    if (person1.currentValue && person2.currentValue) {
      return "Continue";
    } else {
      return "Continue";
    }
  };

  return (
    <OtherpenContext.Provider
      value={{
        person1,
        setPerson1,
        setPerson2,
        person2,
        startScroll,
        setStartScroll,
      }}
    >
      <MyGradientBackground>
        <>
          <View
            style={{
              marginTop: 30,
              alignContent: "flex-start",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View style={{ position: "absolute", left: 10 }}>
              <Pressable onPress={_goBack}>
                <MaterialCommunityIcons
                  name="chevron-left-circle-outline"
                  color={myColorsLight.lightGreyDark}
                  size={40}
                />
              </Pressable>
            </View>

            <View>
              <View>
                <Text
                  style={[
                    styles.loginText,
                    ,
                    { fontSize: 20, textAlign: "center" },
                  ]}
                >
                  Step 4 of 4
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.loginText,
                    ,
                    { fontSize: 15, textAlign: "center", fontWeight: "bold" },
                  ]}
                >
                  Current Pensions & Savings
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              ...styles.hrView,
              width: "90%",
              alignSelf: "center",
              marginTop: 25,
            }}
          />
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                ...styles.subHeader,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Other Retirement {"\n"}Savings / Income
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
            <OtherSwipper />
          </View>
          <View style={{ marginTop: 7, alignItems: "center" }}>
            {iDontHhaveState === false ||
            person1.currentValue ||
            person2.currentValue ? (
              <JarvisButton
                bgcolor={myColorsLight.black}
                play={_next}
                btn={handleTextbtn()}
                w={200}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setStartScroll(true);
                  setIdontHaveState(false);
                }}
              >
                <View style={styles.btnIdont}>
                  <Text style={{ fontWeight: "900" }}>
                    I don’t have any other savings
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <PanableCard styles={{ height: "29%", marginTop: "auto" }}>
            <CPDatatable profile={ctx?.u} />
          </PanableCard>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 8,
              elevation: 8,
            }}
          >
            <View
              style={{
                marginTop: 30,
                width: "50%",
                alignSelf: "center",
                marginBottom: 20,
              }}
            >
              <ProgressBar
                progress={1}
                color={myColorsLight.lightGreyDark}
                style={{ height: 7 }}
              />
              <Text style={{ textAlign: "center", fontSize: 20 }}>4/4</Text>
            </View>
          </View>
        </>
      </MyGradientBackground>
    </OtherpenContext.Provider>
  );
}

const styles = StyleSheet.create({
  sum: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 10,
  },
  background: {
    height: 100,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",

    marginTop: 30,
    //justifyContent: 'center',
  },
  containerStyle: {
    height: "90%",
    width: "80%",
    padding: 20,
    paddingTop: 20,
    backgroundColor: "white",
    marginHorizontal: 25,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  footerContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // backgroundColor: "#f1f3f2",
    height: 200,
    marginTop: "auto",
    borderTopColor: myColorsLight.lightGreyDark,
    borderLeftColor: myColorsLight.lightGreyDark,
    borderRightColor: myColorsLight.lightGreyDark,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    paddingTop: 20,
    paddingHorizontal: 20,
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
  btnIdont: {
    padding: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: myColorsLight.lightGreyDark,
    backgroundColor: myColorsLight.lighterGrey,
    minWidth: 200,
    alignItems: "center",
    shadowRadius: 2,
    paddingHorizontal: 10,
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

export default OtherPension;
