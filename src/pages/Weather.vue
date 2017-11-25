<template>
  <div class="weather-container container">
    <div class="row">
      <div class="col-12">
        <router-link :to="{ name: 'HomePage' }" class="btn btn-primary">Back to home</router-link>
        <div class="city-name"><strong>{{ weather.title }}</strong></div>
      </div>
      <div class="col-12 col-sm-3 weather-day-container" v-for="weatherPerDay in weather.consolidated_weather" :key="weatherPerDay.applicable_date">
        <div class="weather-day">
          <div class="day-name"><strong>{{ $DateTime.fromISO(weatherPerDay.applicable_date).toFormat('cccc') }}</strong></div>
          <div class="date">{{ $DateTime.fromISO(weatherPerDay.applicable_date).toFormat('M-dd-yyyy') }}</div>
          <div class="temp">Temperature: {{weatherPerDay.the_temp | round}}</div>
          <div class="min-temp">Minimum temperature: {{weatherPerDay.min_temp | round}}</div>
          <div class="max-temp">Maximum temperature: {{weatherPerDay.max_temp | round}}</div>
          <div class="icon"><img :src="getIcon(weatherPerDay.weather_state_abbr)"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'weatherPage',
  data() {
    return {
      weather: {},
      loaded: false,
      woeid: this.$route.params.woeid,
    };
  },
  created() {
    this.$api.location({ woeid: this.woeid }, (response) => {
      if (response.data && response.data.consolidated_weather) {
        this.loaded = true;
        this.weather = response.data;
      }
    }, () => {});
  },
  methods: {
    getIcon(state) {
      return `https://www.metaweather.com//static/img/weather/png/64/${state}.png`;
    },
  },
};
</script>

<style lang="scss" scoped>
  .city-name {
    padding: 20px;
  }
  .weather-day-container {
    padding: 10px;
    .weather-day {
      display: block;
      height: 100%;
      padding: 20px;
      border-radius: 5px;
      border: 1px solid #000;
      &:hover {
        text-decoration: none;
      }
    }
  }
</style>
