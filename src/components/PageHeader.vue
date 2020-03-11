<template>
  <v-row>
    <v-col cols="12" sm="4">
      <h1 class="text-capitalize">{{ page }}</h1>
    </v-col>

    <v-col cols="12" sm="8" class="text-right pt-5">
      <v-btn elevation="0" @click.stop="refreshData" class="border-radius-l"
        >Refresh <v-icon small>mdi-refresh</v-icon></v-btn
      >
      <v-menu transition="fade-transition" offset-y dense>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" elevation="0"> Results: {{ sortAmountMenu }} </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in sortAmount"
            :key="index"
            link
            @click="sortAmountMenu = item"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu transition="fade-transition" offset-y dense>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" elevation="0"> Sort by: {{ sortItemsMenu }} </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in sortItems"
            :key="index"
            link
            @click="sortItemsFn(item)"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        elevation="0"
        @click="sortBy(sortOrder)"
        class="px-0 border-radius-r"
      >
        <v-icon v-if="!sortOrder">mdi-sort-descending</v-icon>
        <v-icon v-else>mdi-sort-ascending</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "PageHeader",

  props: {
    page: {
      type: String,
      default: "stocks"
    },
    sortNow: {
      type: Boolean,
      default: false
    }
  },

  data: () => {
    return {
      sortOrder: false,
      sortItemsMenu: "name",
      sortItems: ["name", "price", "change", "percentage"],
      sortAmountMenu: "30",
      sortAmount: ["30", "60", "90"]
    };
  },

  computed: {
    stocks() {
      return this.$store.getters.stocks;
    }
  },

  watch: {
    sortNow() {
      if (this.sortNow) {
        this.sortBy(this.sortOrder);
      }
    }
  },

  methods: {
    refreshData() {
      this.$store.dispatch("initStocks");
    },
    sortItemsFn(item) {
      if (item === "name") {
        this.sortOrder = false;
      }
      this.sortItemsMenu = item;
      this.sortBy(this.sortOrder);
    },
    sortBy(b, v = this.sortItemsMenu) {
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
      } else if (v === "change") {
        this.stocks.sort(function(a, b) {
          if (vm.sortOrder) {
            return parseFloat(a.chg) - parseFloat(b.chg);
          } else {
            return parseFloat(b.chg) - parseFloat(a.chg);
          }
        });
      } else if (v === "percentage") {
        this.stocks.sort(function(a, b) {
          if (vm.sortOrder) {
            return parseFloat(b.chg_percent) - parseFloat(a.chg_percent);
          } else {
            return parseFloat(a.chg_percent) - parseFloat(b.chg_percent);
          }
        });
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
      }
    }
  }
};
</script>
