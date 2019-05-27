<template>
  <div class="input">
    <label :for="param">{{param}}</label>
    <input
      type="text"
      :id="param"
      :name="param"
      :placeholder="'Enter a valid ' + param + '...'"
      :value="defaultValue"
    >
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";

export default {
  name: "textbox",
  props: ["param"],
  computed: {
    ...mapGetters(["grouping"]),
    defaultValue() {
      if (store.state[this.grouping][this.param]) {
        return store.state[this.grouping][this.param];
      } else {
        return store.state[this.param];
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
  width: 20em;
  font-size: 14px;
}
</style>
