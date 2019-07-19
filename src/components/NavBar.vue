<template>
  <nav>
    <div class="burger" @click="toggleNav">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <ul>
      <li v-for="name in dataKeys" :key="name" @click="closeNav">
        <router-link class="nav-item" :to="{ name: 'page', params: { page: name }}">
          <div class="name">{{ name }}</div>
          <div class="type" :class="[data(name).grouping]">{{data(name).grouping}}</div>
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
    ...mapGetters(["dataKeys", "data"])
  }
};
</script>

<style>
* {
  --transition: ease-in-out 0.2s;
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

nav ul li .nav-item {
  padding-bottom: 0.5em;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-column-gap: 0;
  align-items: center;
}

nav ul a.router-link-exact-active {
  color: #42b983;
  transition: var(--transition);
}

/* CSS from https://gist.github.com/agarie/2610520 */
.type {
  margin: 10px;
  padding: 5px 8px;
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

nav ul a.router-link-exact-active .TaxCalc,
nav ul a.router-link-exact-active .Obli,
nav ul a.router-link-exact-active .BFLoss {
  background-color: #f85888;
  border: 1px solid #a13959;
}

nav ul a.router-link-exact-active .Property,
nav ul a.router-link-exact-active .Retu,
nav ul a.router-link-exact-active .LossClaims {
  background-color: #c03028;
  border: 1px solid #7d1f1a;
}

nav ul a.router-link-exact-active .SelfEmp,
nav ul a.router-link-exact-active .PayLi {
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
