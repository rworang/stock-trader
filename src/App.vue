<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" color="#272727" app temporary dark>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-cash-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Stocks</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/portfolio">
          <v-list-item-action>
            <v-icon>mdi-briefcase</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Portfolio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-stop-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>End Day</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="mr-4">Stock Trader</v-toolbar-title>
      <v-btn elevation="0" class="text-capitalize" tile to="/">Stocks</v-btn>
      <v-btn elevation="0" class="text-capitalize" tile to="/portfolio">Portfolio</v-btn>
      <v-spacer></v-spacer>
      <v-btn elevation="0" class="text-capitalize" tile>End Day</v-btn>
      <v-btn elevation="0" class="text-capitalize" tile>Save &amp; Load</v-btn>
      <v-btn elevation="0" class="text-capitalize" tile>
<!--        <span class="currency">{{ $store.state.funds.toLocaleString() }}</span>-->
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {
    this.$store.dispatch('initStocks');
  },
  data: () => ({
    drawer: false,
    dropdown: ["Save Day", "Load Day"]
  })
};
</script>

<style lang="scss">
  .currency:before {
    content: "\0024"
  }
</style>