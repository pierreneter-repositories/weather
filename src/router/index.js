import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/Home';
import WeatherPage from '@/pages/Weather';
import SearchPage from '@/pages/Search';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/weather/:woeid',
      name: 'WeatherPage',
      component: WeatherPage,
    },
    {
      path: 'search/:keyword',
      name: 'SearchPage',
      component: SearchPage,
    },
  ],
});

export default router;
