import React from "react";
import { StyleSheet } from "react-native";
import { Input as RNEInput } from "@rneui/themed";

const Input = ({ ...props }) => {
  return (
    <RNEInput
      inputStyle={styles.inputStyle}
      labelStyle={styles.labelStyle}
      inputContainerStyle={styles.inputContainerStyle}
      containerStyle={styles.containerStyle}
      errorStyle={styles.errorStyle}
      {...props}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  inputStyle: { color: "white" },
  labelStyle: { color: "white", margin: 5 },
  inputContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: "#333333",
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  containerStyle: { height: 90 },
  errorStyle: { marginVertical: 0, color: "#FA5075" },
});
