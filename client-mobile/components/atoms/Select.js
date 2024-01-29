import { StyleSheet, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

const Select = ({ placeholder, ...props }) => {
  const placeholderLength = placeholder.length;
  const width = placeholderLength * 7 + 40;

  const styles = StyleSheet.create({
    style: {
      margin: 8,
      height: 40,
      borderColor: "#5F5F5F",
      borderWidth: 1,
      borderRadius: 8,
      alignContent: "center",
      width: width,
    },
    placeholderStyle: {
      fontSize: 14,
      color: "white",
      paddingLeft: 12,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color: "#5F5F5F",
      backgroundColor: "#333",
      borderColor: "#5F5F5F",
      borderRadius: 8,
      borderEndWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
    },
    selectedStyle: {
      display: "none",
    },
    itemTextStyle: {
      color: "white",
    },
    containerStyle: {
      backgroundColor: "#333",
      borderWidth: 0,
      borderRadius: 8,
      width: 200,
    },
  });

  return (
    <MultiSelect
      style={styles.style}
      placeholderStyle={styles.placeholderStyle}
      containerStyle={styles.containerStyle}
      inputSearchStyle={styles.inputSearchStyle}
      selectedStyle={styles.selectedStyle}
      itemTextStyle={styles.itemTextStyle}
      activeColor="#5F5F5F"
      search
      labelField="label"
      valueField="value"
      searchPlaceholder="Search..."
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Select;
