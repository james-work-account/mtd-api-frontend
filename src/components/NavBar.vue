<template>
  <nav>
    <div class="burger" @click="toggleNav">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <ul v-if="grouping && dataKeys">
      <li v-for="name in dataKeys" :key="name" @click="closeNav">
        <router-link class="nav-item" :to="{ name: 'page', params: { page: name }}">
          <div class="name">{{ data(name).endpoint_name }}</div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "navbar",
  methods: {
    toggleNav() {
      document.querySelector("nav ul").classList.toggle("show");
      document.querySelector(".burger").classList.toggle("clicked");
    },
    closeNav() {
      document.querySelector("nav ul").classList.remove("show");
      document.querySelector(".burger").classList.remove("clicked");
    }
  },
  computed: {
    ...mapGetters(["grouping", "dataKeys", "data"])
  }
};
</script>

<style>
* {
  --transition: ease 0.2s;
}
.burger {
  display: none;
}
nav ul {
  padding-top: 1em;
  padding-left: 1em;
  padding-bottom: 2em;
  list-style: none;
  height: calc(100vh - 9em);
}

nav ul a {
  font-weight: bold;
  color: #2c3e50;
  text-align: left;
  text-decoration: none;
}

nav ul a:hover {
  color: #42b983;
  transition: var(--transition);
}

nav ul li .nav-item {
  padding: 0.5em;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-column-gap: 0;
  align-items: center;
}

nav ul a.router-link-exact-active {
  color: #42b983;
  transition: var(--transition);
}
@media (min-width: 1281px) {
  nav ul {
    overflow-y: auto;
  }
}
@media (max-width: 1280px) {
  .burger {
    display: block;
    position: fixed;
    left: 1em;
    top: 7em;
    z-index: 3;
    cursor: pointer;
    background: #fff;
    padding: 5px 5px 0;
  }
  .burger div {
    content: "";
    background: #888;
    width: 30px;
    height: 5px;
    margin-bottom: 5px;
    transition: 0.4s;
  }
  .burger.clicked > div:last-of-type {
    transform: rotate(45deg) translate(-8px, -6px);
  }
  .burger.clicked > div:first-of-type {
    transform: rotate(-45deg) translate(-8px, 6px);
  }
  .burger.clicked > div:nth-of-type(2) {
    opacity: 0;
  }
  nav ul {
    position: absolute;
    background: #fff;
    top: 6em;
    width: 100%;
    border-bottom: 1px solid #000;
    padding: 0 0 1em;
    display: none;
    z-index: 2;
    transition: var(--transition);
    height: auto;
  }
  nav ul li {
    padding: 0 10%;
  }
  nav ul li:first-child {
    margin-top: 0.5em;
  }
  .show {
    display: block;
  }
  .type {
    margin: 10px 0;
  }
}
@media (max-width: 766px) {
  nav ul li {
    padding-right: 5%;
  }
}
@media (max-width: 680px) {
  .burger {
    background: #ccc;
    width: 100%;
    left: 0;
    top: 6em;
    height: 30px;
    transition: 0.4s;
  }
  .burger.clicked {
    background: #888;
    color: #fff;
  }
  .burger::before {
    content: "Click to view endpoints";
  }
  .burger > div {
    content: none;
    background: transparent;
    height: 0;
    width: 0;
    margin: 0;
  }
  nav ul {
    margin-top: 30px;
  }
  nav ul li {
    padding-left: 5%;
  }
}
</style>
