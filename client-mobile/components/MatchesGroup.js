import React from "react";

import { View } from "react-native";
import { Text } from "@rneui/themed";

import Match from "./Match";

const MatchesGroup = (matches) => {
  const [date, setDate] = React.useState("");
  const matchesList = matches.matches;

  function getDate() {
    let date = new Date(matchesList[0].created_at);

    let today = new Date();
    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let month = date.toLocaleString("en-US", { month: "short" });
    let day = date.getDate();
    let year = date.getFullYear();

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    } else if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    }

    return `${day} ${month} ${year}`;
  }

  React.useEffect(() => {
    setDate(getDate());
  } , []);

  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 12,
      }}
    >
      <Text
        style={{
          color: "#5F5F5F",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {date}
      </Text>
      <View
        style={{
          marginVertical: 12,
          borderColor: "#5F5F5F",
          borderTopWidth: 1,
          borderBottomWidth: 1,
        }}
      >
        {matchesList.map((match) => {
          return <Match key={match.id} match={match} />;
        })}
      </View>
    </View>
  );
};

export default MatchesGroup;
