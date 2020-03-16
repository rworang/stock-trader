<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
        v-for="stock in stocks"
        :key="stock.id"
        class="pa-0"
      >
        <app-stock :stock="stock" page="stocks"></app-stock>
      </v-col>
    </v-row>
    <v-row v-if="!allLoaded" class="mt-4">
      <v-btn block x-large text @click="$store.dispatch('increasePageAmount')"
        >Load more stocks...</v-btn
      >
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Stocks",
  components: {
    "app-stock": () => import("@/components/stock/Index")
  },
  data: () => {
    return {
      allLoaded: false
    };
  },
  beforeMount() {
    let boolean = false;
    let sortValue = "name";
    this.$store.dispatch("sortStocks", { boolean, sortValue });
  },
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
    stocks() {},
    pageAmount() {
      if (this.$store.getters.pageAmount >= this.stocksLength) {
        this.allLoaded = true;
      }
    }
  },
  mounted() {},
  methods: {}
};
</script>
