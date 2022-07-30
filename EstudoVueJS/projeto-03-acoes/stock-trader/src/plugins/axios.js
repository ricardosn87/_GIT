import axios from "axios";
import Vue from "vue";

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios.create({
            baseURL: 'https://curso-vue-14876-default-rtdb.firebaseio.com/'
        })
    }
})