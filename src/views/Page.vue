<template>
  <section class="body">
    <section class="heading">
      <h1>{{this.$route.params.page}}</h1>
      <h2>{{url}}</h2>
    </section>
    <InputForm :submitRequest="submitRequest" :disabled="buttonIsDisabled" />
    <OutputField :body="output" />
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
      output: {},
      buttonIsDisabled: false
    };
  },
  methods: {
    async submitRequest(e) {
      this.buttonIsDisabled = true;
      const form = document.querySelector("form");
      const formdata = new FormData(form);
      let jsonObject = {};
      for (const [key, value] of formdata.entries()) {
        if (value.length > 0) {
          jsonObject[key] = value;
        }
      }
      const res = await Api().post(
        `/send?method=${this.queryData.method}&request=${this.$route.params.page}&apiGrouping=${this.grouping}`,
        jsonObject
      );
      this.output = res.data;
      this.buttonIsDisabled = false;
    }
  },
  computed: {
    ...mapGetters(["data", "grouping"]),
    queryData() {
      console.log(this.data(this.$route.params.page));
      return this.data(this.$route.params.page);
    },
    url() {
      const queryParams = this.queryData["query_params"].join("&");
      return queryParams.length > 0
        ? `${this.queryData["path"]}?${queryParams}`
        : `${this.queryData["path"]}`;
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
  padding: 1em 2em 2em;
  min-height: calc(100vh - 9em);
}
.body h1 {
  margin-bottom: 0.5em;
}
@media (max-width: 680px) {
  .body {
    padding-left: 0;
    padding-right: 0;
  }
}
@media (max-width: 626px) {
  .heading h1 {
    font-size: 24px;
  }
  .heading h2 {
    font-size: 20px;
    margin-bottom: 0;
  }
}
</style>
