<template>
  <v-sheet>
    <app-left-drawer />
    <app-bar />
    <v-content>
      <v-container fluid>
        <app-toolbar />
        <router-view />
      </v-container>
    </v-content>
    <app-footer />
    <app-to-top />
  </v-sheet>
</template>

<script>
export default {
  name: "DefaultLayout",

  components: {},
  computed: {},
  watch: {},
  data: () => ({}),
  methods: {}
};
</script>

<style lang="scss"></style>
