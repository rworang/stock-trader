<template>
  <v-overlay :value="loading">
    <v-fade-transition>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-fade-transition>
  </v-overlay>
</template>
<script>
export default {
  name: "Loader",
  watch: {
    loading(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 3000);
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
