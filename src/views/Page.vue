<template>
  <section class="body">
    <section class="heading">
      <h1>{{this.$route.params.page}}</h1>
      <h2>{{queryData["header-url"]}}</h2>
    </section>
    <InputForm :submitRequest="submitRequest"/>
    <OutputField :body="output"/>
  </section>
</template>

<script>
import InputForm from "@/components/form/InputForm";
import OutputField from "@/components/form/OutputField";
import Api from "@/services/Api";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "page",
  components: { InputForm, OutputField },
  data() {
    return {
      output: {}
    };
  },
  methods: {
    async submitRequest(e) {
      const form = document.querySelector("form");
      const formdata = new FormData(form);
      let jsonObject = {};
      for (const [key, value] of formdata.entries()) {
        jsonObject[key] = value;
      }
      const res = await Api().post(
        `/send?method=${this.queryData.method}&request=${
          this.$route.params.page
        }`,
        jsonObject
      );
      this.output = res.data;
    }
  },
  computed: {
    ...mapGetters(["data"]),
    queryData() {
      return this.data(this.$route.params.page);
    }
  }
};
</script>

<style>
.heading h1 {
  font-size: 32px;
}
.heading h2 {
  margin-bottom: 1em;
}
.body {
  padding: 1em 2em 0;
}
.body h1 {
  margin-bottom: 0.5em;
}
</style>
