<template>
  <button class="generate-auth" @click="generateOAuth">Generate new OAuth Data</button>
</template>

<script>
import axios from "axios";
import Api from "@/services/Api";
import store from "@/store";

export default {
  name: "generateOAuth",
  methods: {
    async generateOAuth() {
      const res = await Api().get("/generate");
      store.dispatch("updateAuth", res.data);
    }
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
</style>
