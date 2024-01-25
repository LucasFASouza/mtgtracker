import React from "react";

import { View, TouchableOpacity } from "react-native";
import { Text, Icon } from "@rneui/themed";

MOCK_DATA = {
  id: 7,
  tags: [
    {
      id: 2,
      tag: "Insomnia",
      user: 1,
    },
  ],
  your_deck: {
    id: 1,
    deck_name: "Mono U Terror",
    user: 1,
  },
  opp_deck: {
    id: 2,
    deck_name: "Kuldotha Burn",
    user: 1,
  },
  notes: "test 1",
  created_at: "2023-12-06T19:52:26.790161Z",
  matches: [
    {
      id: 4,
      result: "W",
      mulligans: 0,
      started_play: false,
      is_first_match: true,
    },
    {
      id: 5,
      result: "D",
      mulligans: 1,
      started_play: false,
      is_first_match: false,
    },
    {
      id: 6,
      result: "W",
      mulligans: 0,
      started_play: true,
      is_first_match: false,
    },
  ],
  user: 1,
};

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
    <View
      style={{
        paddingVertical: 12,
        borderColor: "#5F5F5F",
        borderBottomWidth: 1,
        borderTopWidth: 1,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={toggleMatch}
      >
        <View style={{ width: "8%" }}>
          <Icon type="ionicon" name="ellipse" size={8} color={color} />
        </View>
        <Text
          style={{
            color: "white",
            width: "32%",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {match.your_deck.deck_name}
        </Text>
        <Text
          style={{
            color: "white",
            width: "20%",
            fontWeight: "bold",
            fontSize: 22,
            textAlign: "center",
          }}
        >
          {result}
        </Text>
        <Text
          style={{
            color: "white",
            width: "32%",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {match.opp_deck.deck_name}
        </Text>
        <View style={{ width: "8%" }}>
          <Icon
            type="ionicon"
            name={status == "closed" ? "chevron-down" : "chevron-up"}
            size={18}
            color="#5F5F5F"
          />
        </View>
      </TouchableOpacity>

      {status === "open" && (
        <View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 16,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "38%",
              }}
            >
              <Text
                style={{
                  color: "#5F5F5F",
                  fontWeight: "bold",
                }}
              >
                TAGS
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {match.tags.map((tag) => (
                  <Text
                    style={{
                      color: "white",
                      backgroundColor: "#5F5F5F",
                      paddingVertical: 2,
                      paddingHorizontal: 6,
                      borderRadius: 4,
                      fontSize: 14,
                      margin: 2,
                    }}
                  >
                    {tag.tag}
                  </Text>
                ))}
              </View>
            </View>

            <View>
              <Text
                style={{
                  color: "#5F5F5F",
                  fontWeight: "bold",
                }}
              >
                PLAY/DRAW
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                }}
              >
                {match.matches[0].started_play ? "Play" : "Draw"}
              </Text>
            </View>

            <View
              style={{
                alignContent: "flex-end",
              }}
            >
              <Text
                style={{
                  color: "#5F5F5F",
                  fontWeight: "bold",
                }}
              >
                ACTIONS
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Icon type="ionicon" name="create" size={32} color="#5F5F5F" />
                <Icon type="ionicon" name="trash" size={32} color="#5F5F5F" />
              </View>
            </View>
          </View>
                
          {match.notes && match.notes.length > 0 && (
            <View
              style={{
                marginTop: 16,
              }}
            >
              <Text
                style={{
                  color: "#5F5F5F",
                  fontWeight: "bold",
                }}
              >
                NOTES
              </Text>
              <Text
                style={{
                  color: "white",
                }}
              >
                {match.notes}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Match;
