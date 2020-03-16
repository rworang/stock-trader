<template>
  <v-theme-provider root>
    <v-app>
      <!--# START: main (left) navigation drawer-->
      <v-navigation-drawer
        v-model="drawer"
        class="grey darken-4"
        :mini-variant="mini"
        permanent
        fixed
        dark
        app
      >
        <!--## START: drawerItems loop -->
        <v-list
          dense
          class="flex-column py-0"
          height="100%"
          transition="slide-x-transition"
        >
          <div v-for="item in drawerItems" :key="item.id">
            <!--##- check item type 'title', enables menu toggling on item click -->
            <template v-if="item.type === 'title'">
              <v-fade-transition>
                <v-list-item @click.stop="mini = !mini">
                  <v-list-item-action>
                    <v-scale-transition>
                      <v-icon v-if="mini">{{ item.icon }}</v-icon>
                      <v-icon v-else>mdi-close</v-icon>
                    </v-scale-transition>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title class="title">
                      {{ item.value }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-fade-transition>
            </template>
            <!--##- check item type 'link', drawerItem needs to have 'to' property can be empty -->
            <template v-if="item.type === 'link'">
              <v-fade-transition>
                <v-list-item link :to="item.to" :title="item.value">
                  <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.value }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-fade-transition>
            </template>
          </div>
        </v-list>
        <!--## END: drawerItems loop -->

        <!--## START: main drawer append (clear cache & theme toggle) -->
        <template slot="append">
          <v-list class="py-0">
            <!--### START: clear local storage link, opens dialog for confirmation -->
            <v-dialog v-model="dialog" persistent max-width="420">
              <template v-slot:activator="{ on }">
                <v-fade-transition>
                  <v-list-item link v-on="on" title="Clear local storage">
                    <v-list-item-action>
                      <v-icon>mdi-alert-circle</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Clear local storage</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-fade-transition>
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
                  <v-btn text @click="dialog = false">Cancel</v-btn>
                  <v-btn color="red darken-4" text @click="clearStorage"
                    >Clear storage</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!--### END: clear local storage link, opens dialog for confirmation -->

            <!--### START: rapport panel toggler -->
            <v-fade-transition>
              <v-list-item
                @click="rapport = !rapport"
                title="Toggle rapport panel"
              >
                <v-list-item-action>
                  <v-icon :color="rapport ? 'primary' : ''">
                    mdi-clipboard-text
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Toggle rapport panel</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-fade-transition>
            <!--### END: rapport panel toggler -->

            <!--### START: theme toggler -->
            <v-fade-transition>
              <v-list-item
                @click="$vuetify.theme.isDark = !$vuetify.theme.isDark"
                title="Toggle theme"
              >
                <v-list-item-action>
                  <v-icon :color="vuetifyTheme ? 'primary' : ''">
                    mdi-brightness-4
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Toggle theme</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-fade-transition>
            <!--### END: theme toggler -->
          </v-list>
        </template>
        <!--## END: main drawer append (clear cache & theme toggle) -->
      </v-navigation-drawer>
      <!--# END: main (left) navigation drawer-->

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
        <v-container fluid class="py-0" style="height:100%;">
          <v-row style="height:100%;">
            <v-slide-x-transition>
              <v-col
                v-if="mini && rapport"
                cols="3"
                class="p-relative"
                :class="
                  $vuetify.theme.dark
                    ? 'border-light-r grey darken-3'
                    : 'border-dark-r grey lighten-3'
                "
              >
                <div class="p-fixed">
                  <v-row>
                    <v-col>
                      <span class="title">Stocks rapport</span>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-slide-x-transition>
            <v-fade-transition>
              <v-col :cols="mini && rapport ? 9 : 12">
                <v-row
                  :class="
                    $vuetify.theme.dark ? 'border-light-b' : 'border-dark-b'
                  "
                  class="mb-3"
                >
                  <v-col xs="12" md="6" class="py-0">
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
                  <v-col class="py-0">
                    <v-scale-transition origin="center center 0">
                      <app-page-header
                        v-if="$root._route.name === 'stocks'"
                        :page="$root._route.name"
                        :sort-now="sortNow"
                      ></app-page-header>
                    </v-scale-transition>
                  </v-col>
                </v-row>
                <router-view></router-view>
              </v-col>
            </v-fade-transition>
          </v-row>
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
          dark
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
  beforeMount() {
    console.log(
      "BEFORE_MOUNT: ",
      JSON.parse(window.localStorage.vuex).theme.dark
    );
    console.log(this.$vuetify.theme.isDark);
    if (this.$vuetify.theme.isDark) {
      this.$vuetify.theme.isDark = JSON.parse(
        window.localStorage.vuex
      ).theme.dark;
    }
    console.log(this.$vuetify.theme.isDark);
  },
  created() {
    // this.$store.dispatch("initStocks");
    // console.log(this.$root._route.name);
  },
  computed: {
    vuetifyTheme() {
      return this.$vuetify.theme.isDark;
    }
  },
  watch: {
    $route() {
      this.mini = true;
    },
    vuetifyTheme() {
      this.$store.dispatch("toggleTheme", this.$vuetify.theme.isDark);
    }
  },
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
    rapport: false,
    drawer: false,
    mini: true,
    drawerPortfolio: false,
    dropdown: ["Save Day", "Load Day"],
    drawerItems: [
      {
        id: 0,
        type: "title",
        value: "Stock Trader",
        icon: "mdi-chevron-double-right"
      },
      {
        id: 1,
        type: "link",
        value: "Stocks",
        icon: "mdi-cash-multiple",
        to: "/"
      },
      {
        id: 2,
        type: "link",
        value: "Portfolio",
        icon: "mdi-briefcase",
        to: "/portfolio"
      },
      {
        id: 3,
        type: "link",
        value: "End Day",
        icon: "mdi-stop-circle-outline",
        to: ""
      }
    ]
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

.p-relative {
  position: relative;
}

.p-sticky {
  position: sticky;
}

.p-fixed {
  position: fixed;
}

.p-absolute {
  position: absolute;
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
