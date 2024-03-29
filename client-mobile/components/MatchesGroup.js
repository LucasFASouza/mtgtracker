import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import Match from "./Match";

const MatchesGroup = (matches) => {
  const [date, setDate] = React.useState("");
  const matchesList = matches.matches;
  const onDelete = matches.onDelete;

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
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{date}</Text>
      <View style={styles.matchesContainer}>
        {matchesList.map((match) => {
          return <Match key={match.id} match={match} date={date} onDelete={onDelete} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  dateText: {
    color: "#5F5F5F",
    fontSize: 16,
    fontWeight: "bold",
  },
  matchesContainer: {
    marginVertical: 12,
    borderColor: "#5F5F5F",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});

export default MatchesGroup;
