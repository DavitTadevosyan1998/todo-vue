import Vue from 'vue'
import Router from 'vue-router'
import TodosBody from './components/TodosBody'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodosBody
    },
  ]
})
