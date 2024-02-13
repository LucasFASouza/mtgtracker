import React from "react";
import { StyleSheet } from "react-native";
import { Button as RNEButton } from "@rneui/themed";

const Button = ({ ...props }) => {
  return (
    <RNEButton
      color={"#fa5075"}
      buttonStyle={styles.buttonStyle}
      titleStyle={styles.titleStyle}
      {...props}
    />
  );
};

export default Button;

const styles = StyleSheet.create({
  titleStyle: { color: "white", fontSize: 17, fontWeight: "bold" },
  buttonStyle: {
    width: 130,
    height: 40,
    borderRadius: 8,
    marginBottom: 10,
  },
});
