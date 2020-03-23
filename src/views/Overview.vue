<template>
  <v-row>
    <overview-graph />
    <v-col cols="3" v-for="i in stocksIndex" :key="i">
      <stock-card :id="i" />
    </v-col>
  </v-row>
</template>
<script>
import OverviewGraph from "@/components/overview/graph/Index";
import StockCard from "@/components/stocks/card/Index";
export default {
  name: "Overview",
  components: {
    OverviewGraph,
    StockCard
  },
  beforeMount() {
    this.$store.dispatch("setStocksIndex", this.pageSize);
  },
  computed: {
    stocksIndex() {
      return this.$store.getters.stocksIndex;
    },
    pageSize() {
      return this.$store.getters.pageSize;
    }
  }
};
</script>
