<template>
  <v-card outlined>
    <v-container fluid>
      <v-row>
        <v-col class="display-1 font-weight-bold py-0">
          <span>{{ stock.symbol }}</span>
        </v-col>
        <v-col class="text-right py-0" style="font-size: 1.8rem;">
          <span class="grey--text">{{ splitSymbol("to") }}</span>
          <span>{{ stock.price.toLocaleString() }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0" cols="9">
          <span>{{ stockName }}</span>
        </v-col>
        <v-col class="text-right py-0" cols="3">
          <span :class="changeColor"> {{ stock.chg_per }}</span>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "StockCard",

  props: {
    stock: {
      type: Object,
      default: () => ({})
    },
    profile: {
      type: Array,
      default: () => []
    },
    page: {
      type: String,
      default: "stocks"
    }
  },

  data: () => ({}),

  computed: {
    stockName() {
      return this.profile[0].name + " to " + this.profile[1].name;
    },
    changeColor() {
      if (this.stock.chg_per[0] === "-") {
        return "red--text";
      } else if (this.stock.chg_per[0] === "+") {
        return "green--text";
      } else {
        return "white--text";
      }
    }
  },

  methods: {
    splitSymbol(v) {
      if (v === "from") {
        return this.profile[0].symbol.split(", ")[0];
      } else if (v === "to") {
        return this.profile[1].symbol.split(", ")[0];
      }
    }
  }
};
</script>

<style scoped lang="scss">
.v-card:hover {
  background: #2e2e2e;
  cursor: default;
}
</style>
