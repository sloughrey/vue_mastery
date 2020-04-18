import Vue from 'vue'
import VueRouter from 'vue-router'
import EventCreate from '../views/EventCreate.vue'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList
  },
  {
    component: EventShow,
    name: 'event-show',
    path: '/event/:id',
    props: true // allows dynamic props from the url be passed into the EventShow component
    //alias: '/show_event/:id' // this alias path will load content from /event page
  },
  {
    // example redirect
    path: '/event-create',
    name: 'event-create',
    component: EventCreate
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
