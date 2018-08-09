import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters'
import actions from './actions'
import mutations from './mutations'



Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    state: {

    },
    getters,
    actions,
    mutations,
    modules: {
    },
  });
}
