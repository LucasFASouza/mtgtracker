import React from 'react';
import { Button as RNEButton } from "@rneui/themed";

const Input = ({ ...props }) => {
    return (
      <RNEButton
          color={"#fa5075"}
          buttonStyle={{
            width: 180,
            height: 50,
            borderRadius: 7,
            marginBottom: 10,
          }}
          titleStyle={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
          {...props}
        />
    );
};

export default Input;
