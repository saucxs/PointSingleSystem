import Vue from "vue";
import Router from "vue-router";
import Main from "@/components/Main";
import List from "@/components/List";
import My from "@/components/My";
import News from "@/components/News";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,
      redirect: '/list',
      children: [
        {
          path: "/list/:tableNum",
          name: "List",
          component: List
        },
        {
          path: "/my/:tableNum",
          name: "My",
          component: My
        },
          {
              path: "/news/:tableNum",
              name: "News",
              component: News
          }
      ]
    }
  ]
});
