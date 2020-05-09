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
        path: '/home',
        component:() => import('@/components/common/Home.vue'),
        children: [
            {
                name:'Black',
                path:'/home/pages/black',
                component:() => import('@/components/common/Black.vue'),
            },
            {
                name:'HelloWorld',
                path:'/home/pages/helloWorld',
                component:() => import('@/components/HelloWorld.vue'),
            },
            {
                name:'SettingInfo',
                path:'/home/pages/SettingInfo',
                component:() => import('@/components/pages/SettingInfo.vue')
            },
            {
                name:'403',
                path:'/home/pages/403',
                component:() => import('@/components/pages/403.vue')
            },
            {
                name:'Donate',
                path:'/home/pages/Donate',
                component:() => import('@/components/pages/Donate.vue')
            },
            {
                name:'BaseTable',
                path:'/home/pages/base-table',
                component:() => import('@/components/pages/BaseTable.vue'),
                meta: { title: '基础表格' }
            },
            {
                name:'Icon',
                path:'/home/pages/Icon',
                component:() => import('@/components/pages/Icon.vue')
            },
            {
                name:'DragList',
                path:'/home/pages/DragList',
                component:() => import('@/components/pages/DragList.vue')
            },
            {
                name:'SystemUser',
                path:'/home/pages/system-user',
                component:() => import('@/components/pages/system/SystemUser.vue')
            },
            {
                name:'RoleManage',
                path:'/home/pages/role-manage',
                component:() => import('@/components/pages/system/RoleManage.vue')
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