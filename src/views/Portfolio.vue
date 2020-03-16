<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
        xl="3"
        offset-sm="2"
        offset-md="0"
        v-for="stock in stockPortfolio"
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
export default {
  name: "Portfolio",
  components: {
    "app-stock": () => import("@/components/stock/Index")
  },
  data: () => {
    return {
      allLoaded: false
    };
  },
  computed: {
    stockPortfolio() {
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
