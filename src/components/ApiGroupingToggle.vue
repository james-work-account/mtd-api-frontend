<template>
  <div class="api-grouping-toggle">
    <p class="dropdown-menu" @click="open = !open">{{paragraphText}} (click to switch)</p>

    <ul v-show="open">
      <li
        v-for="(obj, index) in dataFriendlyNames"
        :key="index"
        :class="{active: grouping === obj.name}"
        @click="toggleGrouping(obj.name, obj.friendly_name)"
      >{{obj.friendly_name}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import Api from "@/services/Api";

export default {
  data() {
    return {
      open: false,
      friendly_name: null
    };
  },
  methods: {
    async toggleGrouping(name, friendly_name) {
      this.friendly_name = friendly_name;
      this.open = false;
      this.$router.push({ name: "home" });

      const apiGrouping = {
        name,
        friendly_name
      };
      store.dispatch("updateApiGrouping", apiGrouping);
    }
  },
  computed: {
    ...mapGetters(["dataFriendlyNames", "grouping"]),
    paragraphText() {
      if (this.friendly_name) {
        return this.friendly_name;
      } else {
        return "Select an API";
      }
    }
  }
};
</script>

<style>
.api-grouping-toggle {
  background: #fff;
  align-items: center;
  font-size: 20px;
  border: 1px solid #000;
}
.api-grouping-toggle p {
  text-align: center;
  padding: 0.5em 0;
  cursor: pointer;
}
.api-grouping-toggle ul {
  list-style: none;
  position: fixed;
  font-size: 20px;
  max-width: calc(((100vw - 2em) * (6 / 8) * (9 / 10) / 2) - 1em - 5px);
  overflow-y: auto;
  max-height: 10em;
  overflow-x: hidden;
}
.api-grouping-toggle li {
  float: left;
  border: 1px solid #000;
  color: #000;
  background: #fff;
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
