<template>
  <ul id="nav">
    <li v-for="name in dataKeys" :key="name">
      <div>
        <div class="type" :class="[data(name).grouping]">{{data(name)["grouping"]}}</div>
      </div>
      <router-link :to="{ name: 'page', params: { page: name }}">{{ name }}</router-link>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "navbar",
  computed: {
    ...mapGetters(["dataKeys", "data"])
  }
};
</script>

<style scoped>
ul {
  padding-top: 1em;
  padding-left: 1em;
  list-style: none;
  border-right: #2c3e50 solid 1px;
  min-height: 100vh;
}

ul a {
  font-weight: bold;
  color: #2c3e50;
  text-align: left;
}

ul div {
  text-align: right;
}

ul li {
  padding-bottom: 0.5em;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 1em;
  align-items: center;
}

ul a.router-link-exact-active {
  color: #42b983;
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
}

.TaxCalc {
  background-color: #a8a878;
  border: 1px solid #6d6d4e;
}

.PropertyEOPS {
  background-color: #68a090;
  border: 1px solid #44685e;
}

.SEEOPS {
  background-color: #f08030;
  border: 1px solid #9c531f;
}

.CharGiv {
  background-color: #6890f0;
  border: 1px solid #445e9c;
}

.DivInc {
  background-color: #f8d030;
  border: 1px solid #a1871f;
}

.SavAcc {
  background-color: #78c850;
  border: 1px solid #4e8234;
}

.Cryst {
  background-color: #98d8d8;
  border: 1px solid #638d8d;
}
</style>
