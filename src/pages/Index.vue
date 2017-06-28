<template>
<div class="content">
  <div class="container">
    <div class="search-container">
      <input
        type="search"
        name="search"
        placeholder="npm package name"
        class="search-input"
        v-on:keyup.enter="requestData"
        v-model="packge">
      <button
        v-on:click="requestData"
        class="search-button">Find</button>
    </div>
    <div v-if="showError" class="error-message">{{errorMessage}}</div>
    <h1 v-if="loaded" class="title">{{packageName}}</h1>
    <div v-if="loaded" class="chart-container">
      <div class="chart-title">Downloads per Day <span>{{period}}</span></div>
      <div class="chart-content">
        <line-chart
          v-if="loaded"
          v-bind:chart-data="downloads"
          v-bind:chart-labels="labels"></line-chart>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      package: null,
      packageName: '',
      period: 'last-month',
      loaded: false,
      downloads: [],
      labels: [],
      showError: false,
      errorMessage: 'Please enter a package name',
    };
  }
};
</script>
