<template>
  <span>
    <app-left-drawer />
    <app-bar />
    <v-content>
      <v-container fluid class="py-0">
        <app-toolbar />
        <v-container>
          <slot />
        </v-container>
      </v-container>
    </v-content>
    <app-footer />
    <app-to-top />
  </span>
</template>

<script>
import AppBar from "@/components/app/AppBar";
import LeftDrawer from "@/components/app/LeftDrawer";
import Toolbar from "@/components/app/Toolbar";
import Footer from "@/components/app/Footer";
import ToTopButton from "@/components/app/ToTopButton";

export default {
  name: "DefaultLayout",

  components: {
    "app-bar": AppBar,
    "app-left-drawer": LeftDrawer,
    "app-toolbar": Toolbar,
    "app-footer": Footer,
    "app-to-top": ToTopButton
  }
};
</script>

<style lang="scss"></style>
