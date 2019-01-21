<template>
<v-layout row justify-center>
  <v-dialog v-model="value" persistent content content-class="centered-dialog">
    <v-container fill-height>
      <v-layout column justify-center align-center>
        <SemipolarSpinner :animation-duration="2000" :size="65" :color="progressColor" />
        <h1 class="headline" v-if="message != null">{{message}}</h1>
      </v-layout>
    </v-container>
  </v-dialog>
</v-layout>
</template>
<script>
import {
  SemipolarSpinner
} from 'epic-spinners'
export default {
  name: 'Loading',
  components: {
    SemipolarSpinner
  },
  data: function() {
    return {}
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default () {
        return this.$t('Core.Loading.loading')
      }
    },
    progressColor: {
      type: String,
      default: '#FFFFFF'
    }
  }
}
</script>

<style>
.v-dialog.centered-dialog {
  background: #282c2dad;
  box-shadow: none;
  border-radius: 6px;
  width: auto;
  color: whitesmoke;
}
</style>
