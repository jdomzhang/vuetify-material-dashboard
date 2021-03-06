// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'

// Sync store with router
sync(store, router)

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$locale', {
  get: function () {
    return i18n.locale
  },
  set: function (locale) {
    i18n.locale = locale
  }
})

Object.defineProperty(Vue.prototype, '$title', {
  get: function () {
    return document.title
  },
  set: function (value) {
    document.title = value
  }
})

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
