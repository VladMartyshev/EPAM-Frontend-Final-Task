import Vue from 'vue'
import Vuex from 'vuex'

import slider from './modules/slider'
import galery from './modules/galery'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    slider,
    galery,
  }
})