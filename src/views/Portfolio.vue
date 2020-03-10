<template>
  <div>
    <v-row>
      <v-col :cols="6">
        <h1>Portfolio</h1>
      </v-col>
      <v-col :cols="6" class="text-right pt-5">
        <v-menu offset-y dense>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" elevation="0">
              Sort by
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="(item, index) in sortItems" :key="index" link>
              <v-list-item-title @click="sortBy(sortOrder, item)">{{
                item
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn elevation="0" @click="sortBy(sortOrder)">
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
        <transition name="slide">
          <app-stock :stock="stock" page="portfolio"></app-stock>
        </transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const Stock = () => import("@/components/stock/StockIndex");

export default {
  name: "Portfolio",
  components: {
    "app-stock": Stock
  },
  computed: {
    stocks() {
      return this.$store.getters.stockPortfolio;
    }
  },
  data: () => {
    return {
      sortOrder: true,
      sortedBy: "name",
      sortItems: ["price", "name"]
    };
  },
  methods: {
    sortBy(b, v = this.sortedBy) {
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
