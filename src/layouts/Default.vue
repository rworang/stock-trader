<template>
  <div>
    <app-left-drawer />
    <app-bar />
    <v-content>
      <v-container fluid class="mb-12">
        <app-toolbar />
        <v-fade-transition>
          <slot />
        </v-fade-transition>
      </v-container>
    </v-content>
    <app-footer />
    <app-to-top />
  </div>
</template>

<script>
import AppBar from "@/components/default/AppBar";
import LeftDrawer from "@/components/default/LeftDrawer";
import Toolbar from "@/components/default/Toolbar";
import Footer from "@/components/default/Footer";
import ToTopButton from "@/components/default/ToTopButton";

export default {
  name: "DefaultLayout",

  components: {
    "app-bar": AppBar,
    "app-left-drawer": LeftDrawer,
    "app-toolbar": Toolbar,
    "app-footer": Footer,
    "app-to-top": ToTopButton
  },

  computed: {},
  watch: {},
  data: () => ({}),
  methods: {}
};
</script>

<style lang="scss"></style>
