<template>
  <v-content>
    <vue-page-transition>
      <slot />
    </vue-page-transition>
  </v-content>
</template>

<script>
export default {
  name: "BasicLayout"
};
</script>

<style lang="scss"></style>
