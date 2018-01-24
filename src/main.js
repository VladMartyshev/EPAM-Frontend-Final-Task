import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import VueLazyLoad from 'vue-lazyload'
import VueTouch from 'vue-touch'

Vue.use(VueLazyLoad);
Vue.use(VueTouch, { name: 'v-touch' })

Vue.config.productionTip = false

window.app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

sync(store, router);
