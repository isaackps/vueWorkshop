<template>
  <div>
    <Stock v-for="(stock, i) in stocksPortfolio" :key="i" :stock="stock"></Stock>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import Stock from './Stock.vue'

export default {
  components: {
    Stock
  },
  computed: {
    ...mapGetters(['stocksPortfolio'])
  }
}
</script>