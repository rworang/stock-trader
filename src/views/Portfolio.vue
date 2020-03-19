<template>
  <v-col>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="3"
        v-for="stock in stockPortfolio"
        :key="stock.stock_id"
        class="pa-0"
      >
        <v-fade-transition>
          <app-stock :stock="stock"></app-stock>
        </v-fade-transition>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "Portfolio",
  components: {
    "app-stock": () => import("@/components/stock/Index")
  },
  watch: {
    pageAmount() {
      if (this.$store.getters.pageAmount >= this.$store.getters.stocksLength) {
        this.allLoaded = true;
      }
    }
  },
  computed: {
    stockPortfolio() {
      return this.$store.getters.stockPortfolio;
    },
    pageAmount() {
      return this.$store.getters.pageAmount;
    }
  },
  data: () => {
    return {
      allLoaded: false
    };
  }
};
</script>
