// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入vuex
import Vuex from 'vuex'
import store from './vuex'
// 引入ele
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false

// use
Vue.use(Vuex);
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
    if(store.getters.userInfo){
        store.dispatch("getUserInfo", {}).then(response => {
            if(!response.data){
                next({
                    path: '/login',
                    query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }else{
                store.commit("USER_INFO", response.data);
                next();
            }
        })
    }else{
        next();
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
