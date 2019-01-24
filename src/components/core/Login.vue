<template>
  <v-container fill-height fluid>
    <v-layout justify-center align-center>
      <v-flex xs12 sm8 md6 lg4>
        <material-card :img="logo" :text="$t('Core.Login.text')" color="green" :title="$t('Core.Login.title')">
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="fa-user" label="手机号" v-model="mobile" type="text" v-on:keyup.enter="$refs.password.focus()"></v-text-field>
              <v-text-field ref="password" prepend-icon="fa-lock" label="密码" v-model="plainPassword" id="password" type="password" v-on:keyup.enter="onClickLogin"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="onClickLogin" color="secondary">登录</v-btn>
          </v-card-actions>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<style scoped>

</style>

<script>
import global from '@/global'
import { loginAdmin } from '@/services'
import md5 from 'js-md5'

export default {
  data () {
    return {
      mobile: '',
      plainPassword: '',
      logo: './img/logo.png'
    }
  },
  computed: {
    password() { return md5(this.plainPassword) }
  },
  methods: {
    async onClickLogin() {
      if (!this.mobile || !this.password) return

      // clear local storage first to avoid unauthorized error
      global.clearStorage()

      var x = await loginAdmin(this.mobile, this.password)
      if (!x) return
      this.admin = x
      global.saveAdmin(this.admin)

      let returnURL = this.$route.query.returnurl
      if (returnURL) {
        window.location.replace(window.decodeURIComponent(returnURL))
      } else {
        // if it's launched from other app
        // the history is 1, so after login, stay in current page
        if (window.history.length === 1) {
          window.location.reload()
        } else {
          window.location.replace('/')
        }
      }
    }
  }
}
</script>
