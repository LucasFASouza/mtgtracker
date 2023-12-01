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
                    const response = await axios.get('http://localhost:8000/api/games/');
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
