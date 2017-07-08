<template>
  <aside class="titlebar">
    <header class="branding">
      <h1 class="branding-title">NPM Stats</h1>
      <h2 class="branding-tagline">Discover package info</h2>
    </header>
  </aside>
</template>

<script>
export default {
  name: 'titlebar',
};
</script>

<style>
.titlebar {
  background: #0d968a;
  padding: 1em;
  color: #fff;
}

@media (min-width: 50em) {
  .titlebar {
    padding: 2.5em;
  }
}

.branding {
  text-align: center;
}

.branding-title,
.branding-tagline {
  margin: 0;
}

.branding-title {
  font-size: 1.75em;
  text-transform: uppercase;
}

.branding-tagline {
  font-size: .875em;
  text-transform: uppercase;
}
</style>
