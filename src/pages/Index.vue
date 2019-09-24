<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
    <pre>{{testVuex}}</pre>
    <q-btn label="Bolinha" @click="onReset" />
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  computed: {
    testVuex: function () {
      return this.$store.state.jean.book
    },
    testGetter: function () {
      return this.$store.getters.myGetter
    }
  },
  methods: {
    onReset () {
      // this.$store.commit('jean/someMutation', { 'bolinha': 'verde' })
      this.$store.dispatch('jean/myAction', { 'bolinha': 'verde' })
    }
  }
}
</script>
