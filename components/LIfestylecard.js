import React, { useContext } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { Modal, Portal, Button, Provider, Title } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import BudgetModal from "./BudgetModal";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { myColorsLight ,primary} from "../constant/colors";
import UserContext from "../contexts/UserContext";
import BudgetModalCustom from "./BudgetModalCustome.";

const LIfestylecard = ({
  children,
  onPress,
  title,
  amount,
  Icon,
  lifestyleData,
  setLifeStyleData,
}) => {
  const ctx = useContext(UserContext);
  const [visible, setVisible] = React.useState(false);
  const [focused, setFocused] = React.useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const listSelectedName = (name) => {
    if (ctx.budgetData) {
      let value = null;
      // console.log(ctx.budgetData);
      ctx.budgetData?.map((items) => {
        if (items.attributes.name === name) {
          value = items;
        }
      });
      return value;
    }
  };

  const updateLifeStyleData = (newvalue) => {
    setLifeStyleData({ ...lifestyleData, [title]: newvalue });
    hideModal();
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
              <BudgetModal
                {...{ focused, setFocused, amount }}
                updateLifeStyleData={updateLifeStyleData}
                budgetData={listSelectedName(title)?.attributes.minimum}
                _next={() => {}}
                type="Mimimum"
              />
              <BudgetModal
                updateLifeStyleData={updateLifeStyleData}
                budgetData={listSelectedName(title)?.attributes?.moderate}
                _next={() => {}}
                {...{ focused, setFocused, amount }}
                type="Moderate"
              />
              <BudgetModal
                updateLifeStyleData={updateLifeStyleData}
                budgetData={listSelectedName(title)?.attributes.comfortable}
                _next={() => {}}
                type="Comfortable"
                {...{ focused, setFocused, amount }}
              />
              <BudgetModalCustom
                updateLifeStyleData={updateLifeStyleData}
                _next={() => {}}
                minimal={listSelectedName(title)?.attributes.minimum}
                moderate={listSelectedName(title)?.attributes?.moderate}
                comfortable={listSelectedName(title)?.attributes.comfortable}
                type="Custom Budget"
                {...{ focused, setFocused, amount }}
              />
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
              color={myColorsLight.lightGreyDim}
            />
          </View>
          {children}
          <View style={{ marginTop: "auto" }}>
            <Text style={{ ...styles.cardTitle }}>{title}</Text>
            <Text style={{ ...styles.cardTitle, fontSize: 17 }}>
              £{!isNaN(amount) ? Math.ceil(parseInt(amount) / 12) : 0}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  card1: {
    width: Platform.OS === "web" ? 150 : Dimensions.get("window").width / 3.5,
    aspectRatio: 0.8,
    margin: 4,
    elevation: 8,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderWidth: Platform.OS === "ios" ? 0.3 : 0,
    borderRadius: 7,
    alignItems: "center",
    padding: 10,
    paddingTop: "24%",
    position: "relative",
    backgroundColor:primary.subBase
  },
  containerStyle: {
    height: "90%",
    padding: 20,
    paddingTop: 20,
    backgroundColor: primary.subBase,
    marginHorizontal: 25,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  cardTitle: {
    fontSize: 17,
    textAlign: "center",
    lineHeight:20
  },
  textWhite: {
    color: "#fff",
  },
  edit: {
    position: "absolute",
    right: 5,
    top: 7,
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
