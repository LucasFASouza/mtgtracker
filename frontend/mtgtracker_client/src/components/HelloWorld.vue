<template>
  <div class="hello">
    <form v-on:submit.prevent="getToken">
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control" id="username" v-model="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <div class="form-group">
            <button type="submit">Login</button>
        </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
        token: '',
        username: '',
        password: ''
    }
  },
  methods: {
    async getToken(){
        try {
            const response = await axios.post('http://localhost:8000/api/token', {
                username: this.username,
                password: this.password,
            });
            this.title = '';
            this.description = '';
            this.token = response.data.token;
            console.log(this.token);
        } catch (error) {
            console.log(error);
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
