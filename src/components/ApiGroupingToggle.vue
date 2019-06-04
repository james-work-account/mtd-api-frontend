<template>
  <ul class="api-grouping-toggle">
    <li :class="{active: grouping === sa}" @click="toggleGrouping(sa)">Self Assessment</li>
    <li :class="{active: grouping === vat}" @click="toggleGrouping(vat)">Vat</li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  data() {
    return {
      sa: "self-assessment",
      vat: "vat"
    };
  },
  methods: {
    toggleGrouping(apiGrouping) {
      store.dispatch("updateApiGrouping", apiGrouping);
      this.$router.push({ name: "home" });
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  padding-right: 5em;
  align-items: center;
}
.api-grouping-toggle li {
  float: left;
  border: 1px solid #000;
  color: #000;
  background: #fff;
  font-size: 20px;
  text-align: center;
  padding: 0.5em;
  cursor: pointer;
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
</style>
