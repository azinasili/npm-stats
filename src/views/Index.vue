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
      <div class="search-dates">
        <datepicker
          class="search-input"
          name="start-date"
          placeholder="Start Date"
          v-model="periodStart"></datepicker>
        <datepicker
          class="search-input"
          name="end-date"
          placeholder="End Date"
          v-model="periodEnd"></datepicker>
      </div>
    </div>
    <div v-if="showError" class="error-message">{{errorMessage}}</div>
    <h1 v-if="loaded" class="title">{{packageName}}</h1>
    <div v-if="loaded" class="chart-container">
      <div class="chart-title">Downloads per Day <span v-show="periodStart">from {{formattedPeriod}}</span></div>
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
import Datepicker from 'vuejs-datepicker';
import LineChart from '@/components/LineChart';
import {
  dateToDay,
  dateBeautify,
} from '../utils/dateFormatter';

export default {
  components: {
    LineChart,
    Datepicker,
  },
  name: 'index',
  data() {
    return {
      package: null,
      packageName: '',
      periodStart: '',
      periodEnd: new Date(),
      loaded: false,
      downloads: [],
      labels: [],
      showError: false,
      errorMessage: 'Please enter a package name',
    };
  },
  computed: {
    formattedStart() {
      return dateToDay(this.periodStart);
    },
    formattedEnd() {
      return dateToDay(this.periodEnd);
    },
    formattedPeriod() {
      return this.periodStart ? `${dateBeautify(this.formattedStart)} - ${dateBeautify(this.formattedEnd)}` : 'last-month';
    },
    period() {
      return this.periodStart ? `${this.formattedStart}:${this.formattedEnd}` : 'last-month';
    },
  },
  methods: {
    resetState() {
      this.loaded = false;
      this.showError = false;
    },
    requestData() {
      if (this.package === null || this.package === '' || this.package === 'undefined') {
        this.errorMessage = 'please search for a package';
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

<style>
.search-input {
  display: inline-block;
}
</style>
