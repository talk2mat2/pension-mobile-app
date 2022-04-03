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
import { RadioButton} from "react-native-paper";
// import { MaterialIcons } from "@expo/vector-icons";
// import PersoanalPensionModal from "../../../components/rtPersonalPensionModal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Modal, Portal, Button, Provider, Title } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { myColorsLight } from "../../../constant/colors";
import JarvisButton from "../../../components/JarvisButton";

const RtOtherIncomeUsers = ({ 
  
  name, budget }) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
               {name}
              </Text>
            </View>
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text style={{ fontSize: 30, color: myColorsLight.black }}>
                Edit Retirement Income
              </Text>
            </View>
            <View style={{ ...styles.hrView, marginTop: 50 }} />

            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                paddingHorizontal: 20,
                marginVertical: 20,
                alignItems:"center"
              }}
            >
              <Text style={{ fontSize: 17, color: myColorsLight.grey3 }}>
                Enter the total value of any other income you may have available to add to your pension when you retire
              </Text>
            
            </View>
            <View style={{ ...styles.hrView }} />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                paddingHorizontal: 20,
                marginVertical: 20,
                alignItems:"center"
              }}
            >
              <Text style={{ fontSize: 17, color: myColorsLight.grey3 }}>
               Expected Annual Income
              </Text>
              <TextInput placeholder="15000" style={styles.input} />
            </View>
            <View style={{ ...styles.hrView }} />
           
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                paddingHorizontal: 20,
                marginVertical: 20,
                alignItems:"center"
              }}
            >
              <Text style={{ fontSize: 17, color: myColorsLight.grey3 }}>
               Expected Income start date
              </Text>
             
            </View>
            

            <View style={{ alignItems: "center", marginTop: 180 }}>
              <JarvisButton
                bgcolor={myColorsLight.black}
                play={() => {}}
                btn="Update Income"
                w={200}
                disabled={false}
              />
            </View>
          </ScrollView>
        </Modal>
      </Portal>
      <View style={styles.cardUsers}>
        <View style={styles.cardConteent}>
          <Text style={{ fontWeight: "bold" }}>{budget}</Text>
          <TouchableOpacity onPress={showModal}>
            <MaterialCommunityIcons
              name="circle-edit-outline"
              size={40}
              color={myColorsLight.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardUsers: {
    height: 70,
    flexDirection: "row",
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
    marginRight:110,
    marginTop:20
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
export default RtOtherIncomeUsers;