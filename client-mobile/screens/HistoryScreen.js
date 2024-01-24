import React from "react";

import { ScrollView, View } from "react-native";
import { Text, Icon } from "@rneui/themed";

import MatchesGroup from "../components/MatchesGroup";

DATA_MOCK = [
  {
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
    created_at: "2023-12-05T19:52:26.790161Z",
    matches: [
      {
        id: 4,
        result: "L",
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
        result: "L",
        mulligans: 0,
        started_play: true,
        is_first_match: false,
      },
    ],
    user: 1,
  },
  {
    id: 8,
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
    notes: "test 2",
    created_at: "2023-12-05T19:52:34.442057Z",
    matches: [
      {
        id: 7,
        result: "D",
        mulligans: 0,
        started_play: false,
        is_first_match: true,
      },
      {
        id: 8,
        result: "D",
        mulligans: 1,
        started_play: false,
        is_first_match: false,
      },
      {
        id: 9,
        result: "L",
        mulligans: 0,
        started_play: true,
        is_first_match: false,
      },
    ],
    user: 1,
  },
  {
    id: 9,
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
      id: 3,
      deck_name: "BG Gardens",
      user: 1,
    },
    notes: "test 3",
    created_at: "2024-01-23T19:53:03.416702Z",
    matches: [
      {
        id: 10,
        result: "W",
        mulligans: 0,
        started_play: false,
        is_first_match: true,
      },
      {
        id: 11,
        result: "W",
        mulligans: 1,
        started_play: false,
        is_first_match: false,
      },
    ],
    user: 1,
  },
  {
    id: 10,
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
      id: 4,
      deck_name: "CAW Gates",
      user: 1,
    },
    notes: "test 3",
    created_at: "2024-01-23T19:54:23.633210Z",
    matches: [
      {
        id: 12,
        result: "L",
        mulligans: 0,
        started_play: false,
        is_first_match: true,
      },
      {
        id: 13,
        result: "W",
        mulligans: 1,
        started_play: false,
        is_first_match: false,
      },
    ],
    user: 1,
  },
  {
    id: 11,
    tags: [
      {
        id: 2,
        tag: "Insomnia",
        user: 1,
      },
    ],
    your_deck: {
      id: 5,
      deck_name: "Toxic Groselha",
      user: 1,
    },
    opp_deck: {
      id: 4,
      deck_name: "CAW Gates",
      user: 1,
    },
    notes: "test 3",
    created_at: "2024-01-24T19:55:07.531554Z",
    matches: [
      {
        id: 14,
        result: "W",
        mulligans: 0,
        started_play: true,
        is_first_match: true,
      },
      {
        id: 15,
        result: "L",
        mulligans: 1,
        started_play: false,
        is_first_match: false,
      },
      {
        id: 16,
        result: "W",
        mulligans: 1,
        started_play: false,
        is_first_match: false,
      },
    ],
    user: 1,
  },
  {
    id: 12,
    tags: [
      {
        id: 2,
        tag: "Insomnia",
        user: 1,
      },
    ],
    your_deck: {
      id: 5,
      deck_name: "Toxic Groselha",
      user: 1,
    },
    opp_deck: {
      id: 4,
      deck_name: "CAW Gates",
      user: 1,
    },
    notes: "test 3",
    created_at: "2024-01-24T19:55:08.278600Z",
    matches: [
      {
        id: 17,
        result: "W",
        mulligans: 0,
        started_play: true,
        is_first_match: true,
      },
      {
        id: 18,
        result: "L",
        mulligans: 1,
        started_play: false,
        is_first_match: false,
      },
      {
        id: 19,
        result: "W",
        mulligans: 1,
        started_play: false,
        is_first_match: false,
      },
    ],
    user: 1,
  },
  {
    id: 14,
    tags: [
      {
        id: 3,
        tag: "Insomnia PUT",
        user: 1,
      },
    ],
    your_deck: {
      id: 8,
      deck_name: "Hot Cats",
      user: 1,
    },
    opp_deck: {
      id: 7,
      deck_name: "Dimir Terror",
      user: 1,
    },
    notes: "test 3",
    created_at: "2024-01-24T20:40:51.488988Z",
    matches: [
      {
        id: 32,
        result: "L",
        mulligans: 0,
        started_play: true,
        is_first_match: true,
      },
      {
        id: 33,
        result: "W",
        mulligans: 1,
        started_play: true,
        is_first_match: false,
      },
      {
        id: 34,
        result: "L",
        mulligans: 1,
        started_play: true,
        is_first_match: false,
      },
    ],
    user: 1,
  },
];

export default function HistoryScreen() {
  const [separetedList, setSeparetedList] = React.useState([]);

  function separateByDate(data) {
    const separatedList = [];

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
    setSeparetedList(separateByDate(DATA_MOCK));
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#282828" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderColor: "#5F5F5F",
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
          Match History
        </Text>

        <Icon name="filter" size={24} color="white" type="ionicon" />
      </View>

      {separetedList.map((group) => (
        <MatchesGroup key={group.createdAt} matches={group.items} />
      ))}
    </ScrollView>
  );
}
