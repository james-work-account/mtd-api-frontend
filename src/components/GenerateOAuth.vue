<template>
  <button class="generate-auth" @click="generateOAuth" :disabled="disabled">Generate new OAuth Data</button>
</template>

<script>
import axios from "axios";
import Api from "@/services/Api";
import store from "@/store";
import { mapGetters } from "vuex";

export default {
  name: "generateOAuth",
  data() {
    return {
      disabled: false
    };
  },
  methods: {
    async generateOAuth() {
      this.disabled = true;
      const res = await Api().get(`/generate?apiGrouping=${this.domain}`);
      store.dispatch("updateAuth", res.data);
      this.disabled = false;
    }
  },
  computed: {
    ...mapGetters(["domain"])
  }
};
</script>

<style>
button.generate-auth {
  border: none;
  color: #000;
  background: #fff;
  font-size: 20px;
  text-align: center;
  padding: 0.5em;
  cursor: pointer;
  border: 1px solid #000;
}
button.generate-auth:disabled {
  background: #888;
  border: 1px solid #888;
  color: #ccc;
}
@media (max-width: 680px) {
  button.generate-auth {
    margin: 0 1em 1em;
  }
}
</style>
