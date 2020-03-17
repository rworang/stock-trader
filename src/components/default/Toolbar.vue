<template>
  <v-row>
    <v-toolbar
      dense
      elevation="0"
      :style="theme ? 'border-bottom:solid 2px rgba(0,0,0,0.2);' : ''"
      color="transparent"
    >
      <v-tabs class="pl-5">
        <v-tab
          v-for="(tab, index) in tabs"
          :key="tab.value + index"
          elevation="0"
          class="text-capitalize"
          tile
          :to="tab.to"
          >{{ tab.value }}</v-tab
        >
      </v-tabs>
      <v-spacer></v-spacer>

      <v-btn-toggle v-model="toggle" dense>
        <!--      <v-btn elevation="0" @click.stop="refreshData" class="border-radius-l"-->
        <!--      >Refresh <v-icon small>mdi-refresh</v-icon></v-btn-->
        <!--      >-->
        <v-btn title="Refresh results"><v-icon>mdi-refresh</v-icon></v-btn>
        <v-menu transition="fade-transition" offset-y dense>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" elevation="0">Sort by: {{ sortItemsMenu }} </v-btn>
          </template>
          <v-list class="py-0">
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
        <v-btn @click="sortBy(sortOrder)" title="Toggle sort order">
          <v-icon v-if="!sortOrder">mdi-sort-descending</v-icon>
          <v-icon v-else>mdi-sort-ascending</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-toolbar>
  </v-row>
</template>
<script>
export default {
  name: "Toolbar",

  computed: {
    theme() {
      return this.$store.getters.theme;
    },
    tabs() {
      return this.$store.getters.tabs;
    },
    vuetifyTheme() {
      return this.$vuetify.theme.isDark;
    }
  },

  data: () => ({
    toggle: undefined,
    sortOrder: true,
    sortItemsMenu: "name",
    sortItems: ["name", "price", "change", "percentage"]
  }),

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
