/**
 * Vue i18n
 *
 * @library
 *
 * http://kazupon.github.io/vue-i18n/en/
 */

// Lib imports
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/lang/messages'
import dateTimeFormats from '@/lang/datetime'

Vue.use(VueI18n)

const i18n = new VueI18n({
  // locale: 'en-US',
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  messages,
  dateTimeFormats
})

export default i18n
