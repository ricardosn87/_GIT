<template>
  <div class="usuario-editar">
    <h3>Usuário Editar</h3>
    <p><strong>Código:</strong>{{ id }} /</p>
    <p><strong>Código:</strong>{{ $route.params.id }}</p>
    <p><strong>Completo:</strong>{{ $route.query.completo ? "Sim" : "Não" }}</p>
    <p><strong>Lingua:</strong>{{ $route.query.lingua }}</p>
    <hr />
    <button primario @click="confirmou = true">Confirmar</button>
    <div id="rodape">
      <h3>Curso Vue</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      confirmou: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.confirmou) {
      next();
    } else {
      if (confirm("Tem certeza?")) {
        next();
      } else next(false);
    }
  },
};
</script>

<style>
#rodape {
  margin-top: 1000px;
}
</style>