import Vue from 'vue'
import Router from 'vue-router'
import VueLazyLoad from 'vue-lazyload'
import Home from '@/components/Home'
import Tours from '@/components/Tours'
import Tour from '@/components/Tour'
import Galery from '@/components/Galery'

Vue.use(Router);
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  //error: 'dist/error.png',
  loading: require("./../assets/load.gif"),
  attempt: 1
})

export default new Router({
  routes: [
    {
		path: '/',
		name: 'Home',
		component: Home
    },
    {
    	path: '/tours',
    	name: 'Tours',
    	component: Tours,
    },
    {
    	path: '/tours/:name',
    	name: 'Tour',
    	component: Tour,
    },
    {
    	path: '/galery',
    	name: 'Galery',
    	component: Galery,
    }
  ]
})
