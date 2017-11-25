<template>
  <div>
    <div class="container">
      <div class="row">
        <weather class="col-12 col-sm-4" v-for="woeid in weatherData" :key="woeid" :woeid="woeid"></weather>
      </div>
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
    </div>
  </div>
</template>
<script>
import Weather from '@/components/Weather';

export default {
  name: 'HomePage',
  data() {
    return {
      defaultList: ['Istanbul', 'Berlin', 'London', 'Helsinki', 'Dublin', 'Vancouver'],
      weatherData: [],
      keyword: '',
    };
  },
  created() {
    this.weatherData = [];
    this.defaultList.forEach((name) => {
      this.$api.search({ keyword: name }, (response) => {
        if (response.data && response.data.length) {
          this.weatherData.push(response.data[0].woeid);
        }
      }, () => {});
    });
  },
  components: {
    weather: Weather,
  },
};
</script>
