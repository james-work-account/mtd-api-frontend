<template>
  <nav>
    <ul>
      <li v-for="name in dataKeys" :key="name">
        <router-link class="nav-item" :to="{ name: 'page', params: { page: name }}">
          <div class="name">{{ name }}</div>
          <div class="type" :class="[data(name).grouping]">{{data(name)["grouping"]}}</div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "navbar",
  data() {
    return {
      window: {
        width: 0
      }
    };
  },
  computed: {
    ...mapGetters(["dataKeys", "data"])
  }
};
</script>

<style>
* {
  --transition: ease-in-out 0.2s;
}
nav ul {
  padding-top: 1em;
  padding-left: 1em;
  list-style: none;
}

nav ul a {
  font-weight: bold;
  color: #2c3e50;
  text-align: left;
  text-decoration: none;
}

nav ul li .nav-item {
  padding-bottom: 0.5em;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-column-gap: 1em;
  align-items: center;
}

nav ul a.router-link-exact-active {
  color: #42b983;
  transition: var(--transition);
}

/* CSS from https://gist.github.com/agarie/2610520 */
.type {
  margin: 10px;
  padding: 5px 8px 5px 8px;
  display: inline-block;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  -o-border-radius: 6px;
  font-size: 13px;
  font-family: "helvetica neue", Helvetica, Verdana, sans-serif;
  color: #fff;
  text-align: center;
  text-decoration: none;
  background-color: #888;
  border: 1px solid #000;
  transition: var(--transition);
}

nav ul a.router-link-exact-active .TaxCalc {
  background-color: #f85888;
  border: 1px solid #a13959;
}

nav ul a.router-link-exact-active .PropertyEOPS {
  background-color: #c03028;
  border: 1px solid #7d1f1a;
}

nav ul a.router-link-exact-active .SEEOPS {
  background-color: #f08030;
  border: 1px solid #9c531f;
}

nav ul a.router-link-exact-active .CharGiv {
  background-color: #6890f0;
  border: 1px solid #445e9c;
}

nav ul a.router-link-exact-active .DivInc {
  background-color: #f8d030;
  border: 1px solid #a1871f;
}

nav ul a.router-link-exact-active .SavAcc {
  background-color: #78c850;
  border: 1px solid #4e8234;
}

nav ul a.router-link-exact-active .Cryst {
  background-color: #98d8d8;
  border: 1px solid #638d8d;
}
</style>
