import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import PersoanalPensionModal from "../../../components/rtPersonalPensionModal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Modal, Portal, Button, Provider, Title } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { myColorsLight } from "../../../constant/colors";
import JarvisButton from "../../../components/JarvisButton";

const RtPersonlaUsers = ({ name, budget }) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
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
            Lorem ips
          </Text>
          <Text style={{ fontSize: 17, color: myColorsLight.grey3 }}>
            {name}
          </Text>
        </View>
        <View style={styles.cardConteent}>
          <Text style={{ fontWeight: "bold" }}>{budget}</Text>
          <TouchableOpacity onPress={showModal}>
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
    height: 70,
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
});
export default RtPersonlaUsers;
