<template>
  <v-fab-transition>
    <v-btn
      v-scroll-to="'#app'"
      title="Go to top"
      bottom
      fixed
      right
      dark
      fab
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>
<script>
export default {
  name: "ToTopButton",

  computed: {},

  data: () => ({}),

  methods: {}
};
</script>
