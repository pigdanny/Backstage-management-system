import Vue from "vue";
import VueRouter from "vue-router";

import Login from "./components/Login";
import Index from "./components/Index";

import {checktoken} from "./api/apis";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        path: "/",
        name: "Login",
        component: Login
    }, {
        path: "/Index",
        name: "Index",
        component: Index
    }, {
        path: "/Order",
        name: "Order",
        component: () => import("./components/Order")
    }, {
        path: "/ShopList",
        name: "ShopList",
        component: () => import("./components/ShopList")
    }, {
        path: "/ShopAdd",
        name: "ShopAdd",
        component: () => import("./components/ShopAdd")
    }, {
        path: "/ShopClass",
        name: "ShopClass",
        component: () => import("./components/ShopClass")
    }, {
        path: "/Store",
        name: "Store",
        component: () => import("./components/Store")
    }, {
        path: "/AccountList",
        name: "AccountList",
        component: () => import("./components/AccountList")
    }, {
        path: "/AccountAdd",
        name: "AccountAdd",
        component: () => import("./components/AccountAdd")
    }, {
        path: "/AccountPsd",
        name: "AccountPsd",
        component: () => import("./components/AccountPsd")
    }, {
        path: "/InfoShop",
        name: "InfoShop",
        component: () => import("./components/InfoShop")
    }, {
        path: "/InfoOrder",
        name: "InfoOrder",
        component: () => import("./components/InfoOrder")
    }, {
        path: "/Person",
        name: "Person",
        component: () => import("./components/Person")
    }, ]
})


router.beforeEach((to, from, next) => {
    if (to.path != "/") {
        checktoken(localStorage.token).then((res) => {
            if (res.data.code == 0) {
                next()
            } else {
                next("/")
            }
        })
    } else {
        next()
    }
});

export default router