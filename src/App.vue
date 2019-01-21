<template>
  <v-app>
    <core-filter />

    <core-toolbar />

    <core-drawer />

    <core-view />

    <core-loading v-model="showProgress" />

    <v-snackbar
      v-model="snackbar"
      multi-line
      top
      :color="isError ? 'error' : 'success'"
    >
      {{message}}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        <v-icon>fa fa-times</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
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
      console.log('on loading started...')
      this.showProgress = true
    },
    onLoadingDone() {
      console.log('on loading stopped!')
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
