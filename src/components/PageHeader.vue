<template>
  <v-col class="text-right pt-5">
    <v-btn elevation="0" @click.stop="refreshData" class="border-radius-l"
      >Refresh <v-icon small>mdi-refresh</v-icon></v-btn
    >

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
</template>
<script>
export default {
  name: "PageHeader",

  props: {
    page: {
      type: String,
      default: "stocks"
    }
  },

  data: () => {
    return {
      sortOrder: true,
      sortItemsMenu: "name",
      sortItems: ["name", "price", "change", "percentage"]
    };
  },

  computed: {
    stocks() {
      return this.$store.getters.stocks;
    }
  },

  watch: {},

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
    sortBy(boolean = true, sortValue = this.sortItemsMenu) {
      this.sortOrder = !boolean;
      // console.log(sortValue);
      this.$store.dispatch("sortStocks", { boolean, sortValue });
    }
  }
};
</script>
