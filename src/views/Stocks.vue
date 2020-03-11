<template>
  <div>
    <app-page-header page="stocks" :sort-now="sortNow"></app-page-header>
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
          <app-stock :stock="stock" page="stocks"></app-stock>
        </v-fade-transition>
      </v-col>
    </v-row>
    <!--    <v-row>-->
    <!--      <v-col class="text-center">-->
    <!--        <v-btn-->
    <!--          elevation="0"-->
    <!--          @click="prevPage"-->
    <!--          :disabled="!$store.state.indicesId >= 1"-->
    <!--          >&lt; prev</v-btn-->
    <!--        >-->
    <!--        <v-btn elevation="0" @click="nextPage">next &gt;</v-btn>-->
    <!--      </v-col>-->
    <!--    </v-row>-->
  </div>
</template>
<script>
const Stock = () => import("@/components/stock/StockIndex");
// import Stock from "@/components/stock/StockIndex";
import PageHeader from "@/components/PageHeader";

export default {
  name: "Stocks",
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
      return this.$store.getters.stocks;
    },
    pageAmount() {
      return this.$store.state.pageAmount;
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
