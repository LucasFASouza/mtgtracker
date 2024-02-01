import React from "react";
import { StyleSheet } from "react-native";
import { Button as RNEButton } from "@rneui/themed";

const MiniButton = ({ title, ...props }) => {
  const titleLength = title.length;
  const width = titleLength * 7 + 45;

  const styles = StyleSheet.create({
    titleStyle: {
      color: "white",
      fontSize: 14,
      fontWeight: "normal",
      paddingHorizontal: 6,
    },
    buttonStyle: {
      width: width,
      height: 40,
      borderRadius: 7,
      marginBottom: 10,
      borderWidth: 0.5,
      borderColor: "#5F5F5F",
    },
  });

  return (
    <RNEButton
      color={"#282828"}
      buttonStyle={styles.buttonStyle}
      titleStyle={styles.titleStyle}
      title={title}
      icon={{
        name: "chevron-down",
        type: "ionicon",
        size: 15,
        color: "#5F5F5F",
      }}
      iconRight
      {...props}
    />
  );
};

export default MiniButton;
