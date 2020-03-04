<template>
  <div>
    <v-row>
      <v-col :cols="6">
        <h1>Stocks page</h1>
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
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn elevation="0" @click="descending = !descending">
          <v-icon v-if="descending">mdi-sort-descending</v-icon>
          <v-icon v-if="!descending">mdi-sort-ascending</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="4" v-for="stock in stocks" :key="stock.abbr">
        <app-stock :stock="stock"></app-stock>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StocksStock from "@/components/StocksStock";

export default {
  name: "Stocks",
  components: {
    "app-stock": StocksStock
  },
  computed: {
    stocks() {
      return this.$store.state.stocks.stocks;
    }
  },
  data: () => {
    return {
      descending: true,
      sortItems: ["price", "name"],
    };
  }
};
</script>
