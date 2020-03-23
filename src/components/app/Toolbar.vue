<template>
  <v-row
    :style="
      'border-bottom: solid 2px' + $vuetify.theme.themes.dark.primary + ';'
    "
  >
    <v-toolbar color="transparent" flat>
      <v-tabs class="pl-3" hide-slider>
        <v-tab
          @click="$store.dispatch('setMini', true)"
          v-for="(tab, index) in tabs"
          :key="tab.value + index"
          class="text-capitalize"
          :to="tab.to"
          tile
        >
          {{ tab.value }}
        </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <template v-if="$route.name === 'stocks'">
        <v-menu offset-y dense>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" elevation="0">
              Sort by: {{ sortItemsMenu }}
            </v-btn>
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
        <v-fade-transition>
          <v-btn text @click="sortBy(sortOrder)" title="Toggle sort order">
            <v-icon v-if="!sortOrder">mdi-sort-descending</v-icon>
            <v-icon v-else>mdi-sort-ascending</v-icon>
          </v-btn>
        </v-fade-transition>
      </template>
      <!--      <v-btn elevation="0" @click.stop="refreshData" class="border-radius-l"-->
      <!--      >Refresh <v-icon small>mdi-refresh</v-icon></v-btn-->
      <!--      >-->
      <v-btn title="Refresh results" text><v-icon>mdi-refresh</v-icon></v-btn>
    </v-toolbar>
  </v-row>
</template>
<script>
export default {
  name: "Toolbar",
  computed: {
    tabs() {
      return this.$store.getters.tabs;
    }
  },
  data: () => ({
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
