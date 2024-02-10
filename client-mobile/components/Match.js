import React from "react";

import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Icon, Dialog, Divider } from "@rneui/themed";

import Button from "../components/atoms/Button";

const RESULT_DICT = {
  W: "Win",
  L: "Loss",
  D: "Draw",
};

const Match = (matchData) => {
  const [result, setResult] = React.useState("");
  const [hasNotes, setHasNotes] = React.useState(false);

  const [toggle, setToggle] = React.useState(false);
  const [toggleDelete, setToggleDelete] = React.useState(false);

  const match = matchData.match;
  const date = matchData.date;

  const onDelete = matchData.onDelete;

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

    if (match.notes !== "") {
      setHasNotes(true);
    }
  }, []);

  function toggleMatch() {
    setToggle(!toggle);
  }

  function deleteMatch() {
    setToggleDelete(true);
  }

  function confirmDelete() {
    setToggleDelete(false);
    setToggle(false);

    onDelete(match.id);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={toggleMatch}>
        <View style={styles.touchableIcon}>
          {hasNotes && (
            <Icon
              type="ionicon"
              name="chatbox-ellipses-outline"
              size={18}
              color="#5F5F5F"
            />
          )}
        </View>
        <Text style={styles.touchableDeck}>{match.your_deck.deck_name}</Text>
        <Text style={styles.touchableResult}>{result}</Text>
        <Text style={styles.touchableDeck}>{match.opp_deck.deck_name}</Text>
        <View style={styles.touchableIcon}>
          <Icon type="ionicon" name="chevron-down" size={18} color="#5F5F5F" />
        </View>
      </TouchableOpacity>

      {/* Details Dialog */}
      <Dialog
        isVisible={toggle}
        onBackdropPress={toggleMatch}
        overlayStyle={styles.dialog}
      >
        <View>
          <TouchableOpacity onPress={toggleMatch}>
            <Icon
              type="ionicon"
              name="close-outline"
              size={24}
              color="white"
              style={{ alignSelf: "flex-end" }}
              onPress={toggleMatch}
            />
          </TouchableOpacity>

          {/* Match info */}
          <View style={styles.dialogRow}>
            <View>
              <Text style={styles.dialogTitle}>YOUR DECK</Text>
              <Text style={styles.dialogValue}>
                {match.your_deck.deck_name}
              </Text>
            </View>

            <View style={styles.sectionRight}>
              <Text style={styles.dialogTitle}>OPPONENT'S DECK</Text>
              <Text style={styles.dialogValue}>{match.opp_deck.deck_name}</Text>
            </View>
          </View>

          <View style={styles.dialogRow}>
            <View>
              <Text style={styles.dialogTitle}>DATE</Text>
              <Text style={styles.dialogValue}>{date}</Text>
            </View>

            <View style={styles.sectionRight}>
              <Text style={styles.dialogTitle}>FINAL RESULT</Text>
              <Text style={styles.dialogValue}>{result}</Text>
            </View>
          </View>

          {/* Individual games info */}
          <Divider style={styles.dialogDivider} />
          {match.matches.map((game, index) => {
            return (
              <View key={index}>
                <View style={styles.dialogRow}>
                  <View style={styles.dialogMatchSection}>
                    <Text style={styles.dialogTitle}>MULLIGANS</Text>
                    <Text style={styles.dialogValue}>{game.mulligans}</Text>
                  </View>
                  <View
                    style={[
                      styles.dialogMatchSection,
                      { alignItems: "center" },
                    ]}
                  >
                    <Text style={styles.dialogTitle}>RESULT</Text>
                    <Text style={styles.dialogValue}>
                      {RESULT_DICT[game.result]}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.dialogMatchSection,
                      { alignItems: "flex-end" },
                    ]}
                  >
                    <Text style={styles.dialogTitle}>STARTED IN</Text>
                    <Text style={styles.dialogValue}>
                      {game.started_play === true ? "Play" : "Draw"}
                    </Text>
                  </View>
                </View>
                <Divider />
              </View>
            );
          }, [])}
        </View>

        {/* Match notes and tags */}
        {hasNotes && (
          <View style={styles.dialogRow}>
            <View style={styles.dialogDivider}>
              <Text style={styles.dialogTitle}>NOTES</Text>
              <Text style={styles.dialogNotes}>{match.notes}</Text>
            </View>
          </View>
        )}

        {match.tags.length > 0 && (
          <View style={styles.dialogRow}>
            <View style={styles.dialogDivider}>
              <Text style={styles.dialogTitle}>TAGS</Text>
              <View style={styles.dialogTags}>
                {match.tags.map((tag, index) => {
                  return (
                    <Text key={index} style={styles.dialogTag}>
                      {tag.tag}
                    </Text>
                  );
                }, [])}
              </View>
            </View>
          </View>
        )}

        {/* Buttons */}
        <View style={{ alignItems: "center" }}>
          <Button
            title="Delete"
            onPress={deleteMatch}
            buttonStyle={{
              width: 130,
              height: 40,
              borderRadius: 8,
              marginVertical: 16,
            }}
            titleStyle={{
              color: "white",
              fontSize: 17,
              fontWeight: "bold",
            }}
          />
        </View>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        isVisible={toggleDelete}
        onBackdropPress={() => setToggleDelete(false)}
        overlayStyle={[
          styles.dialog,
          { height: 190, minHeight: 100, width: "80%", paddingHorizontal: 8 },
        ]}
      >
        <View
          style={{ alignItems: "center", width: "100%", paddingVertical: 14 }}
        >
          <Text style={[styles.dialogValue, { textAlign: "center" }]}>
            Are you sure you want to delete this match?
          </Text>
        </View>

        <View style={styles.dialogRow}>
          <Button
            title="Cancel"
            onPress={() => {
              setToggleDelete(false);
            }}
            buttonStyle={{
              width: 130,
              height: 40,
              borderRadius: 8,
              marginVertical: 10,
            }}
            titleStyle={{
              color: "white",
              fontSize: 17,
              fontWeight: "bold",
            }}
            color={"#5F5F5F"}
          />
          <Button
            title="Yes, Delete"
            onPress={confirmDelete}
            buttonStyle={{
              width: 130,
              height: 40,
              borderRadius: 8,
              marginVertical: 10,
            }}
            titleStyle={{
              color: "white",
              fontSize: 17,
              fontWeight: "bold",
            }}
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
  dialog: {
    borderRadius: 16,
    borderWidth: 0,
    backgroundColor: "#282828",
    borderColor: "#5F5F5F",
    paddingHorizontal: 16,
    minHeight: 200,
    width: "90%",
  },
  dialogRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    width: "100%",
  },
  sectionRight: {
    alignItems: "flex-end",
  },
  dialogTitle: {
    color: "#5F5F5F",
    fontSize: 14,
    fontWeight: "bold",
  },
  dialogValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  dialogDivider: {
    marginTop: 6,
  },
  dialogMatchSection: {
    width: "33%",
  },
  dialogNotes: {
    color: "white",
    fontSize: 14,
  },
  dialogTags: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dialogTag: {
    color: "white",
    fontSize: 14,
    marginRight: 8,
    marginBottom: 8,
    padding: 4,
    borderRadius: 6,
    backgroundColor: "#5F5F5F",
  },
});

export default Match;
