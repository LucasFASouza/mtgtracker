import React from "react";
import { Header } from "@rneui/base";

import { AuthContext } from "../services/AuthContext";
import { Image } from "react-native";

const MainHeader = () => {
  const { logout } = React.useContext(AuthContext);

  return (
    <Header
      backgroundColor="#282828"
      barStyle="default"
      centerComponent={{
        text: "mtgtracker",
        style: {
          color: "#fa5075",
          fontSize: 28,
          fontWeight: "bold",
        },
      }}
      leftComponent={
        <Image
          source={require("../assets/icon.png")}
          style={{ width: 33, height: 30, marginTop: 8 }}
        />
      }
      rightComponent={{
        icon: "logout",
        color: "#5F5F5F",
        style: { marginTop: 8 },
        onPress: () => logout(),
      }}
      containerStyle={{ width: "100%", borderBottomColor: "#282828" }}
      placement="left"
    />
  );
};

export default MainHeader;
