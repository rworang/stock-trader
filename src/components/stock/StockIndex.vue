<template>
  <v-card outlined :loading="$store.state.loading" class="pa-1">
    <v-container fluid>
      <v-row>
        <v-col
          cols="7"
          class="font-weight-bold py-0 pr-0"
          style="font-size:3.8rem;line-height:3.5rem;"
        >
          <div>
            <span title="Stock short name / symbol">{{
              stock.short_name
            }}</span>
          </div>
          <div class="headline grey--text text--lighten-1">
            <span title="Stock full name">
              <span v-if="stock.short_name !== 'MCD'">{{ stock.name }}</span>
              <span v-else>McDonald's</span>
            </span>
          </div>
        </v-col>
        <v-col cols="5" class="text-right py-0 pl-0">
          <div class="currency display-1" title="Price in Dollars">
            {{ stock.price.toLocaleString() }}
          </div>
          <div>
            <span class="subtitle-2" title="Price low">
              <v-icon x-small color="red">mdi-arrow-down</v-icon>
              {{ stock.low.toLocaleString() }}
            </span>
            <span class="subtitle-2" title="Price high">
              <v-icon x-small color="green">mdi-arrow-up</v-icon>
              {{ stock.high.toLocaleString() }}
            </span>
          </div>
          <div>
            <span class="body-1" title="Change in percentages">change: </span
            ><span :class="changeColor">{{ stock.chg_percent }}</span>
          </div>
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
      if (this.stock.chg_percent[0] === "-") {
        return "red--text";
      } else if (this.stock.chg_percent[0] === "+") {
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
