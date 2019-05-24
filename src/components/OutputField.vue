<template>
  <pre>
    <code>{{body}}</code>
  </pre>
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
</style>
