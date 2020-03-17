<template>
  <v-theme-provider root>
    <v-app>
      <layout-default>
        <router-view />
      </layout-default>
    </v-app>
  </v-theme-provider>
</template>

<script>
import DefaultLayout from "@/layouts/Default";

export default {
  name: "App",

  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Stock Trader",
    // all titles will be injected into this template
    titleTemplate: "%s | Invest in a new future!"
  },

  components: {
    "layout-default": DefaultLayout
  },
  beforeMount() {
    if (this.$vuetify.theme.isDark && window.localStorage.vuex) {
      this.$vuetify.theme.isDark = JSON.parse(
        window.localStorage.vuex
      ).theme.dark;
    }
  }
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
