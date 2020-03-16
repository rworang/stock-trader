<template>
  <div>
<!--    <app-page-header page="portfolio" :sort-now="sortNow"></app-page-header>-->
    <v-row>
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
        xl="3"
        offset-sm="2"
        offset-md="0"
        v-for="stock in stocks"
        :key="stock.stock_id"
        class="pa-0"
      >
        <v-fade-transition>
          <app-stock :stock="stock" page="portfolio"></app-stock>
        </v-fade-transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// const Stock = () => import("@/components/stock/StockIndex");
// import PageHeader from "@/components/PageHeader";

export default {
  name: "Portfolio",
  components: {
    // "app-page-header": PageHeader,
    "app-stock": () => import("@/components/stock/StockIndex")
  },
  data: () => {
    return {
      sortNow: false,
      allLoaded: false
    };
  },
  computed: {
    stocks() {
      return this.$store.getters.stockPortfolio;
    },
    pageAmount() {
      return this.$store.getters.pageAmount;
    },
    stocksLength() {
      return this.$store.getters.stocksLength;
    }
  },
  watch: {
    stocks() {
      // this.stocks = this.$store.getters.stocks;
      // console.log(this.stocks);
    },
    pageAmount() {
      if (this.$store.getters.pageAmount >= this.stocksLength) {
        this.allLoaded = true;
      }
    }
  },
  mounted() {
    // this.sortNow = true;
  },
  methods: {}
};
</script>
