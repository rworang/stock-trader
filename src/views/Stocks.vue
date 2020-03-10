<template>
  <div>
    <v-row>
      <v-col :cols="6">
        <h1>Stocks</h1>
      </v-col>
      <v-col :cols="6" class="text-right pt-5">
        <v-menu transition="fade-transition" offset-y dense>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" elevation="0">
              Results: {{ sortAmountMenu }}
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="(item, index) in sortAmount" :key="index" link @click="sortAmountMenu = item">
              <v-list-item-title>{{
                item
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu transition="fade-transition" offset-y dense>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" elevation="0">
              Sort by: {{ sortItemsMenu }}
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="(item, index) in sortItems" :key="index" link @click="sortItemsFn(item)">
              <v-list-item-title>{{
                item
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn elevation="0" @click="sortBy(sortOrder)" class="px-0">
          <v-icon v-if="sortOrder">mdi-sort-descending</v-icon>
          <v-icon v-else>mdi-sort-ascending</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
        v-for="stock in stocks"
        :key="stock.stock_id"
      >
        <app-stock :stock="stock" page="stocks"></app-stock>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn
          elevation="0"
          @click="prevPage"
          :disabled="!$store.state.indicesId >= 1"
          >&lt; prev</v-btn
        >
        <v-btn elevation="0" @click="nextPage">next &gt;</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const Stock = () => import("@/components/stock/StockIndex");

export default {
  name: "Stocks",
  components: {
    "app-stock": Stock
  },
  computed: {
    stocks() {
      return this.$store.getters.stocks;
    }
  },
  created() {
    this.sortBy(this.sortOrder);
  },
  data: () => {
    return {
      sortOrder: false,
      sortItemsMenu: "name",
      sortItems: ["name", "price"],
      sortAmountMenu: "30",
      sortAmount: ["30", "60", "90", "120"]
    };
  },
  methods: {
    nextPage() {
      this.$store.dispatch("nextStocksPage");
    },
    prevPage() {
      this.$store.dispatch("prevStocksPage");
    },
    sortItemsFn(item) {
      if(item === "name") {
        this.sortOrder = false;
      }
      if(item === "price") {
        this.sortOrder = true;
      }
      this.sortItemsMenu = item;
      this.sortBy(this.sortOrder);
    },
    sortBy(b, v = this.sortItemsMenu) {
      console.log(this.sortItemsMenu);
      this.sortOrder = !b;
      const vm = this;
      if (v === "price") {
        this.stocks.sort(function(a, b) {
          if (vm.sortOrder) {
            return parseFloat(a.price) - parseFloat(b.price);
          } else {
            return parseFloat(b.price) - parseFloat(a.price);
          }
        });
        this.sortedBy = "price";
      } else if (v === "name") {
        this.stocks.sort(function(a, b) {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          if (nameA > nameB) {
            if (vm.sortOrder) {
              return 1;
            } else {
              return 0;
            }
          }
          if (nameA < nameB) {
            if (vm.sortOrder) {
              return 0;
            } else {
              return 1;
            }
          }
          return 0;
        });
        this.sortedBy = "name";
      }
    }
  }
};
</script>
