import React from "react";

import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text, Icon, Skeleton, LinearGradient } from "@rneui/themed";

import Button from "../components/atoms/Button";
import MatchesGroup from "../components/MatchesGroup";
import Select from "../components/atoms/Select";

const DECKS_MOCK = [
  { label: "Mono U Terror", value: "Mono U Terror" },
  { label: "Kuldotha Burn", value: "Kuldotha Burn" },
  { label: "BG Gardens", value: "BG Gardens" },
  { label: "CAW Gates", value: "CAW Gates" },
  { label: "Toxic Groselha", value: "Toxic Groselha" },
  { label: "Hot Cats", value: "Hot Cats" },
  { label: "Dimir Terror", value: "Dimir Terror" },
];

const TAGS_MOCK = [
  { label: "Insomnia", value: "Insomnia" },
  { label: "MTGO", value: "MTGO" },
  { label: "Fuguete League", value: "Fuguete League" },
  { label: "V.1.2", value: "V.1.2" },
  { label: "Insomnia PUT", value: "Insomnia PUT" },
];

export default function HistoryScreen() {
  const [separetedList, setSeparetedList] = React.useState([]);
  const [matches, setMatches] = React.useState([]);
  const [toggle, setToggle] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const getMatches = async () => {
    let userToken;

    try {
      userToken = "ddfb13f5887055f30c578c898d6863f44dba845f";
      console.log("Getting matches");

      const response = await fetch("https://mtgtracker-api.fly.dev/api/games", {
        headers: { Authorization: `Token ${userToken}` },
      });

      const data = await response.json();
      setIsLoading(false);
      setMatches(data);
      console.log("Got it");
    } catch (e) {
      console.log(e);
    }
  };

  function separateByDate(data) {
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

  React.useEffect(() => {
    getMatches();
    setSeparetedList(separateByDate(matches));
  }, []);

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
            <Select placeholder="Your Deck" data={DECKS_MOCK} />
            <Select placeholder="Opponent's Deck" data={DECKS_MOCK} />
            <Select placeholder="Tags" data={TAGS_MOCK} />
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
