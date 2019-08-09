<template>
  <form id="form-input" class="input-data" @submit.prevent="submitRequest">
    <div>
      <FormSectionParams class="params" :params="params" :queryData="queryData" />
      <FormSectionHeaders class="headers" :queryData="queryData" />
    </div>
    <button type="submit" :disabled="disabled">Send Request</button>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import FormSectionHeaders from "@/components/form/FormSectionHeaders";
import FormSectionParams from "@/components/form/FormSectionParams";

export default {
  name: "input-form",
  props: ["submitRequest", "disabled"],
  components: { FormSectionHeaders, FormSectionParams },
  computed: {
    ...mapGetters(["data"]),
    queryData() {
      return this.data(this.$route.params.page);
    },
    params() {
      return [
        ...this.queryData["path_params"],
        ...this.queryData["query_params"]
      ];
    }
  }
};
</script>

<style>
.input-data > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.headers {
  text-align: left;
  padding: 1em 2em;
}
.inputs {
  display: grid;
  grid-template-columns: 1fr;
}
.params {
  border-right: #2c3e50 solid 1px;
  text-align: right;
  padding: 1em 2em;
}
button[type="submit"] {
  padding: 1em 2em;
  margin: 1em 0;
  font-size: 20px;
  cursor: pointer;
  background: #000;
  color: #fff;
  font-weight: 500;
  border-radius: 15px;
  border: 1px solid #000;
  transition: var(--transition);
}
button[type="submit"]:hover,
button[type="submit"]:active {
  background: #888;
}
button[type="submit"]:disabled {
  background: #888;
  border: 1px solid #888;
  color: #ccc;
}
@media (max-width: 1190px) {
  .params {
    text-align: left;
    border-right: none;
  }
  .input-data > div {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 680px) {
  .params,
  .headers {
    padding-left: 0.5em;
  }
}
</style>
