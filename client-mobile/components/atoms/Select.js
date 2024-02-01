import { StyleSheet, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

const Select = ({ ...props }) => {

  const styles = StyleSheet.create({
    style: {
      marginVertical: 16,
      height: 40,
      borderColor: "#5F5F5F",
      borderWidth: 1,
      borderRadius: 8,
      alignContent: "center",
    },
    placeholderStyle: {
      fontSize: 16,
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
      borderRadius: 8,
    },
    itemTextStyle: {
      color: "white",
    },
    containerStyle: {
      backgroundColor: "#333",
      borderWidth: 0,
      borderRadius: 8,
    },
  });

  return (
    <MultiSelect
      style={styles.style}
      placeholderStyle={styles.placeholderStyle}
      containerStyle={styles.containerStyle}
      inputSearchStyle={styles.inputSearchStyle}
      selectedStyle={styles.selectedStyle}
      selectedTextStyle={styles.itemTextStyle}
      itemTextStyle={styles.itemTextStyle}
      activeColor="#5F5F5F"
      search
      labelField="label"
      valueField="value"
      searchPlaceholder="Search..."
      {...props}
    />
  );
};

export default Select;
