<template>
  <v-theme-provider root>
    <v-app>
      <app-left-drawer />

      <app-bar />

      <v-content>
        <v-container fluid class="py-0" style="height:100%;">
          <v-row style="height:100%;">
            <v-slide-x-transition>
              <v-col :cols="mini && rapport ? 9 : 12">
                <v-row
                  :class="
                    $vuetify.theme.dark ? 'border-light-b' : 'border-dark-b'
                  "
                  class="mb-3"
                >
                  <v-col class="py-0">
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
                    <v-scale-transition origin="right">
                      <app-page-header
                        v-if="$root._route.name === 'stocks'"
                        :page="$root._route.name"
                        :rapport="rapport.get"
                      ></app-page-header>
                    </v-scale-transition>
                  </v-col>
                </v-row>
                <router-view :rapport="rapport.get"></router-view>
              </v-col>
            </v-slide-x-transition>
            <v-col cols="3" class="p-relative">
              <v-slide-x-transition>
                <v-navigation-drawer
                  v-if="mini && rapport"
                  :class="$vuetify.theme.dark ? 'dark-2' : 'grey lighten-3'"
                  width="100%"
                  absolute
                  permanent
                  right
                >
                  <template v-slot:prepend>
                    <v-list-item two-line>
                      <v-list-item-avatar>
                        <v-img
                          aspect-ratio="1"
                          class="grey lighten-2"
                          max-height="40"
                        >
                          <template v-slot:placeholder>
                            <v-row
                              class="fill-height ma-0"
                              align="center"
                              justify="center"
                            >
                              <v-icon small color="grey">mdi-image</v-icon>
                            </v-row>
                          </template>
                        </v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>John Doe</v-list-item-title>
                        <v-list-item-subtitle>
                          <span class="currency">{{
                            $store.getters.funds.toLocaleString()
                          }}</span></v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </template>

                  <v-divider></v-divider>

                  <!--                  <v-list dense>-->
                  <!--                    <v-list-item v-for="item in items" :key="item.title">-->
                  <!--                      <v-list-item-icon>-->
                  <!--                        <v-icon>{{ item.icon }}</v-icon>-->
                  <!--                      </v-list-item-icon>-->

                  <!--                      <v-list-item-content>-->
                  <!--                        <v-list-item-title>{{ item.title }}</v-list-item-title>-->
                  <!--                      </v-list-item-content>-->
                  <!--                    </v-list-item>-->
                  <!--                  </v-list>-->
                </v-navigation-drawer>
              </v-slide-x-transition>
            </v-col>
          </v-row>
        </v-container>
      </v-content>

      <app-footer />

      <!-- Go to top button-->
      <v-fab-transition>
        <v-btn
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
import AppBar from "@/components/app/AppBar";
import LeftDrawer from "@/components/app/LeftDrawer";
import Footer from "@/components/app/Footer";
import PageHeader from "@/components/PageHeader";

export default {
  name: "App",
  components: {
    "app-bar": AppBar,
    "app-left-drawer": LeftDrawer,
    "app-footer": Footer,
    "app-page-header": PageHeader
  },
  beforeMount() {
    if (this.$vuetify.theme.isDark && window.localStorage.vuex) {
      this.$vuetify.theme.isDark = JSON.parse(
        window.localStorage.vuex
      ).theme.dark;
    }
  },
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
    ]
  }),
  methods: {}
};
</script>

<style lang="scss">
.currency:before {
  content: "\0024";
  color: grey;
}
.dark-2 {
  background: #303034 !important;
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
