"use strict";
// 引入vue和axios
import Vue from "vue";
import axios from "axios";
import router from '../router'

import {
    serveUrl,
    getConfig,
    postConfig,
} from "./config";

// 继承vue的原型方法
Vue.prototype.axios = axios;

axios.interceptors.response.use(
    response => {
        let data = response.data;
        console.log(data,'data');
        if (!data.data) {
            //   登陆成功的回调地址
            router.replace({
                path: '/login',
                query: {redirect: router.currentRoute.fullPath}
            })
            return data;
        } else {
            return data;
        }
    },
    error => ({
        code: -1,
        msg: "网络异常"
    })
);

export default {
    // API请求example
    getUserInfo: params => {
        return axios.post("/user/queryuser", params);
    },
    login: params => {
        return axios.post("/user/login", params)
    },
    logOut: params => {
        return axios.post("/user/logout", params)
    },
    getOrder: params => {
        return axios.post("/order/getOrder", params);
    },
    getFood: params => {
        return axios.post("/food/getFood", params);
    },
    getFoodCategory: params => {
        return axios.post("/food/getCategory", params);
    }



    /**
     * API demo
     *
     * getAPI: (params) => {
     *    getConfig.params = params.params
     *    return axios.get('xxxx.do', getConfig)
     * }
     *
     * postAPI: (params) => {
     *     return axios.post('xxxx.do', params, postConfig)
     * }
     */
}
