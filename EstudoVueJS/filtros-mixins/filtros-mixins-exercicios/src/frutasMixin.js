export default {
    data() {
      return {
        fruta: "",
        frutas: ["banana", "maçâ", "laranja"],
      };
    },
    methods: {
      add() {
        this.frutas.push(this.fruta);
        this.fruta = "";
      },
    }
  };