<template>
  <v-slide-y-transition origin="center center 0">
    <v-card
      outlined
      @click="cardClick(page)"
      :elevation="elevation"
      @mouseenter="elevation = 5"
      @mouseleave="elevation = 1"
      v-click-outside="onClickOutside"
      :class="$vuetify.theme.dark ? 'card-hover-dark' : 'card-hover-light'"
      class="ma-2"
    >
      <v-container fluid class="pb-0">
        <!-- stock-header wrapping element is v-row -->
        <stock-header :stock="stockHeader"></stock-header>

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
              @keydown.down="decreaseQuantity"
              @keydown.up="increaseQuantity"
              v-model="quantity"
              label="Sell stocks"
              ref="sellStock"
              dense
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

        <v-row v-if="page === 'portfolio'">
          <v-col
            cols="12"
            :class="
              'py-2 border-' + ($vuetify.theme.dark ? 'light' : 'dark') + '-t'
            "
          >
            <v-row>
              <v-col cols="12" class="py-0">
                <div>
                  Total current value of
                  <strong @click="quantity = ownedStock(stock.id)">{{
                    ownedStock(stock.id)
                  }}</strong>
                  owned stocks
                </div>
                <div
                  class="currency display-2"
                  style="font-size: 2.2rem!important;"
                >
                  {{ (ownedStock(stock.id) * stock.price).toLocaleString() }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-divider light></v-divider>
            </v-row>
            <v-row class="pt-2">
              <v-col class="py-0" cols="12">
                <div class="headline">Last 3 buy orders</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0 pr-0 text-right flex-grow-1">
                <div class="grey--text">
                  Amount
                </div>
              </v-col>
              <v-col class="py-0 pr-0 flex-grow-1">
                <div class="grey--text">
                  Bought at
                </div>
              </v-col>
              <v-col class="py-0 pr-0 flex-grow-1">
                <div class="grey--text">
                  Profit/loss
                </div>
              </v-col>
              <v-col class="py-0 pr-0 flex-grow-1">
                <div class="grey--text">
                  Date
                </div>
              </v-col>
            </v-row>
            <v-row
              v-for="logEntry in log
                .slice(log.length - 3, log.length)
                .reverse()"
              :key="logEntry.dateTime"
            >
              <v-col class="py-0 pr-1 text-right flex-grow-1">
                <div>
                  {{ logEntry.quantity }}
                </div>
              </v-col>

              <v-col class="py-0 pr-1 flex-grow-1">
                <div class="currency">
                  {{ logEntry.bought_at }}
                </div>
              </v-col>

              <v-col class="py-0 pr-1 flex-grow-1">
                <div class="currency">
                  <span
                    v-html="
                      calcProfitLoss(logEntry.bought_at, logEntry.quantity)
                    "
                  ></span>
                </div>
              </v-col>

              <v-col class="py-0 pr-1 flex-grow-1">
                <div class="subtitle-2" :title="logEntry.dateTime.slice(10)">
                  {{ logEntry.dateTime.slice(0, 10) }}
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            :class="
              'pa-0 text-center border-' +
                ($vuetify.theme.dark ? 'light' : 'dark') +
                '-t'
            "
          >
            <v-btn
              small
              block
              color="transparent"
              elevation="0"
              @click="stockHistory = !stockHistory"
            >
              Show full stock order history
              <span v-if="!stockHistory">
                <v-icon>mdi-chevron-double-right</v-icon>
              </span>
              <span v-if="stockHistory">
                <v-icon>mdi-chevron-double-left</v-icon>
              </span>
            </v-btn>
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
                  Not enough quantity, can only sell
                  <strong>{{ ownedStock(stock.id) }}</strong> stock
                </span>
              </v-alert>
            </v-col>
          </v-row>
        </transition>

        <v-row>
          <v-col
            cols="12"
            :class="
              'pa-0 text-center border-' +
                ($vuetify.theme.dark ? 'light' : 'dark') +
                '-y'
            "
          >
            <v-btn
              small
              block
              color="transparent"
              elevation="0"
              @click="stockInfo = !stockInfo"
            >
              Stock information
              <span v-if="!stockInfo">
                <v-icon>mdi-chevron-double-down</v-icon>
              </span>
              <span v-if="stockInfo">
                <v-icon>mdi-chevron-double-up</v-icon>
              </span>
            </v-btn>
          </v-col>
        </v-row>

        <v-expand-transition>
          <v-row v-show="stockInfo">
            <v-container fluid>
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
              <v-row>
                <v-col class="body-2 pb-0 text-right">
                  Last updated: {{ stock.dateTime }}
                </v-col>
              </v-row>
            </v-container>
          </v-row>
        </v-expand-transition>

        <v-snackbar
          v-model="snackbar"
          top
          right
          :timeout="4000"
          style="margin-top: 64px;"
          @click="snackbar = false"
          @click.right.prevent="linkTo('portfolio')"
        >
          <span v-html="snackbarMessage"></span>
        </v-snackbar>
      </v-container>
    </v-card>
  </v-slide-y-transition>
</template>

<script>
export default {
  name: "StockCard",

  components: {
    "stock-header": () => import("./Header.vue")
  },

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
    logHistory: [],
    snackbar: false,
    snackbarMessage: "I am a snackbar!",
    stockInfo: false,
    stockHistory: false,
    alertClicked: false,
    quantity: 0,
    elevation: 1,
    clicked: false
  }),

  computed: {
    stockHeader() {
      const s = this.stock;
      return {
        id: s.id,
        name: s.name,
        full_name: s.full_name,
        short_name: s.short_name,
        price: s.price,
        high: s.high,
        low: s.low,
        chg: s.chg,
        chg_percent: s.chg_percent
      };
    },
    log() {
      let log = this.$store.getters.log;
      let entry = log.find(e => e.id === this.stock.id);
      return entry.history;
    },
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
      if (this.stock.chg[0] === "-") {
        return "red--text";
      } else if (this.stock.chg[0] === "+") {
        return "green--text";
      } else {
        return "white--text";
      }
    }
  },

  created() {
    // let last = function last(array, n) {
    //   if (array == null) return void 0;
    //   if (n == null) return array[array.length - 1];
    //   return array.slice(Math.max(array.length - n, 0));
    // };
    // const lastStock = last(this.stocks);
    // // console.log(this.stocks, last(this.stocks), this.stock);
    //
    // if (lastStock.id === this.stock.id) {
    //   console.log("I am the last stock");
    //   let boolean = true;
    //   let value = "name";
    //   this.$store.dispatch("sortStocks", { boolean, value });
    // }
  },

  watch: {
    page() {
      console.log(this.page);
    },
    quantity() {
      if (!Number.isInteger(this.quantity)) {
        this.quantity = parseInt(this.quantity);
      }
      if (
        Number.isNaN(this.quantity) ||
        this.quantity === undefined ||
        this.quantity === null ||
        this.quantity === ""
      ) {
        this.quantity = 0;
      }
    },
    alertClicked() {
      if (this.alertClicked && this.page === "portfolio") {
        this.setQuantity(this.ownedStock(this.stock.id));
        this.alertClicked = false;
      }
      if (this.alertClicked && this.page === "stocks") {
        this.setQuantity(this.buyLimit(this.stock.price));
        this.alertClicked = false;
      }
    }
  },

  methods: {
    calcProfitLoss(bought_at, quantity) {
      let r = (this.stock.price - bought_at) * quantity;
      if (Math.sign(r) === -1) {
        return " <span class='red--text'>" + r.toLocaleString() + "</span>";
      } else if (Math.sign(r) === 1) {
        return " <span class='green--text'>" + r.toLocaleString() + "</span>";
      } else {
        return " " + r.toLocaleString();
      }
    },
    findLogEntry(id) {
      const entry = this.log.find(element => element.id === id);
      // console.log(entry.history);
      return entry;
    },
    linkTo(name) {
      this.$router.push({ path: name });
      this.snackbar = false;
    },
    onClickOutside() {
      this.stockInfo = false;
    },
    cardClick(page) {
      if (page === "stocks") {
        this.$refs.buyStock.focus();
      }
      if (page === "portfolio") {
        this.$refs.sellStock.focus();
      }
    },
    ownedStock(id) {
      let q = 0;
      if (this.stock.id === id) {
        q = this.stock.quantity;
      }
      return q;
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
    buyLimit(price) {
      return Math.floor(this.funds / price);
    },
    buyStock() {
      this.snackbar = false;
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: Math.floor(this.quantity),
        dateTime: this.$date().format("DD/MM/YYYY HH:mm:ss")
      };
      if (
        !Number.isNaN(this.quantity) &&
        !this.insufficientFunds &&
        this.quantity !== null &&
        this.quantity !== 0 &&
        this.quantity !== undefined &&
        this.quantity * this.stock.price < this.funds
      ) {
        this.$store.dispatch("buyStock", order);
        this.quantity = 0;
        this.snackbarMessage =
          "You bought <strong>" +
          order.quantity +
          " " +
          this.stock.name +
          "</strong> stocks for <span class='currency font-weight-bold'>" +
          (order.quantity * order.stockPrice).toLocaleString() +
          "</span>";
        this.snackbar = true;
      }
    },
    sellStock() {
      this.snackbar = false;
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity,
        dateTime: this.$date().format("DD/MM/YYYY HH:mm:ss")
      };
      if (
        !Number.isNaN(this.quantity) &&
        !this.insufficientQuantity &&
        this.quantity !== null &&
        this.quantity !== 0 &&
        this.quantity !== undefined
      ) {
        this.$store.dispatch("sellStock", order);
        this.quantity = 0;
        this.snackbarMessage =
          "You sold <strong>" +
          order.quantity +
          " " +
          this.stock.name +
          "</strong> stocks for <span class='currency font-weight-bold'>" +
          (order.quantity * order.stockPrice).toLocaleString() +
          "</span>";
        this.snackbar = true;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.v-card:hover {
  cursor: default;
}
.card-hover-dark,
.card-hover-light {
  padding: 3px;
}
.card-hover-dark:hover {
  border: solid 4px #1eb980;
  padding: 0;
}
.card-hover-light:hover {
  border: solid 4px #1976d2;
  padding: 0;
}
</style>
