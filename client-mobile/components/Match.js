import React from "react";

import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Icon, Dialog } from "@rneui/themed";

const Match = (matchData) => {
  const [result, setResult] = React.useState("");
  const [color, setColor] = React.useState("");

  const [status, setStatus] = React.useState("closed");

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
    if (status == "closed") {
      setStatus("open");
    } else {
      setStatus("closed");
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.matchContainer} onPress={toggleMatch}>
        <View style={styles.iconContainer}>
          <Icon type="ionicon" name="ellipse" size={8} color={color} />
        </View>
        <Text style={styles.deckName}>{match.your_deck.deck_name}</Text>
        <Text style={styles.result}>{result}</Text>
        <Text style={styles.deckName}>{match.opp_deck.deck_name}</Text>
        <View style={styles.iconContainer}>
          <Icon
            type="ionicon"
            name={status == "closed" ? "chevron-down" : "chevron-up"}
            size={18}
            color="#5F5F5F"
          />
        </View>
      </TouchableOpacity>

      {status === "open" && (
        <Dialog style={styles.detailsContainer}>
          <View style={styles.TopContainer}>
            <Text style={styles.deckName}>{match.your_deck.deck_name}</Text>
            <Text style={styles.result}>{result}</Text>
            <Text style={styles.deckName}>{match.opp_deck.deck_name}</Text>
          </View>
          <View style={styles.TopContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemLabel}>PLAY/DRAW</Text>
              <Text style={styles.itemValue}>
                {match.matches[0].started_play ? "Play" : "Draw"}
              </Text>
            </View>

            {match.notes && match.notes.length > 0 && (
              <View style={styles.itemContainer}>
                <Text style={styles.itemLabel}>NOTES</Text>
                <Text style={styles.itemValue}>{match.notes}</Text>
              </View>
            )}

            <View style={styles.itemContainer}>
              <Text style={styles.itemLabel}>TAGS</Text>

              <View style={styles.tagsWrapper}>
                {match.tags.map((tag) => (
                  <Text style={styles.tagItem} key={tag.id}>
                    {tag.tag}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <Text style={styles.itemLabel}>ACTIONS</Text>

            <View>
              <TouchableOpacity style={styles.actionButton}>
                <Icon
                  type="ionicon"
                  name="create-outline"
                  size={42}
                  color="#5F5F5F"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon
                  type="ionicon"
                  name="trash-outline"
                  size={42}
                  color="#5F5F5F"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Dialog>
      )}
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
  matchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: "8%",
  },
  deckName: {
    color: "white",
    width: "32%",
    fontWeight: "bold",
    textAlign: "center",
  },
  result: {
    color: "white",
    width: "20%",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    marginHorizontal: 12,
  },
  TopContainer: {
    width: "80%",
  },
  itemContainer: {
    marginTop: 16,
  },
  itemLabel: {
    color: "#5F5F5F",
    fontWeight: "bold",
  },
  itemValue: {
    color: "white",
  },
  itemContainer: {
    marginTop: 16,
  },
  itemContainer: {
    marginTop: 16,
  },
  tagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagItem: {
    color: "white",
    backgroundColor: "#5F5F5F",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 14,
    margin: 2,
  },
  actionsContainer: {
    marginTop: 16,
    alignContent: "flex-end",
  },
  actionButton: {
    marginVertical: 12,
  },
});

export default Match;
