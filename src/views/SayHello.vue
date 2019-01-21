<template>
  <v-container fill-height fluid>
    <v-layout justify-center align-center>
      <v-flex xs12>
        <material-card :text="$t('Views.SayHello.callAPI')" color="green" title="Rest API">
          <v-card-text>
            <v-btn color="secondary" @click="onClickSayHello">{{ $t('Views.SayHello.hello') }}</v-btn>

            <h3>[{{timeStamp}}] {{ helloFromServer }}</h3>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang='scss' scoped>
</style>

<script>
import { sayHello } from '@/services'

export default {
  data() {
    return {
      helloFromServer: '',
      timeStamp: ''
    }
  },

  methods: {
    async onClickSayHello() {
      this.helloFromServer = await sayHello()
      this.timeStamp = new Date()
    }
  }
}
</script>
