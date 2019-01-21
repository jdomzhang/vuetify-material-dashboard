<template>
  <v-container
    fill-height
    fluid
  >
    <v-layout
      justify-center
      align-center
    >
      <v-flex xs12>
        <material-card
          :text="$t('Views.SayHello.callAPI')"
          color="green"
          title="Rest API"
        >
          <v-card-text>
            <v-btn color="secondary">{{ $t('Views.SayHello.hello') }}
            </v-btn>

          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang='scss' scoped>

</style>

<script>
export default {
  data () {
    return {}
  }
}
</script>
