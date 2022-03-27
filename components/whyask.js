import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { myColorsLight } from "../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Modal,
  Portal,
  Button,
  Provider,
  Title,
  Chip,
} from "react-native-paper";
const WhyAsk = ({ reasons }) => {
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
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <View style={{ width: "100%", alignItems: "flex-end" }}>
              <View style={styles.close}>
                <TouchableOpacity onPress={hideModal}>
                  <MaterialIcons
                    name="cancel"
                    size={24}
                    color={myColorsLight.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <ScrollView>
            <View
              style={[
                styles.centerView,
                {
                  marginTop: 2,

                  backgroundColor: myColorsLight.white,
                  padding: 2,
                  paddingBottom: 20,
                },
              ]}
            >
              <Text style={{}}>
                {reasons ||
                  "This information will enable us to plan your retirement planning and goals more accurately"}
              </Text>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
      <View style={{ ...styles.centerView, marginTop: 10, marginBottom: 30 }}>
        <Chip icon="information" onPress={showModal}>
          Why are we asking you this?
        </Chip>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: '#fff',
    alignItems: "center",
    // marginTop: 30,
    //justifyContent: 'center',
  },
  centerView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  loginButton: {
    alignItems: "center",
    marginTop: 50,
    marginLeft: 20,
  },
  imageBackground: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
    //width: "100%"
  },
  subHeader: {
    fontSize: 20,
    alignSelf: "center",
  },
  textWhite: {
    color: "#fff",
  },
  formGroup: {
    width: "90%",
    textAlign: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
  },

  formGroupError: {
    marginTop: 5,
  },
  formInput: {
    padding: 5,
  },
  close: {
    zIndex: 9,
    elevation: 3,
  },
  containerStyle: {
    backgroundColor: myColorsLight.white,
    padding: 2,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  inputError: {
    color: "red",
    fontWeight: "bold",
  },
});
export default WhyAsk;
