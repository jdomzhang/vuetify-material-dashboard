import Vue from 'vue'
import Vuetify from 'vuetify'
import theme from './theme'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import i18n from '@/i18n'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  },
  theme
})
