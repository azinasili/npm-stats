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
        v-model="package">
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
import axios from 'axios';
import LineChart from '@/components/LineChart';

export default {
  components: {
    'line-chart': LineChart,
  },
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
  },
  methods: {
    resetState() {
      this.loaded = false;
      this.showError = false;
    },
    requestData() {
      if (this.package === null || this.package === '' || this.package === 'undefined') {
        this.showError = true;
        return;
      }
      this.resetState();
      axios.get(`https://api.npmjs.org/downloads/range/${this.period}/${this.package}`)
        .then((response) => {
          console.log(response.data);
          this.downloads = response.data.downloads.map(download => download.downloads);
          this.labels = response.data.downloads.map(download => download.day);
          this.packageName = response.data.package;
          this.setURL();
          this.loaded = true;
          this.package = '';
        })
        .catch((err) => {
          this.errorMessage = err.response.data.error;
          this.showError = true;
        });
    },
    setURL() {
      history.pushState({ info: `npm-stats ${this.package}` }, this.package, `/#/${this.package}`);
    },
  },
  mounted() {
    if (this.$route.params.package) {
      this.package = this.$route.params.package;
      this.requestData();
    }
  },
};
</script>
