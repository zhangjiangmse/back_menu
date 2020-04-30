import Vue from "vue";
import VueRouter from "vue-router";


// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);
const routes = [
    {
        name:'Black',
        path: '/',
        redirect: '/black'
    },
    {
        name:'Black',
        path:'/black',
        component:() => import('@/components/common/Black.vue'),
    },
    {
        name:'HelloWorld',
        path:'/pages/helloWorld',
        component:() => import('@/components/HelloWorld.vue'),
    },
    {
        name:'SettingInfo',
        path:'/pages/SettingInfo',
        component:() => import('@/components/pages/SettingInfo.vue')
    },
    {
        name:'403',
        path:'/pages/403',
        component:() => import('@/components/pages/403.vue')
    },
    {
        name:'Donate',
        path:'/pages/Donate',
        component:() => import('@/components/pages/Donate.vue')
    },
    {
        name:'BaseTable',
        path:'/pages/BaseTable',
        component:() => import('@/components/pages/BaseTable.vue')
    },
    {
        name:'Icon',
        path:'/pages/Icon',
        component:() => import('@/components/pages/Icon.vue')
    }

]

var router =  new VueRouter({
    routes
})
export default router;