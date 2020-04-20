import Vue from "vue";
import VueRouter from "vue-router";


// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);
const routes = [
    {
        path:'/pages/helloWorld',
        component:() => import(/* webpackChunkName: "home" */ '@/components/HelloWorld.vue'),
    }
]

var router =  new VueRouter({
    routes
})
export default router;