<template>
  <div v-if="token">
    <button v-on:click="getGames">Get Games</button>

    <ul>
      <li v-for="game in games" :key="game.id">
        {{ game.your_deck.deck_name }} vs. {{ game.opp_deck.deck_name }}
      </li>
    </ul>
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
      token: localStorage.getItem('token'),
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
