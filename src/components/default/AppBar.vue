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
      color="transparent"
      elevation="0"
      class="text-capitalize"
      tile
      @click.stop="rapport = !rapport"
    >
      <span class="currency">{{ $store.getters.funds.toLocaleString() }}</span>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: "AppBar",

  computed: {
    rapport: {
      get() {
        return this.$store.getters.rapport;
      },
      set() {
        this.$store.dispatch("toggleRapport");
      }
    },
    mini: {
      get() {
        return this.$store.getters.mini;
      },
      set() {
        this.$store.dispatch("toggleMini");
      }
    },
    vuetifyTheme() {
      return this.$vuetify.theme.isDark;
    }
  },

  data: () => ({}),

  methods: {}
};
</script>
