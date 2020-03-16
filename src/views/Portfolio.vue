<template>
  <v-col>
    <v-row>
      <v-col
        cols="12"
        :sm="rapport ? 12 : 6"
        :md="rapport ? 6 : 4"
        lg="4"
        :xl="rapport ? 4 : 3"
        v-for="stock in stockPortfolio"
        :key="stock.stock_id"
        class="pa-0"
      >
        <v-fade-transition>
          <app-stock :stock="stock" page="portfolio"></app-stock>
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
  props: {
    rapport: {
      type: Boolean,
      default: false
    }
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
