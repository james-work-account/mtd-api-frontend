<template>
  <output form="form-input" name="form-output">
    <pre><code>{{body}}</code></pre>
  </output>
</template>

<script>
export default {
  props: ["body"]
};
</script>

<style>
pre code {
  background-color: #eee;
  border: 1px solid #999;
  display: block;
  padding: 20px;
  text-align: left;
}
output[name="form-output"] pre code {
  max-width: calc(80vw - 5em); /* main width - padding */
  overflow-x: auto;
}
</style>
