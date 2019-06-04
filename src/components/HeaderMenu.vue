<template>
  <div>
    <div class="header-burger" @click="toggleNav">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="header-menu-contents">
      <ApiGroupingToggle/>
      <GenerateOAuth/>
    </div>
  </div>
</template>

<script>
import GenerateOAuth from "@/components/GenerateOAuth";
import ApiGroupingToggle from "@/components/ApiGroupingToggle";

export default {
  components: {
    GenerateOAuth,
    ApiGroupingToggle
  },
  methods: {
    toggleNav() {
      document
        .querySelector(".header-menu-contents")
        .classList.toggle("header-show");
      document
        .querySelector(".header-burger")
        .classList.toggle("header-clicked");
    }
  }
};
</script>

<style>
.header-menu-contents {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 3em;
  margin: 0;
}
@media (max-width: 1098px) {
  .header-menu-contents {
    grid-column-gap: 1em;
  }
}
@media (max-width: 810px) {
  .header-menu-contents {
    grid-column-gap: 0.5em;
  }
}
@media (max-width: 680px) {
  .header-menu-contents {
    grid-template-columns: 1fr;
    display: none;
    position: fixed;
    top: 5em;
    left: 0;
    right: 0;
    background: #000;
  }
  .header-burger {
    cursor: pointer;
    position: fixed;
    right: 1em;
    top: 2em;
  }
  .header-burger div {
    content: "";
    background: #888;
    width: 30px;
    height: 5px;
    margin-bottom: 5px;
    transition: 0.4s;
  }
  .header-burger.header-clicked > div:last-of-type {
    transform: rotate(45deg) translate(-8px, -6px);
  }
  .header-burger.header-clicked > div:first-of-type {
    transform: rotate(-45deg) translate(-8px, 6px);
  }
  .header-burger.header-clicked > div:nth-of-type(2) {
    opacity: 0;
  }
  .header-show {
    display: grid;
  }
}
</style>
