<template>
  <div class="body">
    <h1>{{queryData["header-url"]}}</h1>
    <InputForm :submitRequest="submitRequest"/>
    <OutputField :body="output"/>
  </div>
</template>

<script>
import InputForm from "@/components/InputForm";
import OutputField from "@/components/OutputField";
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
.body {
  padding: 1em 2em 0;
}
.body h1 {
  margin-bottom: 0.5em;
}
.input-data .not-button {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.params {
  border-right: #2c3e50 solid 1px;
  text-align: right;
  padding: 1em 2em;
}
.headers {
  text-align: left;
  padding: 1em 2em;
}
.inputs {
  display: grid;
  grid-template-columns: 1fr;
}
</style>
