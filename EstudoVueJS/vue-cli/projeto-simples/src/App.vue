<template>
  <div id="app">{{ titulo }}
    <button @click="titulo += '#'">Alterar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titulo: "Teste Data usando Vue JS!!",
    };
  },
};
</script>

<style>
#app {
  background-color: chocolate;
  color: aliceblue;
}
</style>

