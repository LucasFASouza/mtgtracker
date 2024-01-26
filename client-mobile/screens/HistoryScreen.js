import React from "react";

import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text, Icon, Skeleton, LinearGradient } from "@rneui/themed";

import Button from "../components/atoms/Button";
import MatchesGroup from "../components/MatchesGroup";
import Select from "../components/atoms/Select";

export default function HistoryScreen() {
  const [toggle, setToggle] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const [matches, setMatches] = React.useState([]);
  const [separetedList, setSeparetedList] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [yourDecks, setYourDecks] = React.useState([]);
  const [oppDecks, setOppDecks] = React.useState([]);

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
  };

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
  };

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
  };

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
  };

  React.useEffect(() => {
    const fetchdata = async () => {
      await getMatches();
    };
    fetchdata().catch(() => console.log("e"));
  }, []);

  React.useEffect(() => {
    setSeparetedList(matchesByDate(matches));
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

          <TouchableOpacity onPress={() => setToggle(!toggle)}>
            <Icon name="filter" size={24} color="white" type="ionicon" />
          </TouchableOpacity>
        </View>

        {toggle && (
          <View
            style={{
              paddingHorizontal: 22,
              paddingBottom: 12,
            }}
          >
            <Select placeholder="Your Deck" data={yourDecks} />
            <Select placeholder="Opponent's Deck" data={oppDecks} />
            <Select placeholder="Tags" data={tags} />
            <View style={{ width: "100%", alignItems: "flex-end" }}>
              <Button
                title="Filter"
                buttonStyle={{
                  width: 120,
                  height: 40,
                  borderRadius: 8,
                  marginVertical: 10,
                }}
                titleStyle={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              />
            </View>
          </View>
        )}
      </View>

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

      {separetedList.map((group) => (
        <MatchesGroup key={group.createdAt} matches={group.items} />
      ))}
    </ScrollView>
  );
}
