import Vue from 'vue'
import Router from 'vue-router'
import homeComponent from '../components/homeComponent/homeComponent.vue'
import movieDetails from '../components/MovieDetailsComponent/movieDetailsComponent.vue'
import shopCar from '../components/shopCarComponent/shopCarComponent'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeComponent',
      component: homeComponent
    },
    {
      path: '/homeComponent',
      name: 'homeComponent',
      component: homeComponent
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
    }
  ]
})
