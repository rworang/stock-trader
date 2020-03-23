<template>
  <v-container fluid class="px-3">
    <v-row>
      <v-col class="py-0">
        <v-subheader class="display-1">Top 10 stocks</v-subheader>
      </v-col>
    </v-row>
    <v-row style="min-height: 504px;">
      <v-col class="flex-grow-0 pr-0" style="min-width: 300px;">
        <v-list color="transparent" class="py-0">
          <v-list-item v-for="item in list" :key="item.id" link color="primary">
            {{
              item.price +
                " - " +
                $store.getters.stocksList.find(e => e.id === item.id).name
            }}
          </v-list-item>
        </v-list>
      </v-col>
      <v-col class="pl-0">
        <v-sheet
          width="100%"
          height="100%"
          color="grey"
          class="lighten-4 pa-6 pt-8 pb-12"
        >
          <div
            style="position: relative; width: 100%; height: 100%; overflow: hidden;"
            class="border-bottom"
          >
            <v-sheet v-for="i in 10" :key="i" class="graph-ruler">
              <v-hover v-slot="{ hover }">
                <div>
                  <v-fade-transition>
                    <div
                      class="text-right flex pr-2 line-highlight"
                      :style="
                        'position: absolute; min-height: 10%; max-height: 10%; width: 100%; ' +
                          'top: ' +
                          (i - 1) * 10 +
                          '%;' +
                          (hover
                            ? 'background: ' +
                              $vuetify.theme.themes.dark.primary +
                              'cc;'
                            : '')
                      "
                    ></div>
                  </v-fade-transition>
                  <div
                    class="flex pr-2 graph-ruler-marker"
                    :style="
                      'position: absolute; min-height: 10%; max-height: 10%; width: 60px; ' +
                        'top: ' +
                        (i - 1) * 10 +
                        '%;'
                    "
                  >
                    <div
                      style="position: absolute; top: 50%; right: 8px; transform: translateY(-50%);"
                    >
                      {{
                        !loadingStock ? (graphMax() / 10) * (10 - (i - 1)) : ""
                      }}
                    </div>
                  </div>
                </div>
              </v-hover>
            </v-sheet>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Graph",
  props: {
    id: {
      type: Number,
      default: 4
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  },
  methods: {
    graphMax() {
      let lh = this.listHigh.split(".")[0].toString(),
        d = "1";
      for (let i = 0; i < lh.length - 1; i++) {
        d += "0";
      }
      return Math.ceil(lh / d) * d;
    }
  },
  watch: {
    // listHigh() {
    //   let lh = this.listHigh.split(".")[0].toString(),
    //     div = "1";
    //   for (let i = 0; i < lh.length - 1; i++) {
    //     div += "0";
    //   }
    //   console.log(Math.ceil(lh / div) * div);
    // }
  },
  data: () => ({
    hovering: false,
    list: [],
    listHigh: null,
    listLow: null,
    loading: true,
    loadingStock: true,
    transition: "scale-transition"
  }),
  async beforeMount() {
    this.list = await this.$store.dispatch("getTopRank");
    this.listHigh = this.list[0].price;
    this.listLow = this.list[9].price;
    this.loadingStock = false;
  }
};
</script>

<style lang="scss" scoped>
.graph-ruler-marker {
  border-right: solid 1px rgba(0, 0, 0, 0.3);
}
.border-bottom {
  border-bottom: solid 1px rgba(0, 0, 0, 0.3);
}
</style>
