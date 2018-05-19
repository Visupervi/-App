import Vue from 'vue'
import Router from 'vue-router'
import homeComponent from '../components/homeComponent/homeComponent.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeComponent',
      component: homeComponent
    }
  ]
})
