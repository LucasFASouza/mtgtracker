import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

const Select = ({...props}) => {
  const [selected, setSelected] = useState([]);

  return (
    <View>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemContainerStyle={styles.itemContainerStyle}
        search
        labelField="label"
        valueField="value"
        placeholder="Your deck"
        searchPlaceholder="Search..."
        value={selected}
        onChange={(item) => {
          setSelected(item);
        }}
        selectedStyle={styles.selectedStyle}
        {...props}
      />
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: "#333",
    borderBottomColor: "#5F5F5F",
    borderBottomWidth: 0.5,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
    paddingLeft: 8,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "#5F5F5F",
    backgroundColor: "#333",
    borderColor: "#5F5F5F",
    borderRadius: 8,
    borderWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  itemContainerStyle: {
    backgroundColor: "#333",
  },
  itemTextStyle: {
    color: "white",
  },
  selectedStyle: {
    backgroundColor: "#5F5F5F",
  },
});
