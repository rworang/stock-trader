<template>
  <v-col>
    <v-row>
      <v-col
        cols="12"
        md="6"
        lg="3"
        v-for="stock in stocks"
        :key="stock.id"
        class="pa-0"
      >
        <v-fade-transition>
          <app-stock :stock="stock"></app-stock>
        </v-fade-transition>
      </v-col>
    </v-row>
    <v-row v-if="!allLoaded" class="mt-4">
      <v-btn block x-large text @click="$store.dispatch('increasePageAmount')"
        >Load more stocks...</v-btn
      >
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "Stocks",
  metaInfo: {
    title: "Stocks"
  },
  components: {
    "app-stock": () => import("@/components/stock/Index")
  },
  beforeMount() {
    this.$store.dispatch("sortStocks", { boolean: false, sortValue: "name" });
  },
  watch: {
    pageAmount() {
      if (this.$store.getters.pageAmount >= this.$store.getters.stocksLength) {
        this.allLoaded = true;
      }
    }
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    },
    pageAmount() {
      return this.$store.getters.pageAmount;
    }
  },
  data: () => ({
    allLoaded: false
  })
};
</script>
