<template>
  <v-row>
    <v-col
      cols="7"
      class="font-weight-bold py-0 pr-0"
      style="font-size:3.8rem;line-height:3.5rem;"
    >
      <div>
        <span :title="stock.full_name">{{ stock.short_name }}</span>
      </div>
      <div class="headline grey--text text--lighten-1">
        <span title="Stock full name"
          >{{ stock.name.replace(/[\u{0080}-\u{FFFF}]/gu, "") }}
        </span>
      </div>
    </v-col>
    <v-col
      cols="5"
      class="text-right py-0 pl-0 border-radius-l"
      :style="'background: ' + ($vuetify.theme.dark ? '#373740' : '#fff') + ';'"
    >
      <div class="currency display-1" title="Price in Dollars">
        {{ stock.price.toLocaleString() }}
      </div>
      <div v-if="page === 'stocks'">
        <span class="subtitle-2" title="Price low">
          <v-icon x-small color="red">mdi-arrow-down</v-icon>
          {{ stock.low.toLocaleString() }}
        </span>
        <span class="subtitle-2" title="Price high">
          <v-icon x-small color="green">mdi-arrow-up</v-icon>
          {{ stock.high.toLocaleString() }}
        </span>
      </div>
      <div v-else @click="quantity = ownedStock(stock.id)">
        Owned amount: {{ ownedStock(stock.id) }}
      </div>
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
