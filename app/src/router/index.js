import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './../pages/LoginPage.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', component: LoginPage},
    ]
})
