<template>
  <div>
    <app-page-header page="stocks" :sort-now="sortNow"></app-page-header>
    <v-row v-if="$store.state.loading">
      Loading
    </v-row>
    <v-row v-else>
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
          <app-stock :stock="stock" page="stocks"></app-stock>
        </v-fade-transition>
      </v-col>
    </v-row>
  </div>
</template>
<script>
// const Stock = () => import("@/components/stock/StockIndex");
// import Stock from "@/components/stock/StockIndex";
import PageHeader from "@/components/PageHeader";

export default {
  name: "Stocks",
  components: {
    "app-page-header": PageHeader,
    "app-stock": () => import("@/components/stock/StockIndex")
  },
  data: () => {
    return {
      sortNow: false
    };
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    },
    pageAmount() {
      return this.$store.state.pageAmount;
    }
  },
  watch: {
    stocks() {
      // console.log(this.stocks);
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
