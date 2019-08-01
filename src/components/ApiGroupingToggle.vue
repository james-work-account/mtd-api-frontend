<template>
  <ul class="api-grouping-toggle">
    <li class="dropdown-menu" @click="open = !open">{{dictionary[grouping]}} (click to switch)</li>
    <li
      v-show="open"
      :class="{active: grouping === sa}"
      @click="toggleGrouping(sa)"
    >{{dictionary[sa]}}</li>
    <li
      v-show="open"
      :class="{active: grouping === vat}"
      @click="toggleGrouping(vat)"
    >{{dictionary[vat]}}</li>
    <li
      v-show="open"
      :class="{active: grouping === losses}"
      @click="toggleGrouping(losses)"
    >{{dictionary[losses]}}</li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  data() {
    return {
      sa: "self-assessment-api",
      vat: "vat",
      losses: "losses",
      dictionary: {
        "self-assessment-api": "Self Assessment",
        vat: "Vat",
        losses: "Individual Losses"
      },
      open: false
    };
  },
  methods: {
    toggleGrouping(apiGrouping) {
      store.dispatch("updateApiGrouping", apiGrouping);
      this.$router.push({ name: "home" });
      this.open = false;
    }
  },
  computed: {
    ...mapGetters(["grouping"])
  }
};
</script>

<style>
.api-grouping-toggle {
  list-style: none;
  align-items: center;
  max-height: 1em;
}
.api-grouping-toggle li {
  float: left;
  border: 1px solid #000;
  color: #000;
  background: #fff;
  font-size: 20px;
  text-align: center;
  padding: 0.5em 0;
  cursor: pointer;
  width: 100%;
}
.api-grouping-toggle li.active {
  background: #888;
  color: #fff;
}
@media (max-width: 1073px) {
  .api-grouping-toggle {
    padding: 0;
  }
}
@media (max-width: 626px) {
  .api-grouping-toggle {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 680px) {
  .api-grouping-toggle::before {
    padding-left: 1em;
    color: #fff;
    content: "Choose an API grouping:";
    font-weight: bold;
  }
  .api-grouping-toggle::after {
    padding-left: 1em;
    color: #fff;
    content: "Generate new OAuth Data:";
    font-weight: bold;
  }
  .api-grouping-toggle {
    grid-template-columns: 1fr;
    padding: 0 1em;
  }
  .api-grouping-toggle li {
    float: none;
  }
}
</style>
