<template>
  <div class="input">
    <label :for="param" @click="toggleList">
      {{param}}
      <i
        v-if="isGovTestScenario"
        class="fas fa-caret-down"
        :class="{clicked : showScenarios}"
      ></i>
    </label>
    <input
      v-if="isGovTestScenario"
      type="text"
      :id="param"
      :name="param"
      :placeholder="'Enter or select a valid ' + param + '...'"
      :value="govTestValue"
      :class="{ left : isHeaders }"
    >
    <input
      v-else
      type="text"
      :id="param"
      :name="param"
      :placeholder="'Enter a valid ' + param + '...'"
      :value="value"
      :class="{ left : isHeaders }"
    >

    <ul :class="{ display : showScenarios }" v-if="isGovTestScenario" id="scenarios">
      <li @click="clearSelected">&lt;CLEAR&gt;</li>
      <li @click="changeSelected" v-for="scenario in govTestArray" :key="scenario">{{scenario}}</li>
    </ul>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";

export default {
  name: "textbox",
  props: ["param", "isHeaders"],
  data() {
    return {
      showScenarios: false,
      govTestValue: "",
      isGovTestScenario: this.param === "Gov-Test-Scenario"
    };
  },
  methods: {
    toggleList() {
      this.showScenarios = !this.showScenarios;
    },
    changeSelected(e) {
      this.govTestValue = e.target.innerHTML;
      this.toggleList();
    },
    clearSelected() {
      this.govTestValue = "";
      this.toggleList();
    }
  },
  computed: {
    ...mapGetters(["grouping", "data"]),
    value() {
      if (store.state[this.grouping][this.param]) {
        return store.state[this.grouping][this.param];
      } else {
        return store.state[this.param];
      }
    },
    govTestArray() {
      const data = this.data(this.$route.params.page);
      if (data.scenarios) {
        return data.scenarios;
      } else {
        return [];
      }
    }
  }
};
</script>

<style>
div.input {
  margin-top: 1em;
}
div.input input {
  padding: 0.5em;
  margin-left: 1em;
  width: 25em;
  font-size: 14px;
}
ul#scenarios {
  display: none;
  list-style: none;
  padding: 1em;
  margin-top: 0.5em;
  border: 1px solid #000;
}
ul#scenarios.display {
  display: inline-block;
}
ul#scenarios li:hover {
  cursor: pointer;
  background: #ccc;
}
.fa-caret-down {
  transform: rotate(-90deg);
  transition: 0.25s ease;
}
.fa-caret-down.clicked {
  transform: rotate(0deg);
}
</style>
