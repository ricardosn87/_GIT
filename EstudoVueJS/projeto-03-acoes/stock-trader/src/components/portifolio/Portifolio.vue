<template>
  <v-layout row wrap>
    <Stock v-for="stock in stocks" :key="stock.id" :stock="stock" />
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import Stock from "./Stock.vue";

export default {
  components: { Stock },
  computed: {
    ...mapGetters({
      stocks: "stockPortifolio",
      
    }),
  },
};
</script>

<style>
</style>