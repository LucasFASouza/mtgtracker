import React from "react";
import { Header } from "@rneui/base";

import { AuthContext } from "../services/AuthContext";
import { Image } from "react-native";

const MainHeader = () => {
  const { logout } = React.useContext(AuthContext);

  return (
    <Header
      backgroundColor="#2A0D2E"
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
          style={{ width: 30, height: 30, marginTop: 8 }}
        />
      }
      rightComponent={{
        icon: "logout",
        color: "#fa5075",
        style: { marginTop: 8 },
        onPress: () => logout(),
      }}
      containerStyle={{ width: "100%", borderBottomColor: "#fa5075" }}
      placement="left"
    />
  );
};

export default MainHeader;
