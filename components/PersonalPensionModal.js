import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import {
  Modal,
  Portal,
  Button,
  Provider,
  Title,
  overlay,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import api from "../api";
import UserContext from "../contexts/UserContext";
import { MaterialIcons } from "@expo/vector-icons";
import JarvisButton from "./JarvisButton";
import { RadioButton, ProgressBar } from "react-native-paper";
import { myColorsLight } from "../constant/colors";
import JarvisLoader from "./JarvisLoader";
const PersoanalStatePensionModal = ({
  visible,
  setVisible,
  personData,
  showModal,
  changeStatePension,
  setPersoData,
  AddJar,
}) => {
  // const [visible, setVisible] = React.useState(false);

  const [spouseGender, setSpouseGender] = React.useState("Male");

  const ctx = useContext(UserContext);
  const [loading, setIsloading] = React.useState(false);
  const [providers, setProviders] = React.useState([]);

  const [search, setSearch] = React.useState([]);
  let u = ctx.u;
  const [providerNameValidation, setproviderNameValidation] =
    React.useState(false);
  const [providerName, setproviderName] = React.useState("");
  const _next = () => {
    if (!providerName) {
      setproviderNameValidation(true);
    } else if (!personData.currentValue) {
      return Alert.alert("Please provide current value");
    } else {
      changeStatePension(providerName);
      AddJar();
    }
  };
  const hideModal = () => setVisible(false);
  const get_all_Pension_Providers = async () => {
    setIsloading(true);
    await api
      .get_all_Pension_Providers(ctx?.atk)
      .then((res) => {
        setProviders(res?.data);
        setIsloading(false);
      })
      .catch((err) => {
        setIsloading(false);
      });
  };
  const handleSearchResult = async (search) => {
    setproviderName(search);
    setproviderNameValidation(false);
    if (!search) {
      return;
    }
    if (search?.length < 3) {
      return;
    }
    await api
      .search_all_Pension_Providers(ctx?.atk, search)
      .then((res) => {
        // console.log(res.data);
        // console.log(search);
        res.data && setSearch(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await api
      .search_all_Pension_Employers(ctx?.atk, search)
      .then((res) => {
        console.log(res.data);
        console.log(search);
        // res.data && setSearch(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (value) => {
    setproviderName(value);
    setproviderNameValidation(false);
    const results =
      providers.length > 0 &&
      providers.filter((item) =>
        String(item?.attributes.name).match(
          new RegExp("(\\w*" + value + "\\w*)", "gi")
        )
      );

    results && setSearch(results);
  };
  // React.useEffect(() => {
  //   get_all_Pension_Providers();
  // }, []);

  const mapResults = () => {
    return (
      search?.length > 0 &&
      search?.map((item, index) => (
        <View key={item?.id} style={{ marginVertical: 3 }}>
          <TouchableOpacity
            onPress={() => {
              setSearch([]);
              // console.log(item?.attributes?.externalIds[0]?.value)
              // setChoosenProvider(item);
              setPersoData({
                ...personData,
                provider: item?.attributes?.name,
                name: item?.attributes?.name,
                secclExternalProviderId:
                  item?.attributes?.secclExternalProviderId,
              });
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <MaterialCommunityIcons style={{marginTop:6}} name="safe" size={20} color={myColorsLight.black} />
              <Text
                style={{ fontWeight: "700", paddingVertical: 3 ,marginLeft:4}}
                key={index}
              >
                {item?.attributes?.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))
    );
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          <View style={styles.close}>
            <TouchableOpacity onPress={hideModal}>
              <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 20,
              marginLeft: 15,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Personal Pensions
          </Text>
        </View>
        <View style={{ ...styles.hrView, marginTop: 35 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginTop: 20,
            position: "relative",
          }}
        >
          <Text style={{ fontSize: 16 }}>
            Search for employers {"\n"}or pension providers…
          </Text>

          {personData?.provider ? (
            <TouchableOpacity
              onPress={() => setPersoData({ ...personData, provider: "" })}
            >
              <Text style={{ fontWeight: "700" }}>{personData.provider}</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TextInput
                // onChangeText={(text) => {
                //   handleSearch(text);
                // }}
                onChangeText={(text) => {
                  handleSearchResult(text);
                }}
                style={styles.input}
                value={providerName}
              />
              {(search?.length > 0 || providerName.length > 0) && (
                <View style={styles.searchDrop}>
                  <ScrollView>
                    <TouchableOpacity
                      onPress={() => {
                        setSearch([]);
                        setPersoData({
                          ...personData,
                          provider: providerName,
                          name: providerName,
                        });
                        // setChoosenProvider({
                        //   attributes: { name: providerName },
                        // });
                      }}
                    >
                      <Text style={{ fontWeight: "700", paddingVertical: 4 }}>
                        {providerName}
                      </Text>
                    </TouchableOpacity>
                    {mapResults()}
                  </ScrollView>
                </View>
              )}
            </>
          )}
        </View>
        {providerNameValidation && (
          <View style={styles.formGroupError}>
            <Text style={{ ...styles.inputError, marginTop: 4, fontSize: 12 }}>
              Please enter your provider name
            </Text>
          </View>
        )}
        {loading && (
          <View
            style={{
              position: "absolute",
              right: 0,
              left: 0,
              marginTop: "50%",
              zIndex: 7,
              elevation: 7,
            }}
          >
            <JarvisLoader />
          </View>
        )}
        <View style={{ ...styles.hrView, marginTop: 20 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>Current Value</Text>

          <TextInput
            keyboardType="numeric"
            style={{ ...styles.input, width: 100 }}
            value={personData.currentValue}
            onChangeText={(text) => {
              setPersoData({ ...personData, currentValue: text });
            }}
          />
        </View>
        {/* {providerNameValidation && (
          <View style={styles.formGroupError}>
            <Text style={{ ...styles.inputError, marginTop: 4, fontSize: 12 }}>
              Please enter your state pension amount
            </Text>
          </View>
        )} */}

        <View style={{ ...styles.hrView, marginTop: 20 }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>Regular{"\n"}Contributions</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.radioText]}>Yes</Text>
            <RadioButton
              value="Male"
              status={
                personData.regularContribution === "yes"
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => {
                setPersoData({ ...personData, regularContribution: "yes" });
              }}
            />
            <Text style={[styles.radioText, { marginLeft: 20 }]}>No</Text>
            <RadioButton
              value="Female"
              status={
                personData.regularContribution === "no"
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => {
                setPersoData({ ...personData, regularContribution: "no" });
              }}
            />
          </View>
        </View>
        <View style={{ ...styles.hrView, marginTop: 20 }} />
        {personData?.regularContribution !== "no" && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>Contribution Tax{"\n"} Basis</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.radioText]}>Net</Text>
                <RadioButton
                  value="net"
                  status={
                    personData.contributeBasics === "net"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    setPersoData({
                      ...personData,
                      contributeBasics: "net",
                      regContributionTaxBasis: "net",
                    });
                  }}
                />
                <Text style={[styles.radioText, { marginLeft: 20 }]}>
                  Gross
                </Text>
                <RadioButton
                  value="Female"
                  status={
                    personData.contributeBasics === "gross"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    setPersoData({
                      ...personData,
                      contributeBasics: "gross",
                      regContributionTaxBasis: "gross",
                    });
                  }}
                />
              </View>
            </View>
            <View style={{ ...styles.hrView, marginTop: 20 }} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>Monthly Contribution</Text>

              <TextInput
                keyboardType="numeric"
                value={personData.monthlyContribution}
                onChangeText={(text) => {
                  setPersoData({
                    ...personData,
                    monthlyContribution: text,
                    regContributionAmount: text,
                  });
                }}
                style={{ ...styles.input, width: 100 }}
              />
            </View>
          </>
        )}

        <View style={{ ...styles.hrView }} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>Spouse Pensio ?</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.radioText]}>Yes</Text>
            <RadioButton
              value="yes"
              status={
                personData.spousePension === "yes" ? "checked" : "unchecked"
              }
              onPress={() => {
                setPersoData({
                  ...personData,
                  spousePension: "yes",
                  isSpouse: true,
                });
              }}
            />
            <Text style={[styles.radioText, { marginLeft: 20 }]}>No</Text>
            <RadioButton
              value="no"
              status={
                personData.spousePension === "no" ? "checked" : "unchecked"
              }
              onPress={() => {
                setPersoData({
                  ...personData,
                  spousePension: "no",
                  isSpouse: false,
                });
              }}
            />
          </View>
        </View>
        <View style={{ ...styles.hrView, marginTop: 25 }} />
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <JarvisButton
            bgcolor={myColorsLight.black}
            play={_next}
            btn="Continue"
            w={200}
          />
        </View>
        {/* <ScrollView></ScrollView> */}
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    height: "90%",
    padding: 20,
    paddingTop: 20,
    backgroundColor: "white",
    marginHorizontal: 25,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  subText: {
    fontSize: 14,
    textAlign: "center",
  },
  close: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  radioText: {
    paddingVertical: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  inputError: {
    color: "red",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 0.3,
    padding: 8,
    width: 140,
  },
  hrView: {
    width: "100%",

    height: 2,
    backgroundColor: "#bbb",
  },
  searchDrop: {
    maxHeight: 300,
    position: "absolute",
    right: 0,
    width: 180,
    backgroundColor: myColorsLight.white,
    zIndex: 5,
    elevation: 5,
    top: 50,
    overflow: "scroll",
    padding: 10,
  },
});
export default PersoanalStatePensionModal;
