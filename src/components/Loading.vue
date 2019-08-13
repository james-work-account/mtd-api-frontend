<template>
  <div class="loading">
    <div class="loading-wheel" />
    <p>Now loading API Information. This can take some time if this is your first time using the app.</p>
    <p>Please be patient.</p>
  </div>
</template>

<script>
export default {};
</script>

<style>
div.loading {
  width: 100vw;
  padding-top: 2em;
}
div.loading p {
  margin-top: 1em;
}
div.loading-wheel {
  border: 5px solid #f3f3f3;
  animation: spin 0.75s linear infinite;
  border-top: 5px solid #555;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: auto;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>