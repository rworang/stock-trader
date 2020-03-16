<template>
  <div>
    <!--    <app-page-header page="stocks" :sort-now="sortNow"></app-page-header>-->
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
        offset-sm="2"
        offset-md="0"
        v-for="stock in stocks"
        :key="stock.id"
        class="pa-0"
      >
        <v-fade-transition>
          <app-stock :stock="stock" page="stocks"></app-stock>
        </v-fade-transition>
      </v-col>
    </v-row>
    <v-row v-if="!allLoaded">
      <v-btn block text @click="$store.dispatch('increasePageAmount')"
        >Load more stocks...</v-btn
      >
    </v-row>
  </div>
</template>
<script>
// const Stock = () => import("@/components/stock/StockIndex");
// import Stock from "@/components/stock/StockIndex";
// import PageHeader from "@/components/PageHeader";

export default {
  name: "Stocks",
  components: {
    // "app-page-header": PageHeader,
    "app-stock": () => import("@/components/stock/StockIndex")
  },
  data: () => {
    return {
      sorted: false,
      allLoaded: false
    };
  },
  // created() {
  //   // this.$store.dispatch("initStocks");
  //   let boolean = true;
  //   let value = "name";
  //   this.$store.dispatch("sortStocks", { boolean, value });
  // },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
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
    // let boolean = true;
    // let value = "name";
    // this.$store.dispatch("sortStocks", { boolean, value });
  },
  methods: {}
};
</script>
