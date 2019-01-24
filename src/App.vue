<template>
  <v-app>
    <template v-if="isAdmin">
      <core-filter />

      <core-toolbar />

      <core-drawer />

      <core-view />
    </template>
    <template v-else>
      <core-login />
    </template>

    <core-loading v-model="showProgress" />

    <v-snackbar
      v-model="snackbar"
      multi-line
      top
      dark
      :color="isError ? 'error' : 'success'"
    >
      <v-icon
        color="white"
        class="mr-3"
      >
        mdi-alert
      </v-icon>
      <div> {{message}} </div>
      <v-icon
        size="16"
        @click="snackbar = false"
      >
        mdi-close-circle
      </v-icon>
    </v-snackbar>
  </v-app>
</template>

<style lang="stylus">
@import '~@/styles/index.styl'

.v-datatable thead th.column.sortable i
  vertical-align: unset
</style>

<script>
import global from '@/global'

export default {
  data () {
    return {
      snackbar: false,
      isError: true,
      message: '',
      showProgress: false
    }
  },

  computed: {
    isAdmin () {
      return global.isAdminLoggedIn()
    }
  },

  methods: {
    showError (msg) {
      this.message = msg
      this.isError = true
      this.snackbar = true
    },
    showSuccess (msg) {
      this.message = msg
      this.isError = false
      this.snackbar = true
    },
    onLoading() {
      this.showProgress = true
    },
    onLoadingDone() {
      this.showProgress = false
    }
  },

  created () {
    global.eventBus.$on('error', this.showError)
    global.eventBus.$on('success', this.showSuccess)
    global.eventBus.$on('loadingon', this.onLoading)
    global.eventBus.$on('loadingoff', this.onLoadingDone)
  },

  beforeDestroy () {
    global.eventBus.$off('error', this.showError)
    global.eventBus.$off('success', this.showSuccess)
    global.eventBus.$off('loadingon', this.onLoading)
    global.eventBus.$off('loadingoff', this.onLoadingDone)
  }
}
</script>
