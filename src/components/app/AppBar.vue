<template>
  <v-app-bar app dark dense elevation="0" class="grey darken-4">
    <v-fade-transition>
      <v-toolbar-title
        class="title pointer"
        @click.stop="mini = !mini"
        v-if="mini"
        >{{ $appName }}
      </v-toolbar-title>
    </v-fade-transition>
    <v-spacer></v-spacer>
    <v-btn
      elevation="0"
      class="text-capitalize"
      tile
      @click.stop="
        () => {
          rapport = !rapport;
          mini = true;
        }
      "
    >
      <span class="currency">{{ $store.getters.funds.toLocaleString() }}</span>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "AppBar",

  props: {
    rapport: {
      type: Boolean,
      default: false
    },
    mini: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({}),

  computed: {},

  methods: {}
};
</script>
