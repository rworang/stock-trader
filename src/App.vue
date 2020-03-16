<template>
  <v-theme-provider root>
    <v-app>
      <v-navigation-drawer
        v-model="drawer"
        class="grey darken-4"
        :mini-variant="mini"
        permanent
        fixed
        dark
        app
      >
        <v-list
          dense
          class="flex-column py-0"
          height="100%"
          transition="slide-x-transition"
        >
          <v-list-item @click.stop="mini = !mini">
            <v-list-item-action>
              <v-icon v-if="mini">mdi-chevron-double-right</v-icon>
              <v-icon v-else>mdi-close</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="title">
                {{ $appName }}
              </v-list-item-title>
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
          <v-dialog v-model="dialog" persistent max-width="420">
            <template v-slot:activator="{ on }">
              <v-list-item link v-on="on">
                <v-list-item-action>
                  <v-icon>mdi-alert-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Clear local storage</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-card>
              <v-card-title class="headline pb-2"
                >Clear local storage?</v-card-title
              >
              <v-card-text class="py-2">
                Clearing local storage will result in deletion of all saved
                state data, this includes
                <strong>portfolio</strong> data.<br /><br />
                Pressing "Clear storage" will reload the page.</v-card-text
              >
              <v-card-actions class="pt-2">
                <v-spacer></v-spacer>
                <v-btn color="white darken-3" text @click="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn color="red darken-4" text @click="clearStorage"
                  >Clear storage</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list>
        <template slot="append">
          <v-list transition="slide-x-transition" class="py-0">
            <v-list-item @click="$vuetify.theme.dark = !$vuetify.theme.dark">
              <v-list-item-action>
                <v-icon :color="$vuetify.theme.dark ? 'primary' : ''">
                  mdi-brightness-4
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Light/dark theme</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>

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
          @click.stop="drawerPortfolio = !drawerPortfolio"
        >
          <span class="currency">{{
            $store.getters.funds.toLocaleString()
          }}</span>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawerPortfolio"
        class="grey darken-4"
        width="100%"
        temporary
        right
        dark
        app
      >
        <v-list>
          <v-list-item @click.stop="drawerPortfolio = !drawerPortfolio">
            <v-list-item-icon>
              <v-icon>mdi-close</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              Close
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-content>
        <v-container class="mb-3">
          <v-row>
            <v-col>
              <v-tabs>
                <v-tab
                  v-for="(tab, index) in tabs"
                  :key="tab.value + index"
                  elevation="0"
                  class="text-capitalize"
                  tile
                  :to="tab.to"
                  >{{ tab.value }}</v-tab
                >
              </v-tabs>
            </v-col>
            <v-scale-transition origin="center center 0">
              <app-page-header
                v-if="$root._route.name === 'stocks'"
                :page="$root._route.name"
                :sort-now="sortNow"
              ></app-page-header>
            </v-scale-transition>
          </v-row>

          <router-view></router-view>
        </v-container>
      </v-content>

      <v-footer dark>
        <v-row>
          <v-col class="white--text text-center">
            {{ $appName + " &copy; " + $date().format("YYYY") }}
          </v-col>
        </v-row>
      </v-footer>

      <v-fab-transition>
        <v-btn
          v-if="!drawerPortfolio"
          title="Go to top"
          fixed
          bottom
          right
          fab
          v-scroll-to="'#app'"
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-app>
  </v-theme-provider>
</template>

<script>
import PageHeader from "@/components/PageHeader";

export default {
  name: "App",
  components: {
    "app-page-header": PageHeader
  },
  created() {
    // this.$store.dispatch("initStocks");
    // console.log(this.$root._route.name);
  },
  watch: {
    $route() {
      this.mini = true;
    }
  },
  computed: {},
  data: () => ({
    tabs: [
      {
        value: "stocks",
        to: "/"
      },
      {
        value: "portfolio",
        to: "/portfolio"
      }
    ],
    sortNow: false,
    hidden: false,
    dialog: false,
    drawer: false,
    mini: true,
    drawerPortfolio: false,
    dropdown: ["Save Day", "Load Day"]
  }),
  methods: {
    clearStorage() {
      window.localStorage.removeItem("vuex");
      this.dialog = false;
      setTimeout(() => {
        location.reload();
      }, 250);
    },
    saveDay() {
      // console.log("Save day");
    },
    loadDay() {
      // console.log("Load day");
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
