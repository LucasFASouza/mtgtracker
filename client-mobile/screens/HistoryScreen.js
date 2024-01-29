import React from "react";

import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text, Icon, Skeleton, LinearGradient } from "@rneui/themed";

import Button from "../components/atoms/Button";
import MatchesGroup from "../components/MatchesGroup";
import Select from "../components/atoms/Select";

export default function HistoryScreen() {
  const [isLoading, setIsLoading] = React.useState(true);

  const [matches, setMatches] = React.useState([]);
  const [datedMatches, setDatedMatches] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [yourDecks, setYourDecks] = React.useState([]);
  const [oppDecks, setOppDecks] = React.useState([]);

  const [tagsSelected, setTagsSelected] = React.useState([]);
  const [yourDecksSelected, setYourDecksSelected] = React.useState([]);
  const [oppDecksSelected, setOppDecksSelected] = React.useState([]);

  async function getMatches() {
    let userToken;

    try {
      userToken = "ddfb13f5887055f30c578c898d6863f44dba845f";
      const response = await fetch("https://mtgtracker-api.fly.dev/api/games", {
        headers: { Authorization: `Token ${userToken}` },
      });

      const data = await response.json();
      setIsLoading(false);
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

  function filterMatches() {
    const filteredMatches = datedMatches.filter((match) => {
      if (yourDecksSelected.length > 0) {
        if (!yourDecksSelected.includes(match.items[0].your_deck.deck_name)) {
          return false;
        }
      }

      if (oppDecksSelected.length > 0) {
        if (!oppDecksSelected.includes(match.items[0].opp_deck.deck_name)) {
          return false;
        }
      }

      if (tagsSelected.length > 0) {
        let matchTags = [];
        match.items.forEach((item) => {
          item.tags.forEach((tag) => {
            matchTags.push(tag.tag);
          });
        });

        let matchTagsFiltered = matchTags.filter((tag) =>
          tagsSelected.includes(tag)
        );

        if (matchTagsFiltered.length === 0) {
          return false;
        }
      }

      return true;
    });

    console.log(filteredMatches);
    setDatedMatches(filteredMatches);
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
      <View
        style={{
          borderColor: "#5F5F5F",
          borderBottomWidth: 1,
          backgroundColor: "#282828",
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

      <ScrollView
        horizontal={true}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          flexDirection: "row",
        }}
      >
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
        <Select
          placeholder="Format"
          data={tags}
          value={tagsSelected}
          onChange={(item) => {
            setTagsSelected(item);
          }}
        />
        <Select
          placeholder="Tags"
          data={tags}
          value={tagsSelected}
          onChange={(item) => {
            setTagsSelected(item);
          }}
        />
      </ScrollView>

      <Button
        title="Filter"
        onPress={() => {
          filterMatches();
        }}
        buttonStyle={{
          width: 60,
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

      {isLoading && (
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 16,
          }}
        >
          <Skeleton
            animation="pulse"
            width={"100%"}
            height={60}
            style={{ marginVertical: 8 }}
          />
          <Skeleton
            animation="pulse"
            width={"100%"}
            height={60}
            style={{ marginVertical: 8 }}
          />
          <Skeleton
            animation="pulse"
            width={"100%"}
            height={60}
            style={{ marginVertical: 8 }}
          />
        </View>
      )}

      {datedMatches.map((group) => (
        <MatchesGroup key={group.createdAt} matches={group.items} />
      ))}
    </ScrollView>
  );
}
