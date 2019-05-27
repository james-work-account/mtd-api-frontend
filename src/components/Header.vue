<template>
  <header class="header">
    <h1>
      <router-link :to="{ name: 'home'}">URL Helper</router-link>
    </h1>
    <ApiGroupingToggle/>
    <GenerateOAuth/>
  </header>
</template>

<script>
import GenerateOAuth from "@/components/GenerateOAuth";
import ApiGroupingToggle from "@/components/ApiGroupingToggle";

export default {
  components: {
    GenerateOAuth,
    ApiGroupingToggle
  }
};
</script>

<style>
.header {
  display: grid;
  grid-template-columns: 4fr 4fr 2fr;
  align-items: center;
  padding: 0 1em;
  background-color: #000;
  height: var(--header-size);
  position: fixed; /* Set the navbar to fixed position */
  top: 0;
  width: calc(100% - 2em);
}
.header * {
  text-align: left;
  margin: 0.5em 0;
}
.header h1,
.header h1 * {
  color: #fff;
  text-decoration: none;
}
.header h1 {
  padding-left: 1em;
}
</style>
