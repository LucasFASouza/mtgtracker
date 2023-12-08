<template>
  <div v-if="token">
    <button v-on:click="getGames">Get Games</button>

    <table>
      <thead>
        <tr>
          <th>Your Deck</th>
          <th>Opponent Deck</th>
          <th>G1</th>
          <th>G2</th>
          <th>G3</th>
          <th>tags</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id">
          <td>{{ game.your_deck.deck_name }}</td>
          <td>{{ game.opp_deck.deck_name }}</td>
          <td v-for="match in game.matches" :key="match.id">
            {{ match.result }}
          </td>
          <div v-if="game.matches.length < 3">
            <td v-for="i in 3 - game.matches.length" :key="i">-</td>
          </div>

          <td>
            <span v-for="tag in game.tags" :key="tag.id">
              {{ tag.tag }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      games: "",
    };
  },
  mounted() {
    this.getGames();
  },
  methods: {
    async getGames() {
      try {
        const response = await axios.get("http://localhost:8000/api/games", {
          headers: {
            Authorization: `Token ${JSON.parse(this.token)}`,
          },
        });
        console.log(response.data);
        this.games = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
