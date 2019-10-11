import Vue from 'vue'
import Router from 'vue-router'
import homeComponent from '../components/homeComponent/homeComponent.vue'
import movieDetails from '../components/MovieDetailsComponent/movieDetailsComponent.vue'
import shopCar from '../components/shopCarComponent/shopCarComponent'
import commingSoon from '../components/comingSoonComponent/commingSoonComponent'
import hotNow from '../components/hotNowComponent/hotNowComponent'
import find from '../components/findComponent/findComponent'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeComponent',
      component: homeComponent
    },
    {
      path:'/commingSoon',
      name:'commingSoon',
      component:commingSoon
    },
    {
      path:"/hotNow",
      name:'hotNow',
      component:hotNow
    },
    {
      path:'/movieDetails',
      name:movieDetails,
      component:movieDetails
    },
    {
      path:'/shopCar',
      name:shopCar,
      component:shopCar
    },
    {
      path:'/find',
      name:"find",
      component:find
    }
  ]
})
