import React from "react";
import { StyleSheet } from "react-native";
import { Button as RNEButton } from "@rneui/themed";

const Input = ({ ...props }) => {
  return (
    <RNEButton
      color={"#fa5075"}
      buttonStyle={styles.buttonStyle}
      titleStyle={styles.titleStyle}
      {...props}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  titleStyle: { color: "white", fontSize: 18, fontWeight: "bold" },
  buttonStyle: {
    width: 180,
    height: 50,
    borderRadius: 7,
    marginBottom: 10,
  },
});
