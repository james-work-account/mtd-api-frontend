<template>
  <div id="app">
    <Header/>
    <main>
      <NavBar/>
      <router-view class="content"/>
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

export default {
  components: {
    Header,
    NavBar
  },
  mounted() {
    this.$store.dispatch("setInitialApiGroupings");
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
  height: calc(100vh - 9em);
}
main {
  display: grid;
  grid-template-columns: 1fr 3fr;
  height: calc(100vh - var(--header-size));
  margin-top: var(--header-size);
}
.content {
  border-left: #2c3e50 solid 1px;
  min-height: calc(100vh - 6em);
}
@media (min-width: 1281px) {
  .content {
    overflow-y: auto;
  }
}
@media (max-width: 1280px) {
  main {
    grid-template-columns: 1fr;
  }
  .content {
    border-left: none;
  }
}
@media (max-width: 680px) {
  .content {
    margin-top: 30px;
  }
}
</style>
