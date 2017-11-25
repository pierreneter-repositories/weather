<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="form-row align-items-center">
            <div class="col-auto">
              <input type="text" class="form-control mb-2 mb-sm-0" id="search" placeholder="Search ..." v-model="keyword">
            </div>
            <div class="col-auto">
              <router-link :to="{ name: 'SearchPage', params: { keyword: keyword }}" class="btn btn-primary">Search</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <weather class="col-12 col-sm-4" v-for="woeid in weatherData" :key="woeid" :woeid="woeid"></weather>
      </div>
      <div class="row" v-if="loaded && !weatherData.length">
        <div class="col-12">No results were found. Try changing the keyword!</div>
      </div>
    </div>
  </div>
</template>
<script>
import Weather from '@/components/Weather';

export default {
  name: 'HomePage',
  data() {
    return {
      weatherData: [],
      loaded: false,
      keyword: this.$route.params.keyword,
    };
  },
  mounted() {
    this.search();
  },
  watch: {
    '$route.params.keyword': function handleKeyword() {
      this.search();
    },
  },
  methods: {
    search() {
      this.weatherData = [];
      this.$api.search({ keyword: this.$route.params.keyword }, (response) => {
        if (response.data && response.data.length) {
          this.weatherData.push(response.data[0].woeid);
        }
        this.loaded = true;
      }, () => {});
    },
  },
  components: {
    weather: Weather,
  },
};
</script>
