<template>
  <header class="header">
    <h1>
      <router-link :to="{ name: 'home'}">URL Helper</router-link>
    </h1>
    <HeaderMenu class="header-menu" />
  </header>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu";

export default {
  components: {
    HeaderMenu
  }
};
</script>

<style>
.header {
  display: grid;
  grid-template-columns: 2fr 6fr;
  align-items: center;
  padding: 0 1em;
  background-color: #000;
  height: var(--header-size);
  position: fixed; /* Set the navbar to fixed position */
  top: 0;
  width: calc(100% - 2em);
  z-index: 4;
}
.header * {
  text-align: left;
}
.header h1,
.header h1 * {
  color: #fff;
  text-decoration: none;
}
.header h1 {
  padding-left: 1em;
}
.header-menu {
  display: grid;
  grid-template-columns: 1fr 9fr;
  margin: 0;
}
@media (max-width: 1073px) {
  .header {
    grid-template-columns: 1fr 5fr;
    grid-column-gap: 1em;
    padding-left: 0;
    width: calc(100% - 1em);
  }
  .header :not(a) {
    font-size: 17px;
  }
  .header h1 {
    font-size: 24px;
  }
  .header-menu {
    grid-template-columns: 1fr 19fr;
  }
}
@media (max-width: 810px) {
  .header {
    grid-template-columns: 1fr 1fr;
  }
  .header-menu {
    display: flex;
    flex-direction: row-reverse;
  }
}
@media (max-width: 627px) {
  .header h1 {
    font-size: 20px;
  }
}
</style>
