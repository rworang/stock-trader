<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" color="#272727" app temporary dark>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ $appName }}
            </v-list-item-title>
            <v-list-item-subtitle class="font-italic">
              Invest in a new future!
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
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
      <v-toolbar-title class="mr-4">{{ $appName }}</v-toolbar-title>
      <v-btn elevation="0" class="text-capitalize" tile to="/">Stocks</v-btn>
      <v-btn elevation="0" class="text-capitalize" tile to="/portfolio"
        >Portfolio</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn elevation="0" class="text-capitalize" tile>End Day</v-btn>
      <v-menu offset-y left>
        <template v-slot:activator="{ on }">
          <v-btn elevation="0" v-on="on" class="text-capitalize">
            Save &amp; Load
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item @click="saveDay" class="text-capitalize">
            <v-list-item-icon class="mr-4">
              <v-icon>mdi-content-save</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Save Day</v-list-item-title>
          </v-list-item>
          <v-list-item @click="loadDay">
            <v-list-item-icon class="mr-4">
              <v-icon>mdi-download</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Load Day</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn elevation="0" class="text-capitalize" tile>
        <span class="currency">{{
          $store.getters.funds.toLocaleString()
        }}</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app absolute>
      <v-row>
        <v-col class="white--text text-center">
          {{ $appName + " &copy; " + $date().format("YYYY") }}
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {
    // this.$store.dispatch("initStocks");
  },
  data: () => ({
    drawer: false,
    dropdown: ["Save Day", "Load Day"]
  }),
  methods: {
    saveDay() {
      console.log("Save day");
    },
    loadDay() {
      console.log("Load day");
    }
  }
};
</script>

<style lang="scss">
.currency:before {
  content: "\0024";
  color: grey;
}

.pointer {
  cursor: pointer;
}

.border-radius-tl {
  border-top-left-radius: 12px !important;
}
.border-radius-bl {
  border-bottom-left-radius: 12px !important;
}
.border-radius-l {
  border-top-left-radius: 12px !important;
  border-bottom-left-radius: 12px !important;
}

.border-radius-tr {
  border-top-right-radius: 12px !important;
}
.border-radius-br {
  border-bottom-right-radius: 12px !important;
}
.border-radius-r {
  border-top-right-radius: 12px !important;
  border-bottom-right-radius: 12px !important;
}

.border-radius {
  border-radius: 12px !important;
}

.border-dark-y {
  border-top: solid 1px rgba(0, 0, 0, 0.1);
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}
.border-dark-x {
  border-left: solid 1px rgba(0, 0, 0, 0.1);
  border-right: solid 1px rgba(0, 0, 0, 0.1);
}
.border-dark-t {
  border-top: solid 1px rgba(0, 0, 0, 0.1);
}
.border-dark-r {
  border-right: solid 1px rgba(0, 0, 0, 0.1);
}
.border-dark-b {
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}
.border-dark-l {
  border-left: solid 1px rgba(0, 0, 0, 0.1);
}
.border-dark-a {
  border: solid 1px rgba(0, 0, 0, 0.1);
}

.border-light-y {
  border-top: solid 1px rgba(255, 255, 255, 0.1);
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
}
.border-light-x {
  border-left: solid 1px rgba(255, 255, 255, 0.1);
  border-right: solid 1px rgba(255, 255, 255, 0.1);
}
.border-light-t {
  border-top: solid 1px rgba(255, 255, 255, 0.1);
}
.border-light-r {
  border-right: solid 1px rgba(255, 255, 255, 0.1);
}
.border-light-b {
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
}
.border-light-l {
  border-left: solid 1px rgba(255, 255, 255, 0.1);
}
.border-light-a {
  border: solid 1px rgba(255, 255, 255, 0.1);
}

.slide-fast-enter {
  transform: translateY(-20px);
}
.slide-fast-enter-active {
  -webkit-animation: slide-fast-in 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-fast-in 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.slide-fast-leave-active {
  -webkit-animation: slide-fast-out 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: slide-fast-out 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.slide-enter {
  transform: translateY(-20px);
}
.slide-enter-active {
  -webkit-animation: slide-fast-in 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-fast-in 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.slide-leave-active {
  -webkit-animation: slide-fast-out 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-fast-out 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-fast-in {
  0% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-fast-out {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
    opacity: 0;
  }
}
</style>
