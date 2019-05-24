<template>
  <form class="input-data" @submit.prevent="submitRequest">
    <div class="not-button">
      <section class="params">
        <h2>Parameters:</h2>
        <div class="inputs">
          <Textbox v-for="param in params" :key="param" :param="param"/>
          <LargeTextbox
            v-if="queryData.method === 'POST' || queryData.method === 'PUT'"
            :param="'Body'"
          />
        </div>
      </section>
      <section class="headers">
        <h2>Headers:</h2>
        <div class="inputs">
          <Textbox v-for="param in queryData.headers" :key="param" :param="param"/>
        </div>
      </section>
    </div>
    <button type="submit">Send Request</button>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import Textbox from "@/components/Textbox";
import LargeTextbox from "@/components/LargeTextbox";

export default {
  name: "input-form",
  props: ["submitRequest"],
  components: { Textbox, LargeTextbox },
  computed: {
    ...mapGetters(["data"]),
    queryData() {
      return this.data(this.$route.params.page);
    },
    params() {
      return this.queryData["header-url"].match(/(?!{)\w+(?=})/g);
    }
  }
};
</script>

<style>
</style>
