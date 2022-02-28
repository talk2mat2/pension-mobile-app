import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Modal, Portal, Button, Provider, Title } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import BudgetModal from "./BudgetModal";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LIfestylecard = ({ children, onPress, title, amount, Icon }) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

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
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <View style={styles.close}>
              <TouchableOpacity onPress={hideModal}>
                <MaterialIcons name="cancel" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <AntDesign name={Icon} size={50} color="black" />
            <Text style={{ fontSize: 20, marginLeft: 15, fontWeight: "bold" }}>
              {title}
            </Text>
          </View>
          <Text style={styles.subText}>
            Select the budget level that{"\n"} matches the lifestyle you want{" "}
            {"\n"}
            live when you’re retired.
          </Text>
          <ScrollView>
            <View style={{ marginTop: 50 }}>
              <BudgetModal _next={() => {}} type="Mimimum" />
              <BudgetModal _next={() => {}} type="Moderate" />
              <BudgetModal _next={() => {}} type="Comfortable" />
              <BudgetModal _next={() => {}} type="Custom Budget" />
            </View>
          </ScrollView>
        </Modal>
      </Portal>

      <TouchableOpacity onPress={showModal}>
        <View style={styles.card1}>
          <View style={styles.edit}>
            <MaterialCommunityIcons
              name="circle-edit-outline"
              size={24}
              style={styles.textWhite}
              
            />
          </View>
          {children}
          <View style={{ marginTop: "auto" }}>
            <Text style={{ ...styles.cardTitle, ...styles.textWhite }}>
              {title}
            </Text>
            <Text
              style={{ ...styles.cardTitle, ...styles.textWhite, fontSize: 17 }}
            >
              {amount}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  card1: {
    width: Dimensions.get("window").width / 3.5,
    aspectRatio: 0.8,
    margin: 4,
    elevation: 8,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 7,
    alignItems: "center",
    padding: 10,
    paddingTop: "30%",
    position:'relative'
  },
  containerStyle: {
    height: "90%",
    padding: 20,
    paddingTop: 20,
    backgroundColor: "white",
    marginHorizontal: 25,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  cardTitle: {
    fontSize: 17,
    textAlign: "center",
  },
  textWhite: {
    color: "#fff",
  },
  edit: {
    position: "absolute",
    right: 15,
    top: 15,
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
});

export default LIfestylecard;
