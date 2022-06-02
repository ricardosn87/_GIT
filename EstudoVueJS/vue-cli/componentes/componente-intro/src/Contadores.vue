<template>
  <div class="contadores">
    <app-contador v-for="c in 1" :key="c" />
  </div>
</template>

<script>
import Contador from "./Contador.vue";

export default {
  name: "AppContadores",
  components: {
    "app-contador": Contador,
  },
};
</script>

<style>
</style>