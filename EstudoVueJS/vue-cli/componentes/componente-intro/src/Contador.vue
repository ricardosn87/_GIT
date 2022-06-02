<template>
  <div class="contador">
    <h1>Contador</h1>
    <div>{{ contador }}</div>
    <button @click="adicionar">+</button>
    <button @click="subtrair">-</button>
  </div>
</template>


<script>
export default {
  name: "AppContador",
  data() {
    return {
      contador: 0,
    };
  },
  methods: {
      adicionar(){
          this.contador++;
      },
      subtrair(){
           this.contador--;
      }
  },
};
</script>

<style scoped>
span {
  border-bottom: 1px solid #ccc;
  height: 30px;
  padding: 5px 25px;
}

button {
  height: 30px;
  widows: 30px;
  border-radius: 15px;
  background-color: coral;
  color: #fff;
  margin-left: 10px;
  outline: none;
}
/* .contador span {
  border-bottom: 1px solid #ccc;
  height: 30px;
  padding: 5px 25px;
}

.contador button {
  height: 30px;
  widows: 30px;
  border-radius: 15px;
  background-color: coral;
  color: #fff;
  margin-left: 10px;
  outline: none;
} */
</style>