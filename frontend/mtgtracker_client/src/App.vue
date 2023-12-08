<template>
  <div id="app">
    <h1>mtgtracker</h1>
    <BasicTable />
  </div>
</template>

<script>
import BasicTable from "./components/BasicTable.vue";

export default {
  name: "App",
  components: {
    BasicTable,
  },
  data() {
    return {
      token: "ddfb13f5887055f30c578c898d6863f44dba845f",
    };
  },
  mounted() {
    localStorage.setItem("token", JSON.stringify(this.token));
  },
};
</script>
