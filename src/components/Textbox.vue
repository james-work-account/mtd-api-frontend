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
    ...mapGetters([]),
    defaultValue() {
      return store.state[this.param];
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
