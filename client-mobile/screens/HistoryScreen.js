import React from "react";

import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text, Divider, Icon, Dialog } from "@rneui/themed";

import Button from "../components/atoms/Button";
import MatchesGroup from "../components/MatchesGroup";
import MultiSelect from "../components/atoms/MultiSelect";

export default function HistoryScreen() {
  // Data
  const [matches, setMatches] = React.useState([]);
  const [filteredMatches, setFilteredMatches] = React.useState([]);
  const [datedMatches, setDatedMatches] = React.useState([]);

  const [tags, setTags] = React.useState([]);
  const [yourDecks, setYourDecks] = React.useState([]);
  const [oppDecks, setOppDecks] = React.useState([]);

  // Filters
  const [toggle, setToggle] = React.useState(false);
  const [yourDecksSelected, setYourDecksSelected] = React.useState([]);
  const [oppDecksSelected, setOppDecksSelected] = React.useState([]);
  const [tagsSelected, setTagsSelected] = React.useState([]);
  const [resultsSelected, setResultSelected] = React.useState([]);

  const userToken = "ddfb13f5887055f30c578c898d6863f44dba845f";

  async function getMatches() {
    try {
      const response = await fetch("https://mtgtracker-api.fly.dev/api/games", {
        headers: { Authorization: `Token ${userToken}` },
      });

      const data = await response.json();
      setMatches(data);
      setFilteredMatches(data);
    } catch (e) {
      console.log(e);
    }
  }

  function matchesByDate(data) {
    const separatedList = [];

    data.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });

    data.forEach((item) => {
      const createdAt = new Date(item.created_at).toLocaleDateString();
      const existingDate = separatedList.find(
        (date) => date.createdAt === createdAt
      );

      if (existingDate) {
        existingDate.items.push(item);
      } else {
        separatedList.push({
          createdAt,
          items: [item],
        });
      }
    });

    return separatedList;
  }

  function getTags(data) {
    let tags = [];
    let tags_added = [];

    data.forEach((match) => {
      match.tags.forEach((tag) => {
        if (!tags_added.includes(tag.tag)) {
          tags.push({ label: tag.tag, value: tag.tag });
          tags_added.push(tag.tag);
        }
      });
    });

    setTags(tags);
  }

  function getDecks(data) {
    let yourDecks = [];
    let yourDecksNames = [];

    data.forEach((match) => {
      if (!yourDecksNames.includes(match.your_deck.deck_name)) {
        yourDecks.push({
          label: match.your_deck.deck_name,
          value: match.your_deck.deck_name,
        });
        yourDecksNames.push(match.your_deck.deck_name);
      }
    });

    setYourDecks(yourDecks);

    let oppDecks = [];
    let oppDecksNames = [];

    data.forEach((match) => {
      if (!oppDecksNames.includes(match.opp_deck.deck_name)) {
        oppDecks.push({
          label: match.opp_deck.deck_name,
          value: match.opp_deck.deck_name,
        });
        oppDecksNames.push(match.opp_deck.deck_name);
      }
    });

    setOppDecks(oppDecks);
  }

  function filterMatches() {
    let filteringMatches = matches;

    if (yourDecksSelected.length > 0) {
      filteringMatches = filteringMatches.filter((match) => {
        return yourDecksSelected.includes(match.your_deck.deck_name);
      });
    }

    if (oppDecksSelected.length > 0) {
      filteringMatches = filteringMatches.filter((match) => {
        return oppDecksSelected.includes(match.opp_deck.deck_name);
      });
    }

    if (resultsSelected.length > 0) {
      filteringMatches = filteringMatches.filter((match) => {
        let wins = 0;
        let losses = 0;
        let matchResult = "";

        match.matches.forEach((game) => {
          if (game.result === "W") {
            wins += 1;
          } else if (game.result === "L") {
            losses += 1;
          }
        });

        if (wins > losses) {
          matchResult = "Win";
        } else if (wins < losses) {
          matchResult = "Loss";
        } else {
          matchResult = "Draw";
        }

        return resultsSelected.includes(matchResult);
      });
    }

    if (tagsSelected.length > 0) {
      filteringMatches = filteringMatches.filter((match) => {
        let matchTags = match.tags.map((tag) => tag.tag);
        return tagsSelected.every((tag) => matchTags.includes(tag));
      });
    }

    setToggle(false);

    setFilteredMatches(filteringMatches);
  }

  async function deleteMatch(id) {
    const response = await fetch(
      "https://mtgtracker-api.fly.dev/api/games/" + id,
      {
        headers: { Authorization: `Token ${userToken}` },
        method: "DELETE",
      }
    ).catch(() => console.log("e"));

    getMatches();
  }

  React.useEffect(() => {
    const fetchdata = async () => {
      await getMatches();
    };
    fetchdata().catch(() => console.log("e"));
  }, []);

  React.useEffect(() => {
    getTags(matches);
    getDecks(matches);
  }, [matches]);

  React.useEffect(() => {
    setDatedMatches(matchesByDate(filteredMatches));
  }, [filteredMatches]);

  return (
    <ScrollView style={{ backgroundColor: "#282828" }}>
      {/* Header */}
      <View
        style={{
          borderColor: "#5F5F5F",
          borderBottomWidth: 1,
          backgroundColor: "#282828",
          marginBottom: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 12,
            paddingHorizontal: 16,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
            Match History
          </Text>

          <TouchableOpacity onPress={() => setToggle(!toggle)}>
            <Icon name="filter" size={24} color="white" type="ionicon" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters dialog */}
      <View>
        <Dialog
          isVisible={toggle}
          onBackdropPress={() => setToggle(!toggle)}
          overlayStyle={{
            borderRadius: 16,
            borderWidth: 0,
            backgroundColor: "#282828",
            borderColor: "#5F5F5F",
            paddingHorizontal: 16,
            minHeight: 200,
            width: "90%",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Filters
          </Text>

          <Divider style={{ marginVertical: 8 }} />

          <MultiSelect
            placeholder="Your Decks"
            data={yourDecks}
            value={yourDecksSelected}
            onChange={(item) => {
              setYourDecksSelected(item);
            }}
          />

          <MultiSelect
            placeholder="Opponent's Decks"
            data={oppDecks}
            value={oppDecksSelected}
            onChange={(item) => {
              setOppDecksSelected(item);
            }}
          />

          <MultiSelect
            placeholder="Tags"
            data={tags}
            value={tagsSelected}
            onChange={(item) => {
              setTagsSelected(item);
            }}
          />

          <MultiSelect
            placeholder="Results"
            data={[
              { label: "Win", value: "Win" },
              { label: "Loss", value: "Loss" },
              { label: "Draw", value: "Draw" },
            ]}
            value={resultsSelected}
            onChange={(item) => {
              setResultSelected(item);
            }}
          />

          <View
            style={{
              marginTop: 20,
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Button
              title="Filter"
              onPress={() => {
                filterMatches();
              }}
              titleStyle={{
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
              }}
            />
          </View>
        </Dialog>
      </View>

      {/* Matches */}
      {datedMatches.map((group) => (
        <MatchesGroup
          key={group.createdAt}
          matches={group.items}
          onDelete={deleteMatch}
        />
      ))}

      {/* Empty */}
      {datedMatches.length === 0 && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 300,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>No matches found</Text>
        </View>
      )}
    </ScrollView>
  );
}
