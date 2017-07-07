<template>
  <aside class="sidebar">
    <header class="branding">
      <h1 class="branding-title">NPM Stats</h1>
      <h2 class="branding-tagline">Discover package info</h2>
    </header>
  </aside>
</template>

<script>
export default {
  name: 'branding',
};
</script>

<style>
.sidebar {
  background: coral;
  padding-left: 2em;
  padding-right: 2em;
}

.branding {
  text-align: center;
}

.branding-title {
  font-size: 1.75em;
  text-transform: uppercase;
}

.branding-tagline {
  font-size: .875em;
  margin-top: -1.375em;
  text-transform: uppercase;
}
</style>
