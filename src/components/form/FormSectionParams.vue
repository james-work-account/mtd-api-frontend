<template>
  <section>
    <h3>Parameters:</h3>
    <div class="inputs">
      <Textbox v-for="param in params" :key="param" :param="param" />
      <LargeTextbox
        v-if="queryData.http_verb === 'POST' || queryData.http_verb === 'PUT'"
        :param="'Body'"
      />
    </div>
  </section>
</template>

<script>
import Textbox from "@/components/form/Textbox";
import LargeTextbox from "@/components/form/LargeTextbox";

export default {
  components: { Textbox, LargeTextbox },
  props: ["params", "queryData"]
};
</script>

<style>
</style>
