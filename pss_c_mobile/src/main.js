// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import {
    sync
} from 'vuex-router-sync';
import createStore from "./store/index";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import axios from 'axios';

Vue.prototype.$axios = axios;
Vue.prototype.shopId = 1;
Vue.config.productionTip = false

const store = createStore();

sync(store, router);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
