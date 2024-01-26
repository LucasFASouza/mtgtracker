import { StyleSheet, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";

const Select = ({...props}) => {

  return (
    <View style={styles.container}>
      <MultiSelect
        containerStyle={styles.containerStyle}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        selectedStyle={styles.selectedStyle}
        itemTextStyle={styles.itemTextStyle}
        activeColor="#5F5F5F"
        search
        labelField="label"
        valueField="value"
        searchPlaceholder="Search..."
        {...props}
      />
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  dropdown: {
    height: 40,
    backgroundColor: "#333",
    borderBottomColor: "#5F5F5F",
    borderRadius: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 12,
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
    borderEndWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
    backgroundColor: "#333",
    borderRadius: 8,
    borderWidth: 0,
  },
  containerStyle: {
    backgroundColor: "#333",
    borderWidth: 0,
    borderRadius: 8,
  },
  itemTextStyle: {
    color: "white"
  }
});
