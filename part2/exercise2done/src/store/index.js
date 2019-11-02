import Vue from "vue";
import Vuex from "vuex";

import stocks from './stocks'
import portfolio from './portfolio'
import * as actions from './common'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stocks,
    portfolio
    
  },
  actions
});
