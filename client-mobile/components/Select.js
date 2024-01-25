import { Icon } from "@rneui/themed";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";

const Select = ({ ...props }) => {
  return (
    <SelectDropdown
      renderDropdownIcon={() => (
        <Icon type="ionicon" name="chevron-down" size={18} color="white" />
      )}
      buttonStyle={{
        backgroundColor: "#333",
        borderRadius: 8,
      }}
      buttonTextStyle={{
        color: "white",
        fontSize: 16,
      }}
      dropdownStyle={{
        backgroundColor: "#282828",
        borderColor: "#333",
        borderRadius: 8,
      }}
      rowStyle={{
        backgroundColor: "#282828",
        borderColor: "#333",
      }}
      rowTextStyle={{
        color: "white",
        fontSize: 14,
        margin: 0,
      }}
      {...props}
    />
  );
};

export default Select;
