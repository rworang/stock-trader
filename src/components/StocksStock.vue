<template>
  <v-card outlined @click="cardClick">
    <v-row>
      <v-col :cols="8" class="py-0">
        <v-card-title class="display-1">
          {{ stock.abbr }}
        </v-card-title>
        <v-card-subtitle>{{ stock.name }}</v-card-subtitle>
      </v-col>
      <v-col :cols="4" class="text-right pr-7">
        <span class="headline currency">{{ stock.price }}</span>
      </v-col>
    </v-row>
    <v-card-text class="py-0">
      <v-row>
        <v-col :cols="8" class="pb-0">
          <v-text-field
            v-model="quantity"
            label="Buy stocks"
            ref="buyStock"
            clearable
            dense
            dark
          ></v-text-field>
        </v-col>
        <v-col :cols="4">
          <v-btn
            color="success"
            @click="buyStock"
            :disabled="quantity <= 0 || !Number.isInteger(quantity)"
            block
            >Buy</v-btn
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Stock",

  props: {
    stock: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    quantity: null,
    buyRules: [v => /^\d+$/.test(v) || "Only numbers are allowed"]
  }),

  watch: {
    quantity() {
      if (!Number.isInteger(this.quantity)) {
        this.quantity = parseInt(this.quantity);
      }
      if (Number.isNaN(this.quantity)) {
        this.quantity = null;
      }
    }
  },

  methods: {
    cardClick() {
      this.$refs.buyStock.focus();
      this.quantity = null;
    },
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      };
      this.$store.dispatch("buyStock", order);
      this.quantity = null;
    }
  }
};
</script>

<style scoped lang="scss">
.v-card:hover {
  background: #2e2e2e;
  cursor: default;
}

.slide-enter {
  /*transform: translateY(20px);*/
}
.slide-enter-active {
  animation: slide-in 0.5s ease-out forwards;
}
.slide-leave {
}
.slide-leave-active {
  animation: slide-out 0.5s ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(20px);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
