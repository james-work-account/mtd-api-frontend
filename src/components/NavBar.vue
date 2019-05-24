<template>
  <ul id="nav">
    <li v-for="name in dataKeys" :key="name">
      <router-link :to="{ name: 'page', params: { page: name }}">{{ name }}</router-link>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "navbar",
  computed: {
    ...mapGetters(["dataKeys"])
  }
};
</script>

<style scoped>
ul {
  padding: 1em;
  list-style: none;
  border-right: #2c3e50 solid 1px;
  min-height: 100vh;
}

ul a {
  font-weight: bold;
  color: #2c3e50;
}

ul li {
  padding-bottom: 0.5em;
}

ul a.router-link-exact-active {
  color: #42b983;
}
</style>
