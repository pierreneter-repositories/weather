<template>
  <div class="weather-container">
    <router-link :to="{ name: 'WeatherPage', params: { woeid: woeid }}" class="weather" v-if="loaded">
      <div class="city-name"><strong>{{ weather.title }}</strong></div>
      <div class="temp">Temperature: {{weather.consolidated_weather[0].the_temp | round}}</div>
      <div class="min-temp">Minimum temperature: {{weather.consolidated_weather[0].min_temp | round}}</div>
      <div class="max-temp">Maximum temperature: {{weather.consolidated_weather[0].max_temp | round}}</div>
      <div class="icon"><img :src="getIcon(weather.consolidated_weather[0].weather_state_abbr)"></div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'weatherComponent',
  props: ['woeid'],
  data() {
    return {
      weather: {},
      loaded: false,
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
  .weather-container {
    padding: 10px;
    .weather {
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
