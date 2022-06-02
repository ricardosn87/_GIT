<template>
  <div id="app" class="container">
    <h1>HTTP com Axios</h1>
    <b-card>
      <b-form-group label="Nome:">
        <b-form-input
          type="text"
          size="lg"
          v-model="usuario.nome"
          placeholder="Informe o Nome:"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="E-mail:">
        <b-form-input
          type="email"
          size="lg"
          v-model="usuario.email"
          placeholder="Informe o Email:"
        ></b-form-input>
      </b-form-group>
      <hr />
      <b-button @click="salvar" size="lg" variant="primary">Salvar</b-button>
      <b-button @click="obterUsuarios" size="lg" variant="success" class="ml-2"
        >Obter Usuarios</b-button
      >
    </b-card>
    <hr />
    <b-list-group>
      <b-list-group-item v-for="(usuario, id) in usuarios" :key="id">
        <strong>Nome:</strong> {{ usuario.nome }} <br />
        <strong>E-mail:</strong> {{ usuario.email }} <br />
        <strong>Id:</strong> {{ usuario.id }} <br />
        <b-button variant="warning" size="lg" @click="carregar(id)"
          >Carregar</b-button
        >
        <b-button variant="danger" size="lg" @click="excluir(id)" class="ml-2"
          >Excluir</b-button
        >
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      usuarios: [],
      id: null,
      usuario: {
        nome: "",
        email: "",
      },
    };
  },
  methods: {
    limapr() {
      this.usuario.nome = "";
      this.usuario.email = "";
      this.id = null;
    },
    salvar() {
      const metodo = this.id ? "patch" : "post";
      const finalUrl = this.id ? `/${this.id}.json` : ".json";
      this.$http[metodo](`/usuarios${finalUrl}`, this.usuario).then((_) =>
        this.limapr()
      );
      /* this.$http.post("usuarios.json", this.usuario).then(() => {
        this.limapr();
      }); */
    },
    carregar(id) {
      this.id = id;
      this.usuario = { ...this.usuarios[id] };
    },
    excluir(id) {
      this.$http.delete(`/usuarios/${id}.json`).then(() => {
        this.limapr();
      });
    },
    //obtendo com axiosa global
    obterUsuarios() {
      this.$http("usuarios.json").then((res) => {
        this.usuarios = res.data;
      });
    },
    //obtendo com axios local
    /* obterUsuarios(){
		Axios('https://curso-vue-14876-default-rtdb.firebaseio.com/usuarios.json').then(res=>{
			this.usuarios = res.data
		})
	} */
  },

  /*  created() {
	 this.$http.post('usuarios.json',{
		 nome: 'Maria',
		 email: 'ricardo@hotmail.com'
	 }).then(res=>console.log(res))
 }, */
};
</script>



<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.5rem;
}

#app h1 {
  text-align: center;
  margin: 50px;
}
</style>
