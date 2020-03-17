<template>
  <v-fab-transition>
    <v-btn title="Go to top" fixed bottom right fab dark v-scroll-to="'#app'">
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
