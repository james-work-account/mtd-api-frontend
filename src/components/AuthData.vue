<template>
  <ul>
    <li>Nino: {{nino}}</li>
    <li>MtdItId: {{mtdItId}}</li>
    <li>Access Token: {{accessToken}}</li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["nino", "mtdItId", "accessToken"])
  }
};
</script>

<style>
</style>
