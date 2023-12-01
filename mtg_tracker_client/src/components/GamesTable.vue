<template>
    <div>
        <h1>Games</h1>
        <table>
            <tr>
                <th>Your Deck</th>
                <th>Opponent Deck</th>
                <th>Season</th>
                <th>G1</th>
                <th>G2</th>
                <th>G3</th>
                <th>Date</th>
            </tr>

            <tr v-for="game in games" :key="game.id">
                <td>{{ game.your_deck }}</td>
                <td>{{ game.opp_deck }}</td>
                <td>{{ game.season }}</td>
                <td>{{ game.result_g1 }}</td>
                <td>{{ game.result_g2 }}</td>
                <td>{{ game.result_g3 }}</td>
                <td>{{ game.created_at }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                games: ['']
            }
        },
        methods: {
            async getData() {
                try {
                    console.log('getData()');
                    const response = await axios.get('http://localhost:8000/api/games/');
                    console.log(response);
                    this.games = response.data; 
                } catch (error) {
                    console.log(error);
                }
            },
        },
        created() {
            this.getData();
        }
    }
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
th {
  color: #42b983;
  padding: 10px 20px;
  border-bottom: 2px solid #00cccc;
}
td {
  color: #666;
  padding: 10px 20px;
}
table {
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    border-radius: 12px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.05), 0px 20px 20px rgba(0, 0, 0, 0.05), 0px 30px 20px rgba(0, 0, 0, 0.05);
}
</style>