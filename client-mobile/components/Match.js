import React from "react";

import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Icon, Dialog, Divider } from "@rneui/themed";

const Match = (matchData) => {
  const [result, setResult] = React.useState("");
  const [color, setColor] = React.useState("");

  const [toggle, setToggle] = React.useState(false);

  const match = matchData.match;

  React.useEffect(() => {
    let games = match.matches;
    let results = games.map((game) => game.result);

    let wins = 0;
    let losses = 0;

    results.forEach((result) => {
      if (result === "W") {
        wins += 1;
      } else if (result === "L") {
        losses += 1;
      }
    });

    setResult(wins + "-" + losses);
    setColor(wins > losses ? "#50FAA8" : wins < losses ? "#FA5075" : "#5F5F5F");
  }, []);

  function toggleMatch() {
    console.log("toggling");
    setToggle(!toggle);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={toggleMatch}>
        <View style={styles.touchableIcon}>
          <Icon type="ionicon" name="ellipse" size={8} color={color} />
        </View>
        <Text style={styles.touchableDeck}>{match.your_deck.deck_name}</Text>
        <Text style={styles.touchableResult}>{result}</Text>
        <Text style={styles.touchableDeck}>{match.opp_deck.deck_name}</Text>
        <View style={styles.touchableIcon}>
          <Icon type="ionicon" name="chevron-down" size={18} color="#5F5F5F" />
        </View>
      </TouchableOpacity>

      <Dialog
        isVisible={toggle}
        onBackdropPress={() => toggleMatch(!toggle)}
        overlayStyle={{
          borderRadius: 16,
          borderWidth: 1,
          backgroundColor: "#282828",
          borderColor: "#5F5F5F",
          paddingHorizontal: 16,
          minHeight: 200,
          width: "90%",
        }}
      >
        <View>
          <Icon
            type="ionicon"
            name="close-outline"
            size={24}
            color="white"
            style={{ alignSelf: "flex-end" }}
            onPress={toggleMatch}
          />
        </View>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderColor: "#5F5F5F",
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  touchableIcon: {
    width: "8%",
  },
  touchableDeck: {
    color: "white",
    width: "32%",
    fontWeight: "bold",
    textAlign: "center",
  },
  touchableResult: {
    color: "white",
    width: "20%",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
});

export default Match;
