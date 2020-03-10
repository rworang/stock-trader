<template>
  <v-skeleton-loader
    :loading="$store.state.loading"
    transition="scale-transition"
    height="94"
    type="list-item-two-line"
  >
    <v-card
      outlined
      dark
      @click="cardClick(page)"
      :elevation="elevation"
      @mouseenter="elevation = 5"
      @mouseleave="elevation = 0"
    >
      <v-container fluid class="pa-4 pb-0">
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
            <div v-if="page === 'portfolio'">
              Owned stock: {{ ownedStock(stock.id) }}
            </div>
            <div>
              <span class="body-2" title="Change in percentages">change: <span :class="changeColor + ' font-weight-bold'">{{ stock.chg_percent }}</span></span
              >
            </div>
          </v-col>
        </v-row>

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
                insufficientFunds ||
                  quantity <= 0 ||
                  !Number.isInteger(quantity)
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
            @click="alertClicked = !alertClicked"
          >
            <v-col class="pa-0">
              <v-alert dense type="error" class="ma-0">
                <span v-if="page === 'stocks' && insufficientFunds">
                  Insufficient funds, can only buy
                  <strong>{{ buyLimit(stock.price) }}</strong> stock
                </span>
                <span v-if="page === 'portfolio' && insufficientQuantity">
                  Not enought quantity, can only sell
                  <strong>{{ ownedStock(stock.id) }}</strong> stock
                </span>
              </v-alert>
            </v-col>
          </v-row>
        </transition>
      </v-container>

      <v-dialog
        v-model="clicked"
        max-width="420"
        transition="slide-y-transition"
      >
        <v-card>
          <v-container>
            <v-row class="px-3">
              <v-col class="py-2 text-right flex-grow-0">
                <span class="display-3 font-weight-bold">{{
                  stock.short_name
                }}</span>
              </v-col>
              <v-col class="py-2 display-1 pl-0">
                <span>{{ stock.name }}</span>
                <div class="subtitle-1 font-italic" style="line-height:1rem;">
                  {{ stock.full_name }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-divider dark></v-divider>
            </v-row>
            <v-row>
              Hello
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: "StockCard",

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

  data: () => ({
    alertClicked: false,
    quantity: 0,
    elevation: 0,
    clicked: false
  }),

  computed: {
    stocks() {
      return this.$store.getters.stocks;
    },
    funds() {
      return this.$store.getters.funds;
    },
    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    },
    insufficientQuantity() {
      return this.quantity > this.stock.quantity;
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

  watch: {
    stock() {
      console.log(this.stock);
    },
    quantity() {
      if (!this.alertClicked) {
        if (!Number.isInteger(this.quantity)) {
          this.quantity = parseInt(this.quantity);
        }
        if (Number.isNaN(this.quantity)) {
          this.quantity = this.stock.quantity;
        }
        if (this.quantity === undefined || this.quantity === null) {
          this.quantity = 0;
        }
      } else {
        if (this.page === "stocks") {
          this.quantity = this.buyLimit(this.stock.price);
        }
        if (this.page === "portfolio") {
          this.quantity = this.ownedStock(this.stock.id);
        }
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
      if (this.stock.id === id) {
        q = this.stock.quantity;
      }
      return q;
    },
    buyLimit(price) {
      console.log(Math.round(this.funds / price) * price);
      return Math.floor(this.funds / price);
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
          stockLow: this.stock.low,
          stockHigh: this.stock.high,
          quantity: this.quantity
        };
        this.$store.dispatch("buyStock", order);
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
        this.quantity = null;
      }
    },
    openCard(e, id) {
      console.log("I clicked the card with id: " + id);
      this.clicked = !this.clicked;
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
