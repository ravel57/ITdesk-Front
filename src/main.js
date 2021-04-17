import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import { connect } from './util/ws'
// import router from './router'
import store from './store'

Vue.config.productionTip = false

connect()

Vue.use(VueResource)

new Vue({
  el: '#app',
  store,
  render: a => a(App)
})
