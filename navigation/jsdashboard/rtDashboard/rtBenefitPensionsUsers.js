import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import JarvisLoader from "../../../components/JarvisLoader";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Modal, Portal, Button, Provider, Title } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { myColorsLight } from "../../../constant/colors";
import JarvisButton from "../../../components/JarvisButton";
import api from "../../../api";

const RtBenefitPensionUsers = ({
  name,
  budget,
  ctxData,
  ctx,
  user,
  showEditModal,
  retrieve_all_jars_Jar,
}) => {
  const [visible, setVisible] = React.useState(false);
  const [loading, setIsLoading] = React.useState(false);
  const [editPersonData, setEditPersoData] = React.useState({});
  const showModal = (data, id) => {
    setEditPersoData({ ...data, id: id });
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
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
          hideModal();
        })
        .catch((err) => {
          Alert.alert("Unable to add new personal pension");
          setIsLoading(false);
          hideModal();
          console.log("error occured", err);
        });
    }
  };
  return (
    <>
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

              marginBottom: 10,
            }}
          >
            <View style={styles.close}>
              <TouchableOpacity onPress={hideModal}>
                <AntDesign name="leftcircleo" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView>
            <View style={{ marginTop: 50, alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  flexWrap: "wrap",
                  width: 120,
                  marginRight: 3,
                  fontSize: 20,
                }}
              >
                Jar logo
              </Text>
            </View>
            {loading && <JarvisLoader />}
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text style={{ fontSize: 20, color: myColorsLight.black }}>
                Edit{" "}
                {user?.attributes?.isSpouse
                  ? ctxData?.included[0]?.spouseName
                  : `${
                      ctxData?.attributes?.fname
                    } ${ctxData?.attributes?.lname?.slice(0, 5)}..`}{" "}
                's{"\n"}
                Defined Benefit Pension
              </Text>
            </View>
            <TextInput
              value={editPersonData?.name}
              placeholder="Pension name"
              style={styles.input1}
              onChangeText={(text) =>
                setEditPersoData({ ...editPersonData, name: text })
              }
            />
            <View style={{ ...styles.hrView, marginTop: 10 }} />

            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                paddingHorizontal: 20,
                marginVertical: 35,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 17, color: myColorsLight.grey3 }}>
                Annual Income amount
              </Text>
              <TextInput
                keyboardType="numeric"
                value={editPersonData?.incomeAmount?.toString() || ""}
                placeholder="current value"
                style={styles.input}
                onChangeText={(text) =>
                  setEditPersoData({
                    ...editPersonData,
                    currentValue: text,
                    incomeAmount: text,
                  })
                }
              />
            </View>
            <View style={{ alignItems: "center", marginTop: 90 }}>
              <JarvisButton
                bgcolor={myColorsLight.black}
                play={() => {
                  updateFilledJars(editPersonData?.id);
                }}
                btn="Update Pension"
                w={200}
                disabled={loading}
              />
            </View>
          </ScrollView>
        </Modal>
      </Portal>
      <View style={styles.cardUsers}>
        <View style={styles.cardConteent}>
          <Text
            style={{
              fontWeight: "800",
              display: "flex",
              flexWrap: "wrap",
              width: 90,
              marginRight: 3,
            }}
          >
            {user?.attributes?.name?.slice(0, 19)}..
          </Text>
          <Text style={{ fontSize: 17, color: myColorsLight.grey3 }}>
            {user?.attributes?.isSpouse
              ? ctxData?.included[0]?.spouseName
              : `${
                  ctxData?.attributes?.fname
                } ${ctxData?.attributes?.lname?.slice(0, 5)}..`}
          </Text>
        </View>
        <View style={styles.cardConteent}>
          <Text style={{ fontWeight: "bold" }}>
            £{user?.attributes?.incomeAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Text>
          <TouchableOpacity
            onPress={() => showModal(user?.attributes, user.id)}
          >
            <MaterialCommunityIcons
              name="circle-edit-outline"
              size={27}
              color={myColorsLight.lightGreyDim}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  cardConteent: {
    flexDirection: "row",
    minWidth: 90,
    justifyContent: "space-between",
    alignItems: "center",
  },
  close: {
    // position: "absolute",
  },
  containerStyle: {
    height: "100%",
    padding: 20,
    width: "100%",

    paddingTop: 20,
    backgroundColor: "white",
    // marginHorizontal: 25,
    borderRadius: 10,
    justifyContent: "flex-start",
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
  input: {
    borderWidth: 2,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontWeight: "bold",
    width: 100,
    borderColor: myColorsLight.grey4,
  },
  input1: {
    borderWidth: 1.5,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontWeight: "bold",
    width: 200,
    borderColor: myColorsLight.grey4,
    marginLeft: 50,
    marginTop: 50,
  },
});
export default RtBenefitPensionUsers;
