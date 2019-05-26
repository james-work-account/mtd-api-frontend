<template>
  <section>
    <h3>Headers:</h3>
    <div class="inputs">
      <Textbox v-for="param in queryData.headers" :key="param" :param="param"/>
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
