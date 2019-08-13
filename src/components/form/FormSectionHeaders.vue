<template>
  <section>
    <h3>Headers:</h3>
    <div class="inputs">
      <Textbox
        v-for="param in queryData.request_headers"
        :key="param"
        :param="param"
        :isHeaders="true"
      />
    </div>
  </section>
</template>

<script>
import Textbox from "@/components/form/Textbox";

export default {
  components: { Textbox },
  props: ["queryData"]
};
</script>

<style>
</style>
