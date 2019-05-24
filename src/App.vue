<template>
  <div id="app">
    <Header/>
    <div id="main">
      <NavBar/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

export default {
  components: {
    Header,
    NavBar
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  --header-size: 6em;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#main {
  display: grid;
  grid-template-columns: 1fr 3fr;
  min-height: calc(100vh - var(--header-size));
  margin-top: var(--header-size);
}
</style>
