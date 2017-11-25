// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import LRUCache from 'lru-cache';
import { DateTime } from 'luxon';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const cache = new LRUCache(100, 30 * 6000);

const api = {
  request: ({ method = 'GET', data = {}, timeout = 5000, path = '' }, success, error) => {
    const cacheByPath = cache.get(path);
    if (cacheByPath) {
      success(cacheByPath);
    } else {
      const url = `http://localhost:8000/${path}`;
      Vue.prototype.$http({
        method,
        url,
        data,
        timeout,
      }).then((response) => {
        cache.set(path, response);
        success(response);
      }).catch((e) => {
        error(e);
      });
    }
  },
  search: ({ keyword = '' }, success, error) => {
    const path = `?command=search&keyword=${keyword}`;
    return api.request({ path, timeout: 100000 }, success, error);
  },
  location: ({ woeid = '' }, success, error) => {
    const path = `?command=location&woeid=${woeid}`;
    return api.request({ path, timeout: 100000 }, success, error);
  },
};

Vue.prototype.$api = api;
Vue.prototype.$DateTime = DateTime;

Vue.filter('round', (value) => {
  if (!value) return '';
  return Number((value).toFixed(1));
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
