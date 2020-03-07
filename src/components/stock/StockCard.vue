<template>
  <v-card>
    <stock-card-header>
      <template slot="name">{{ stock.name }}</template>
      <template slot="abbr">{{ stock.abbr }}</template>
    </stock-card-header>
  </v-card>
</template>

<script>
const header = () => import("./card/CardHeader");

export default {
  name: "StockCard",

  props: {
    stock: {
      type: Object,
      default: () => ({})
    }
  },

  components: {
    "stock-card-header": header
  }
};
</script>
