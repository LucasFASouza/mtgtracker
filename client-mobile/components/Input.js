import React from 'react';
import { Input as RNEInput } from "@rneui/themed";

const Input = ({ ...props }) => {
    return (
      <RNEInput
        inputStyle={{ color: "#FFF" }}
        labelStyle={{ color: "#FFF", margin: 5 }}
        inputContainerStyle={{
          borderBottomWidth: 0,
          backgroundColor: "rgba(255, 120, 200, 0.1)",
          paddingHorizontal: 8,
          borderRadius: 8,
        }}
        containerStyle={{ height: 90 }}
        errorStyle={{ marginVertical: 0 }}
        {...props}
      />
    );
};

export default Input;
