<template>
  <div class="input-body">
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

<style>
div.input-body {
  margin-top: 1em;
}
div.input-body * {
  vertical-align: middle;
}
div.input-body textarea {
  padding: 0.5em;
  margin-left: 1em;
  width: 25em;
  height: auto;
  font-size: 14px;
  border-color: #cccccc;
  font-family: monospace;
  overflow-x: auto;
  word-wrap: break-word;
  resize: vertical;
}
@media (max-width: 1572px) {
  div.input-body {
    display: grid;
  }
  div.input-body textarea {
    margin-left: auto;
  }
}
@media (max-width: 1190px) {
  div.input-body label {
    margin-bottom: 0.5em;
  }
  div.input-body textarea {
    margin-left: 0;
    width: 100%;
  }
}
</style>
