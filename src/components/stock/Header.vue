<template>
  <v-row>
    <v-col cols="7" class="stock-short-name py-0 pr-0">
      <div :title="stock.full_name">{{ stock.short_name }}</div>
      <div title="Stock full name" class="headline grey--text text--lighten-1">
        {{ stock.name.replace(/[\u{0080}-\u{FFFF}]/gu, "") }}
      </div>
    </v-col>
    <v-col
      cols="5"
      class="text-right pa-0 pr-3 border-radius-l"
      :style="'background: ' + ($vuetify.theme.dark ? '#373740' : '#fff') + ';'"
    >
      <div class="currency display-1" title="Price in Dollars">
        {{ stock.price.toLocaleString() }}
      </div>
      <span class="subtitle-2" title="Price low">
        <v-icon x-small color="red">mdi-arrow-down</v-icon>
        {{ stock.low.toLocaleString() }}
      </span>
      <span class="subtitle-2" title="Price high">
        <v-icon x-small color="green">mdi-arrow-up</v-icon>
        {{ stock.high.toLocaleString() }}
      </span>
      <div class="body-2">
        change:
        <span class="font-weight-bold pr-2" :class="changeColor" title="Change">
          {{ stock.chg }}</span
        >

        <span
          class="font-weight-bold"
          :class="changeColor"
          title="Change in percentage"
          >{{ stock.chg_percent }}</span
        >
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "StockHeader",

  props: {
    stock: {
      type: Object,
      default: () => ({
        short_name: "",
        full_name: "",
        price: "",
        low: "",
        high: "",
        id: "",
        chg: "",
        chg_percent: ""
      })
    },
    page: {
      type: String,
      default: "stocks"
    }
  },

  data: () => ({
    quantity: 0
  }),

  computed: {
    changeColor() {
      if (this.stock.chg[0] === "-") {
        return "red--text";
      } else if (this.stock.chg[0] === "+") {
        return "green--text";
      } else {
        return "white--text";
      }
    }
  },

  methods: {
    ownedStock(id) {
      let q = 0;
      if (this.stock.id === id) {
        q = this.stock.quantity;
      }
      return q;
    }
  }
};
</script>

<style scoped lang="scss">
.stock-short-name {
  font-weight: bold;
  font-size: 3.8rem;
  line-height: 3.5rem;
}
</style>
