import Vue from "vue";
import VueRouter from "vue-router";


// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);
const routes = [
    {
        name:'Login',
        path: '/',
        redirect: '/Login'
    },
    {
        name:'Home',
        path: '/Home',
        component:() => import('@/components/common/Home.vue'),
        children: [
            {
                name:'Black',
                path:'/Home/pages/black',
                component:() => import('@/components/common/Black.vue'),
            },
            {
                name:'HelloWorld',
                path:'/Home/pages/helloWorld',
                component:() => import('@/components/HelloWorld.vue'),
            },
            {
                name:'SettingInfo',
                path:'/Home/pages/SettingInfo',
                component:() => import('@/components/pages/SettingInfo.vue')
            },
            {
                name:'403',
                path:'/Home/pages/403',
                component:() => import('@/components/pages/403.vue')
            },
            {
                name:'Donate',
                path:'/Home/pages/Donate',
                component:() => import('@/components/pages/Donate.vue')
            },
            {
                name:'BaseTable',
                path:'/Home/pages/BaseTable',
                component:() => import('@/components/pages/BaseTable.vue'),
                meta: { title: '基础表格' }
            },
            {
                name:'Icon',
                path:'/Home/pages/Icon',
                component:() => import('@/components/pages/Icon.vue')
            }
        ]
    },
    {
        name:'Login',
        path:'/login',
        component:() => import('@/components/pages/Login.vue'),
    },


]

var router =  new VueRouter({
    routes
})
export default router;