<template>
  <div class="input">
    <label :for="param">{{param}}</label>
    <textarea
      type="text"
      :id="param"
      :name="param"
      :placeholder="'Enter a valid ' + param + '...'"
      :value="defaultValue"
      rows="10"
    />
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";

export default {
  name: "textbox",
  props: ["param"],
  computed: {
    ...mapGetters(["data"]),
    defaultValue() {
      const data = this.data(this.$route.params.page);
      return data.body;
    }
  }
};
</script>

<style scoped>
div.input {
  margin-top: 1em;
}
div.input * {
  vertical-align: middle;
}
div.input textarea {
  padding: 0.5em;
  margin-left: 1em;
  width: 25em;
  height: auto;
  font-size: 14px;
  border-color: #cccccc;
  font-family: monospace;
  overflow-x: auto;
  word-wrap: break-word;
}
</style>
