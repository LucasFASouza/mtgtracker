<template>
  <div class="login">
    <h1>Login</h1>
    <form v-on:submit.prevent="submitForm">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" placeholder="Username" />
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
      />
      <input type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:8000/api/login/", {
          username: this.username,
          password: this.password,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

