import React from "react";

import { View, TouchableOpacity } from "react-native";
import { Text, Icon } from "@rneui/themed";

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 6,
            marginHorizontal: 12,
          }}
        >
          <View
            style={{
              width: "80%",
            }}
          >
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
                    key={tag.id}
                  >
                    {tag.tag}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 16,
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

            <View>
              <TouchableOpacity
                style={{
                  marginVertical: 12,
                }}
              >
                <Icon
                  type="ionicon"
                  name="create-outline"
                  size={42}
                  color="#5F5F5F"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginVertical: 12,
                }}
              >
                <Icon
                  type="ionicon"
                  name="trash-outline"
                  size={42}
                  color="#5F5F5F"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Match;
