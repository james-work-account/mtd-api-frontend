<template>
  <button class="generate-auth" @click="generateOAuth" :disabled="disabled">Generate new OAuth Data</button>
</template>

<script>
import axios from "axios";
import Api from "@/services/Api";
import store from "@/store";
import { mapGetters } from "vuex";
import { setTimeout } from "timers";

export default {
  name: "generateOAuth",
  data() {
    return {
      disabled: false,
      userType: "individuals"
    };
  },
  methods: {
    async generateOAuth() {
      this.disabled = true;
      const res = await Promise.race([
        Api().get(`/generate?userType=${this.userType}`),
        new Promise((resolve, reject) => setTimeout(resolve, 10000, null)) // return null if auth call takes longer than 10 seconds
      ]);
      if (res) {
        store.dispatch("updateAuth", res.data); // only happens if res is not null
      }
      this.disabled = false;
    }
  },
  computed: {
    ...mapGetters(["grouping"])
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
}
button.generate-auth:disabled {
  background: #888;
  border: 1px solid #888;
  color: #ccc;
  cursor: unset;
}
</style>
