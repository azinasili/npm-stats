<template>
  <div class="error-message">{{errorMessage}}</div>
</template>

<script>
export default {
  name: 'errorMessage',
  props: ['errorMessage'],
};
</script>

<style>
.error-message {
  font-size: 1.25em;
  text-align: center;
}
</style>
