import React from "react";

import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text, Divider, Skeleton, Dialog, Badge } from "@rneui/themed";

import Button from "../components/atoms/Button";
import MatchesGroup from "../components/MatchesGroup";
import Select from "../components/atoms/Select";
import MiniButton from "../components/atoms/MiniButton";

export default function HistoryScreen() {
  // Data
  const [matches, setMatches] = React.useState([]);
  const [datedMatches, setDatedMatches] = React.useState([]);

  const [tags, setTags] = React.useState([]);
  const [yourDecks, setYourDecks] = React.useState([]);
  const [oppDecks, setOppDecks] = React.useState([]);

  // Filter dialogs visibility
  const [decksFilterVisible, setDecksFilterVisible] = React.useState(false);
  const [resultFilterVisible, setResultFilterVisible] = React.useState(false);
  const [tagsFilterVisible, setTagsFilterVisible] = React.useState(false);

  // Filters state
  const [yourDecksSelected, setYourDecksSelected] = React.useState([]);
  const [oppDecksSelected, setOppDecksSelected] = React.useState([]);
  const [tagsSelected, setTagsSelected] = React.useState([]);
  const [resultsSelected, setResultSelected] = React.useState([]);

  const [isFilteringDeck, setIsFilteringDeck] = React.useState(false);
  const [isFilteringResult, setIsFilteringResult] = React.useState(false);
  const [isFilteringTags, setIsFilteringTags] = React.useState(false);

  async function getMatches() {
    let userToken;

    try {
      userToken = "ddfb13f5887055f30c578c898d6863f44dba845f";
      const response = await fetch("https://mtgtracker-api.fly.dev/api/games", {
        headers: { Authorization: `Token ${userToken}` },
      });

      const data = await response.json();
      setMatches(data);
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

  function toggleDecksFilter() {
    setDecksFilterVisible(!decksFilterVisible);
  }

  function toggleResultsFilter() {
    setResultFilterVisible(!resultFilterVisible);
  }

  function toggleTagsFilter() {
    setTagsFilterVisible(!tagsFilterVisible);
  }

  function filterMatches() {
    if (oppDecksSelected.length > 0 || yourDecksSelected.length > 0) {
      setIsFilteringDeck(true);
    } else {
      setIsFilteringDeck(false);
    }

    if (resultsSelected.length > 0) {
      setIsFilteringResult(true);
    }

    if (tagsSelected.length > 0) {
      setIsFilteringTags(true);
    }
  }

  React.useEffect(() => {
    const fetchdata = async () => {
      await getMatches();
    };
    fetchdata().catch(() => console.log("e"));
  }, []);

  React.useEffect(() => {
    setDatedMatches(matchesByDate(matches));
    getTags(matches);
    getDecks(matches);
  }, [matches]);

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
        </View>
      </View>

      {/* Filters bar */}
      <ScrollView
        horizontal={true}
        style={{
          paddingVertical: 8,
          flexDirection: "row",
        }}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}
      >
        <MiniButton title="Decks" onPress={toggleDecksFilter} />
        {isFilteringDeck > 0 && (
          <Badge
            value={oppDecksSelected.length + yourDecksSelected.length}
            badgeStyle={{ backgroundColor: "#FA5075", borderWidth: 0 }}
          />
        )}

        <MiniButton title="Result" onPress={toggleResultsFilter} />
        {isFilteringResult > 0 && (
          <Badge
            value={resultsSelected.length}
            badgeStyle={{ backgroundColor: "#FA5075", borderWidth: 0 }}
          />
        )}

        <MiniButton title="Tags" onPress={toggleTagsFilter} />
        {isFilteringTags > 0 && (
          <Badge
            value={tagsSelected.length}
            badgeStyle={{ backgroundColor: "#FA5075", borderWidth: 0 }}
          />
        )}
      </ScrollView>

      {/* Filters dialogs */}
      <View>
        <Dialog
          isVisible={decksFilterVisible}
          onBackdropPress={toggleDecksFilter}
          overlayStyle={{
            borderRadius: 16,
            borderWidth: 1,
            backgroundColor: "#282828",
            borderColor: "#5F5F5F",
            paddingHorizontal: 16,
            minHeight: 300,
            width: "90%",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Decks
          </Text>

          <Divider style={{ marginVertical: 8 }} />

          <Select
            placeholder="Your Deck"
            data={yourDecks}
            value={yourDecksSelected}
            onChange={(item) => {
              setYourDecksSelected(item);
            }}
          />
          <Select
            placeholder="Opponent's Deck"
            data={oppDecks}
            value={oppDecksSelected}
            onChange={(item) => {
              setOppDecksSelected(item);
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
                toggleDecksFilter();
              }}
              buttonStyle={{
                width: 120,
                height: 40,
                borderRadius: 8,
                marginVertical: 10,
              }}
              titleStyle={{
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
              }}
            />
          </View>
        </Dialog>

        <Dialog
          isVisible={resultFilterVisible}
          onBackdropPress={toggleResultsFilter}
          overlayStyle={{
            borderRadius: 16,
            borderWidth: 1,
            backgroundColor: "#282828",
            borderColor: "#5F5F5F",
            paddingHorizontal: 16,
            minHeight: 300,
            width: "90%",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Results
          </Text>

          <Divider style={{ marginVertical: 8 }} />

          <Select
            placeholder="Choose one or more results"
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
                toggleResultsFilter();
              }}
              buttonStyle={{
                width: 120,
                height: 40,
                borderRadius: 8,
                marginVertical: 10,
              }}
              titleStyle={{
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
              }}
            />
          </View>
        </Dialog>

        <Dialog
          isVisible={tagsFilterVisible}
          onBackdropPress={toggleTagsFilter}
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
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Tags
          </Text>

          <Divider style={{ marginVertical: 8 }} />

          <Select
            placeholder="Choose your tags"
            data={tags}
            value={tagsSelected}
            onChange={(item) => {
              setTagsSelected(item);
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
                toggleTagsFilter();
              }}
              buttonStyle={{
                width: 120,
                height: 40,
                borderRadius: 8,
                marginVertical: 10,
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
        <MatchesGroup key={group.createdAt} matches={group.items} />
      ))}
    </ScrollView>
  );
}
