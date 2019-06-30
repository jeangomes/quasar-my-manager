<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item to="/books" exact>
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>

          <q-item-section>
            Books
          </q-item-section>
        </q-item>
        <q-item to="/book/new" exact>
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>

          <q-item-section>
            New Book
          </q-item-section>
        </q-item>
        <q-item to="/purchase/new" exact>
          <q-item-section avatar>
            <q-icon name="money" />
          </q-item-section>

          <q-item-section>
            Purchases
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
