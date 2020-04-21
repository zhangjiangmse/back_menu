import Vue from "vue";
import VueRouter from "vue-router";


// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);
const routes = [
    {
        path:'/pages/helloWorld',
        component:() => import('@/components/HelloWorld.vue'),
    },
    {
        path:'/pages/SettingInfo',
        component:() => import('@/components/pages/SettingInfo.vue')
    },
    {
        path:'/pages/403',
        component:() => import('@/components/pages/403.vue')

    }
]

var router =  new VueRouter({
    routes
})
export default router;