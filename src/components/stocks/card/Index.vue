<template>
  <v-card :loading="loading" v-model="list" min-height="120">
    <template v-if="!loading">
      <v-card-title>{{ list.name }}</v-card-title>
      <v-list>
        <v-list-item>{{ list.short_name }}</v-list-item>
        <v-list-item>{{ list.country }}</v-list-item>
      </v-list>
    </template>
  </v-card>
</template>
<script>
export default {
  name: "Stock",
  props: {
    id: {
      type: Number,
      default: 4
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  },
  data: () => ({
    list: [],
    loading: true,
    loadingStock: true,
    transition: "scale-transition"
  }),
  async beforeMount() {
    this.list = await this.$store.dispatch("findStock", {
      id: this.id,
      from: "list"
    });
    this.loadingStock = false;
  }
};
</script>
