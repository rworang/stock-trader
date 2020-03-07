<template>
  <v-card outlined @click="cardClick(page)">
    <v-row>
      <v-col :cols="5" class="py-0">
        <v-card-title class="display-1">
          {{ stock.abbr }}
        </v-card-title>
        <v-card-subtitle>{{ stock.name }}</v-card-subtitle>
      </v-col>
      <v-col :cols="7" class="text-right pr-7">
        <v-row>
          <v-col cols="12" class="py-0">
            <span class="headline currency font-weight-bold">{{
              stock.price.toLocaleString()
            }}</span>
          </v-col>
          <v-col cols="12" class="py-0 ">
            Owned stock: {{ ownedStock(stock.id) }}
          </v-col>
          <v-col cols="12" class="py-0">
            <template v-if="quantity > 0">
              <span v-if="page === 'stocks'">Buy</span>
              <span v-if="page === 'portfolio'">Sell</span>
              {{ quantity }}
              stocks for
              <span class="currency">{{
                (quantity * stock.price).toLocaleString()
              }}</span>
            </template>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-divider dark></v-divider>
    <v-card-text class="py-0">
      <v-row v-if="page === 'stocks'">
        <v-col :cols="8" class="pb-0">
          <v-text-field
            @keyup.enter="buyStock"
            v-on:keyup.down="decreaseQuantity"
            v-on:keyup.up="increaseQuantity"
            v-model="quantity"
            label="Buy stocks"
            ref="buyStock"
            clearable
            dense
            dark
          ></v-text-field>
        </v-col>
        <v-col :cols="4">
          <v-btn
            color="primary"
            @click="buyStock"
            :disabled="
              insufficientFunds || quantity <= 0 || !Number.isInteger(quantity)
            "
            block
            >Buy</v-btn
          >
        </v-col>
      </v-row>
      <v-row v-if="page === 'portfolio'">
        <v-col :cols="8" class="pb-0">
          <v-text-field
            @keyup.enter="sellStock"
            v-model="quantity"
            label="Sell stocks"
            ref="sellStock"
            clearable
            dense
            dark
          ></v-text-field>
        </v-col>
        <v-col :cols="4">
          <v-btn
            color="primary"
            @click="sellStock"
            @keyup.enter="buyStock"
            :disabled="
              insufficientQuantity ||
                quantity <= 0 ||
                !Number.isInteger(quantity)
            "
            block
            >Sell</v-btn
          >
        </v-col>
      </v-row>
      <transition name="slide-fast">
        <v-row
          v-if="
            (page === 'stocks' && insufficientFunds) ||
              (page === 'portfolio' && insufficientQuantity)
          "
          @click="setQuantity(ownedStock(stock.id))"
        >
          <v-col class="pa-0">
            <v-alert dense type="error" class="ma-0">
              <span v-if="page === 'stocks' && insufficientFunds">
                Insufficient funds
              </span>
              <span v-if="page === 'portfolio' && insufficientQuantity">
                Can only sell
                <strong>{{ ownedStock(stock.id) }}</strong> stocks
              </span>
            </v-alert>
          </v-col>
        </v-row>
      </transition>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Stock",

  props: {
    stock: {
      type: Object,
      default: () => ({})
    },
    page: {
      type: String,
      default: "stocks"
    }
  },

  computed: {
    stocks() {
      return this.$store.getters.stockPortfolio;
    },
    funds() {
      return this.$store.getters.funds;
    },
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    },
    insufficientQuantity() {
      return this.quantity > this.stock.quantity;
    }
  },

  data: () => ({
    quantity: 0,
    buyRules: [v => /^\d+$/.test(v) || "Only numbers are allowed"]
  }),

  watch: {
    quantity() {
      if (!Number.isInteger(this.quantity)) {
        this.quantity = parseInt(this.quantity);
      }
      if (Number.isNaN(this.quantity)) {
        this.quantity = this.stock.quantity;
      }
      if (this.quantity === undefined || this.quantity === null) {
        this.quantity = 0;
      }
      console.log(this.quantity);
    }
  },

  methods: {
    setQuantity(v) {
      this.quantity = v;
    },
    increaseQuantity() {
      let q = this.quantity;
      if (!this.insufficientFunds) {
        this.quantity = q + 1;
      }
    },
    decreaseQuantity() {
      let q = this.quantity;
      if (q !== 0) {
        this.quantity = q - 1;
      }
    },
    ownedStock(id) {
      let q = 0;
      this.stocks.forEach(stock => {
        if (stock.id === id) {
          q = stock.quantity;
        }
      });
      return q;
    },
    cardClick(page) {
      if (page === "stocks") {
        this.$refs.buyStock.focus();
      }
      if (page === "portfolio") {
        this.$refs.sellStock.focus();
      }
      this.quantity = null;
    },
    buyStock() {
      if (
        !this.insufficientFunds ||
        this.quantity !== null ||
        !Number.isNaN(this.quantity)
      ) {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: this.quantity
        };
        this.$store.dispatch("buyStock", order);
        // console.log(order);
        this.quantity = null;
      }
    },
    sellStock() {
      if (!this.insufficientQuantity) {
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: this.quantity
        };
        this.$store.dispatch("sellStock", order);
        // console.log(order);
        this.quantity = null;
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
