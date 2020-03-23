<template>
  <v-row>
    <template>
      <v-slide-y-transition>
        <overview-graph v-if="!loading" />
      </v-slide-y-transition>
    </template>
    <v-col cols="3" v-for="i in stocksIndex" :key="i">
      <v-slide-y-transition>
        <stock-card :id="i" v-if="!loading" />
      </v-slide-y-transition>
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
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
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
  },
  data: () => ({
    loading: true
  })
};
</script>
