import axios from 'axios'
import Vue from 'vue'

let eventBus = new Vue({})
// Vue.prototype.internalEventBus = eventBus

export default {
  eventBus: eventBus,
  showError (msg) {
    this.eventBus.$emit('error', msg)
  },
  showSuccess (msg) {
    this.eventBus.$emit('success', msg)
  },
  saveAdmin (admin) {
    localStorage.setItem('admin', JSON.stringify(admin))
  },
  restoreAdmin (admin) {
    return JSON.parse(localStorage.getItem('admin'))
  },
  saveJwt (jwt) {
    localStorage.setItem('adminjwt', jwt)
  },
  restoreJwt () {
    return localStorage.getItem('adminjwt')
  },
  // clearJwt () {
  //   localStorage.removeItem('adminjwt')
  // },
  clearStorage () {
    localStorage.clear()
  },
  isAdminLoggedIn () {
    return this.getTokenPayload().isValidAdmin
  },
  isAdminExpired () {
    return this.getTokenPayload().isExpiredAdmin
  },
  isOperator () {
    return this.getTokenPayload().isOperator
  },
  isSystemAdmin () {
    return this.getTokenPayload().isSystemAdmin
  },
  authError () {
    var message = '您没有足够的权限，或者登录已超时，请重新登录'
    this.showError(message)
    localStorage.clear()
    window.location.replace('/')
    alert(message)
  },
  getTokenPayload  () {
    var token = this.restoreJwt()
    if (!token) return {}
    try {
      var obj = JSON.parse(atob(token.replace(/.+\.(\w+)\..+/, '$1')))
      var isAdmin = obj.aid > 0
      var isExpired = (obj.exp < Date.now() / 1000)
      var isVisitor = !!obj.visitor
      var isValidAdmin = isAdmin && !isExpired
      var isExpiredAdmin = isAdmin && isExpired
      var isSystemAdmin = obj.at1 && isValidAdmin
      var isOperator = obj.at2 && isValidAdmin
      var isSalesPerson = obj.at3 && isValidAdmin
      return {
        token,
        isAdmin,
        isExpired,
        isValidAdmin,
        isExpiredAdmin,
        isVisitor,
        isSystemAdmin,
        isOperator,
        isSalesPerson,
        ...obj
      }
    } catch (error) {
      return {}
    }
  },
  // ajaxLoading: false,
  createAxios () {
    var instance = axios.create()
    var payload = this.getTokenPayload() || {}
    var admin = this.restoreAdmin() || {}
    // check admin & adminjwt
    // to avoid 后退 issue
    if (payload.aid && payload.aid && payload.aid !== admin.id) {
      this.authError()
      return
    }
    if (payload.token) {
      Object.assign(instance.defaults, {
        headers: {
          authorization: payload.token
        }
      })
    }

    instance.interceptors.request.use((config) => {
      this.eventBus.$emit('loadingon')
      return config
    }, (error) => {
      this.eventBus.$emit('loadingoff')
      return Promise.reject(error)
    })

    instance.interceptors.response.use(response => {
      this.eventBus.$emit('loadingoff')
      // console.log(response.headers.authorization)
      var newJwt = response.headers.authorization
      if (newJwt) {
        this.saveJwt(newJwt)
      }
      return response
    }, error => {
      this.eventBus.$emit('loadingoff')
      if (error.response && error.response.status === 401) {
        this.authError()
        return
      }

      var errmsg = ''
      if (error.response && error.response.status === 404) {
        errmsg = error.response.status + ' ' + error.response.statusText
      } else if (error.response && error.response.data) {
        if (error.response.data.error) {
          errmsg = error.response.data.error
        } else {
          errmsg = error.response.data
        }
      } else {
        errmsg = error
      }

      // this.eventBus.$emit('error', errmsg)
      this.showError(errmsg)

      // alert(errmsg)

      return error
    })
    return instance
  }
}
