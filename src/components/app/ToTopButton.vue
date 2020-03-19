<template>
  <div
    style="max-width:56px;position:fixed;right:0;bottom:0;z-index:4;"
    class="mr-3 mb-2"
  >
    <template>
      <v-fab-transition>
        <v-btn @click="$vuetify.goTo('#app')" title="Scroll up" dark fab>
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>
    <template>
      <v-fab-transition>
        <v-btn @click="$vuetify.goTo('#footer')" title="Scroll down" dark fab>
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>
      </v-fab-transition>
    </template>
  </div>
</template>
<script>
export default {
  name: "ToTopButton",

  computed: {},

  data: () => ({}),

  methods: {}
};
</script>
