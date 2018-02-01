import Vue from 'vue'
import Vuex from 'vuex'

import slider from './modules/slider'
import galery from './modules/galery'
import tours from './modules/tours'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    slider,
    galery,
    tours,
  }
})