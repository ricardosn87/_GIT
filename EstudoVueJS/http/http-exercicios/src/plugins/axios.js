import Axios from "axios";
import Vue from "vue";

//Axios.defaults.baseURL = 'https://curso-vue-14876-default-rtdb.firebaseio.com/'

Vue.use({
    install(Vue) {
        //Vue.prototype.$http = Axios
        Vue.prototype.$http = Axios.create({
            baseURL: 'https://curso-vue-14876-default-rtdb.firebaseio.com/',
            headers:{
                "Authorization":"abc123"
            }
        })

        Vue.prototype.$http.interceptors.request.use(config => {
            console.log(config.method)
            return config
        }, error => Promise.reject(error))


        Vue.prototype.$http.interceptors.response.use(res => {

            const array = []

            for (let chave in res.data) {
                array.push({ id: chave, ...res.data[chave] })
            }

            res.data = array
            return res
        }, error => Promise.reject(error))
    }
})