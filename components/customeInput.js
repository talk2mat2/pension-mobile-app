import React from "react";
import { TextInput } from "react-native-paper";
import { primary } from "../constant/colors";

const CustomeInput = (props) => {
  return (
    <TextInput
      Type="flat"
      {...props}
      style={{
        backgroundColor: primary.subBase,
        ...props.style,
        borderRadius: 10,
        flex: 1,
        height: 40,
        paddingBottom: 6,
        fontSize:18,
        color:primary.inputText
      }}
    />
  );
};

export default CustomeInput;
