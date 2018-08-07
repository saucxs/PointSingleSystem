import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/Main";
import login from "@/views/login";
import home from "@/views/home";

import navbar from "@/components/navBar";
import sidebar from "@/components/sideBar";

import orderManagement from "@/views/orderManagement/orderManagement";
import foodManagement from "@/views/foodManagement/foodManagement";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main
    },
     {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/home",
      name: "home",
      component: home,
      children:[  
            { 
              path: "/home/orderManagement",
              name:"orderManagement",
              component: orderManagement ,
            },
          {
              path: "/home/foodManagement",
              name:"foodManagement",
              component: foodManagement ,
          },
        ]  
    }
     
  ]
});
