<template>
  <v-card
    outlined
    dark
    @click="cardClick(page)"
    :elevation="elevation"
    @mouseenter="elevation = 5"
    @mouseleave="elevation = 0"
    v-click-outside="onClickOutside"
  >
    <v-container fluid class="pb-0">
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
          <div v-else>Owned amount: {{ ownedStock(stock.id) }}</div>
          <div>
            <span class="body-2" title="Change in percentages"
              >change:
              <span :class="changeColor + ' font-weight-bold'">{{
                stock.chg_percent
              }}</span></span
            >
          </div>
        </v-col>
      </v-row>

      <v-row v-if="page === 'stocks'">
        <v-col :cols="8" class="pb-0">
          <v-text-field
            @keyup.enter="buyStock"
            @keyup.down="decreaseQuantity"
            @keyup.up="increaseQuantity"
            v-model="quantity"
            label="Buy stocks"
            ref="buyStock"
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
            @keydown.down="decreaseQuantity"
            @keydown.up="increaseQuantity"
            v-model="quantity"
            label="Sell stocks"
            ref="sellStock"
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

      <v-row>
        <v-col cols="12" class="pa-0 text-center border-light-y">
          <v-btn
            small
            block
            color="transparent"
            elevation="0"
            @click="stockInfo = !stockInfo"
            class="grey--text text--darken-1 grey-text-hover"
          >
            <span v-if="!stockInfo">
              Show information
              <v-icon>mdi-chevron-double-down</v-icon>
            </span>
            <span v-if="stockInfo">
              Hide information
              <v-icon>mdi-chevron-double-up</v-icon>
            </span>
          </v-btn>
        </v-col>
      </v-row>

      <v-expand-transition>
        <v-row v-show="stockInfo">
          <v-container fluid>
            <v-row v-if="page === 'portfolio'" class="border-light-b pb-3 mb-2">
              <v-col cols="12" class="py-0">
                {{ ownedStock(stock.id) }} x
                <span class="currency">{{ stock.price.toLocaleString() }}</span>
                =
                <span class="currency display-2">{{
                  (ownedStock(stock.id) * stock.price).toLocaleString()
                }}</span>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4" class="py-0 text-right grey--text font-italic">
                <div v-if="stock.full_name">Full name:</div>
                <div v-if="stock.sector">Sector:</div>
                <div v-if="stock.industry">Industry:</div>
                <div v-if="stock.no_of_employee">Employees:</div>
              </v-col>
              <v-col cols="8" class="py-0 pl-0">
                <div>
                  {{ stock.full_name }}
                </div>
                <div>
                  {{ stock.sector }}
                </div>
                <div>
                  {{ stock.industry }}
                </div>
                <div>
                  {{ stock.no_of_employee }}
                </div>
              </v-col>
            </v-row>
            <v-row class="py-2">
              <v-divider light></v-divider>
            </v-row>
            <v-row>
              <v-col cols="4" class="py-0 text-right grey--text font-italic">
                <div v-if="stock.info.locality">Location:</div>
                <div v-if="stock.info.postalCode">Zip code:</div>
                <div v-if="stock.info.phone">Phone:</div>
                <div v-if="stock.info.fax">Fax:</div>
                <div v-if="stock.info.website">Website:</div>
              </v-col>
              <v-col cols="8" class="py-0 pl-0">
                <div>
                  {{ stock.info.locality + ", " + stock.info.country }}
                </div>
                <div>
                  {{ stock.info.postalCode }}
                </div>
                <div>
                  {{ stock.info.phone }}
                </div>
                <div>
                  {{ stock.info.fax }}
                </div>
                <div>
                  <a :href="stock.info.website" :title="stock.name">{{
                    stock.info.website
                  }}</a>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-expand-transition>

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
    page: {
      type: String,
      default: "stocks"
    }
  },

  data: () => ({
    stockInfo: false,
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
    // stock() {
    //   console.log(this.stock);
    // },
    quantity() {
      if (this.alertClicked) {
        if (this.page === "stocks") {
          this.quantity = this.buyLimit(this.stock.price);
          this.alertClicked = !this.alertClicked;
        }
        if (this.page === "portfolio") {
          this.quantity = this.ownedStock(this.stock.id);
          this.alertClicked = !this.alertClicked;
        }
      } else {
        if (!Number.isInteger(this.quantity)) {
          this.quantity = parseInt(this.quantity);
        }
        if (Number.isNaN(this.quantity)) {
          this.quantity = this.stock.quantity;
        }
        if (this.quantity === undefined || this.quantity === null) {
          this.quantity = 0;
        }
      }
    }
  },

  methods: {
    onClickOutside() {
      this.stockInfo = false;
    },
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
      this.quantity = 0;
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
        this.quantity = null;
      }
    },
    sellStock() {
      if (
        !this.insufficientQuantity ||
        this.quantity !== null ||
        !Number.isNaN(this.quantity)
      ) {
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
.grey-text-hover:hover {
  color: #fff !important;
}

.border-dark-y {
  border-top: solid 1px rgba(0, 0, 0, 0.1);
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}
.border-dark-x {
  border-left: solid 1px rgba(0, 0, 0, 0.1);
  border-right: solid 1px rgba(0, 0, 0, 0.1);
}
.border-dark-t {
  border-top: solid 1px rgba(0, 0, 0, 0.1);
}
.border-dark-r {
  border-right: solid 1px rgba(0, 0, 0, 0.1);
}
.border-dark-b {
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}
.border-dark-l {
  border-left: solid 1px rgba(0, 0, 0, 0.1);
}
.border-dark-a {
  border: solid 1px rgba(0, 0, 0, 0.1);
}

.border-light-y {
  border-top: solid 1px rgba(255, 255, 255, 0.1);
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
}
.border-light-x {
  border-left: solid 1px rgba(255, 255, 255, 0.1);
  border-right: solid 1px rgba(255, 255, 255, 0.1);
}
.border-light-t {
  border-top: solid 1px rgba(255, 255, 255, 0.1);
}
.border-light-r {
  border-right: solid 1px rgba(255, 255, 255, 0.1);
}
.border-light-b {
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
}
.border-light-l {
  border-left: solid 1px rgba(255, 255, 255, 0.1);
}
.border-light-a {
  border: solid 1px rgba(255, 255, 255, 0.1);
}
</style>
