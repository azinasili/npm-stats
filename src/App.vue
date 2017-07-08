<template>
  <main id="app">
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
*, *::before, *::after { box-sizing: inherit;  }

html {
  box-sizing: border-box;
  height: 100%;
}

@media (max-width: 50em) {
  html {
    font-size: 3vw;
  }
}

body {
  height: 100%;
  margin: 0;
}

#app {
  color: #043531;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
