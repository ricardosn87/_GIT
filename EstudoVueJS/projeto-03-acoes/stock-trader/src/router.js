import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Portfolio from './components/portifolio/Portifolio'
import Stocks from './components/stocks/Stocks'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/portifolio', component: Portfolio },
        { path: '/stocks', component: Stocks },
    ]
})