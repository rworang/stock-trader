<template>
  <div>
    <app-page-header page="portfolio" :sort-now="sortNow"></app-page-header>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
        v-for="stock in stocks"
        :key="stock.stock_id"
      >
        <v-fade-transition>
          <app-stock :stock="stock" page="portfolio"></app-stock>
        </v-fade-transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const Stock = () => import("@/components/stock/StockIndex");
import PageHeader from "@/components/PageHeader";

export default {
  name: "Portfolio",
  components: {
    "app-page-header": PageHeader,
    "app-stock": Stock
  },
  data: () => {
    return {
      sortNow: false
    };
  },
  computed: {
    stocks() {
      // console.log(this.$store.getters.stockPortfolio);
      return this.$store.getters.stockPortfolio;
    }
  },
  mounted() {
    this.sortNow = true;
  },
  methods: {
    nextPage() {
      this.$store.dispatch("nextStocksPage");
    },
    prevPage() {
      this.$store.dispatch("prevStocksPage");
    }
  }
};
</script>
