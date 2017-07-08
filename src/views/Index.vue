<template>
  <div class="content">
    <titlebar></titlebar>
    <div class="container">
      <div class="search-container">
        <p class="input-field">
          <label class="input-label" for="search">Package Name:</label>
          <input
            type="search"
            name="search"
            class="input"
            placeholder="npm package name"
            v-on:keyup.enter="requestData"
            v-model="package">
        </p>
        <p class="input-field">
          <label class="input-label" for="start-date">Start Date:</label>
          <datepicker
            name="start-date"
            input-class="input"
            placeholder="Select start date"
            v-model="periodStart"></datepicker>
        </p>
        <p class="input-field">
          <label class="input-label" for="end-date">End Date:</label>
          <datepicker
            name="end-date"
            input-class="input"
            placeholder="Select end date"
            v-model="periodEnd"></datepicker>
        </p>
        <button
          v-on:click="requestData"
          class="input-button">Find</button>
      </div>
      <div v-if="showResult" class="chart-container">
        <error-message v-if="showError" v-bind:error-message="errorMessage"></error-message>
        <div v-if="loaded" class="chart">
          <h1 class="chart-title">{{packageName}}</h1>
          <span class="chart-info">Downloads per Day <span v-show="periodStart">from {{formattedPeriod}}</span></span>
          <div class="chart-content">
            <line-chart
              v-bind:chart-data="downloads"
              v-bind:chart-labels="labels"></line-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Datepicker from 'vuejs-datepicker';
import Titlebar from '@/containers/Titlebar';
import LineChart from '@/components/LineChart';
import ErrorMessage from '@/components/ErrorMessage';
import { dateToDay, dateBeautify } from '../utils/dateFormatter';

export default {
  components: {
    Titlebar,
    LineChart,
    ErrorMessage,
    Datepicker,
  },
  name: 'index',
  data() {
    return {
      downloads: [],
      errorMessage: 'Please enter a package name',
      labels: [],
      loaded: false,
      package: null,
      packageName: '',
      periodEnd: new Date(),
      periodStart: '',
      showError: false,
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
    showResult() {
      if (this.loaded && !this.showError) return true;
      if (this.showError && !this.loaded) return true;
      return false;
    },
  },
  methods: {
    resetState() {
      this.loaded = false;
      this.showError = false;
    },
    requestData() {
      if (this.package === null || this.package === '' || this.package === 'undefined') {
        this.errorMessage = 'Please search for a package';
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
.content {
  height: 100%;
}

.container {
  padding: 2.5em;
}

.search-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2em;
}

@media (min-width: 50em) {
  .search-container {
    justify-content: center;
  }
}

.input-field {
  margin: 0 0 .5em;
}

@media (max-width: 50em) {
  .input-field {
    width: 100%;
  }

  .input-field:nth-child(2) {
    padding-right: .25em;
    width: 50%;
  }

  .input-field:nth-child(3) {
    padding-left: .25em;
    width: 50%;
  }
}

@media (min-width: 50em) {
  .input-field {
    margin: 0 .5em;
  }
}

.input-label {
  display: block;
  font-weight: 700;
  margin-bottom: .15em;
}

.input {
  border: .0625em solid #0d968a;
  padding: .5em 1em;
  width: 100%;
}

.input-button {
  align-self: flex-end;
  border: 0;
  background: #0d968a;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  padding: .65em 2em;
}

.input-button:hover,
.input-button:focus {
  background: #0b736a;
}

@media (max-width: 50em) {
  .input-button {
    width: 100%;
  }
}

.chart-container {
  border: .0625em solid rgba(0, 0, 0, .12);
  box-shadow: 0 0 1em 0 rgba(6, 56, 51, .12);
  padding: .75em;
}

.chart-title {
  display: inline-block;
  font-size: 1.5em;
  text-transform: uppercase;
  vertical-align: baseline;
  margin: 0 .5em 1em 0;
}
</style>
