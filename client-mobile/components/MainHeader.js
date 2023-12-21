import React from "react";
import { Header } from "@rneui/base";

import { AuthContext } from "../services/AuthContext";

const MainHeader = () => {
  const { logout } = React.useContext(AuthContext);

  return (
    <Header
      backgroundColor="#55034B"
      barStyle="default"
      centerComponent={{
        text: "mtgtracker",
        style: {
          color: "#fa5075",
          fontSize: 28,
          fontWeight: "bold",
        },
      }}
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
}

export default MainHeader;
