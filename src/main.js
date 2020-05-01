import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from "@/store";
import ElementUI from 'element-ui';
import i18n from "@/i18n/i18";
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import 'element-ui/lib/theme-chalk/display.css';
import '@/assets/alibabaiconfont/iconfont.css'; //阿里巴巴矢量库
import axios from '@/http/index';
import staticValue from '@/components/common/staticValue'



const my_tag_list = [];
const my_editableTabsValue = {"active-tab":''};

Vue.prototype.$my_tag_list = my_tag_list;
Vue.prototype.$my_editableTabsValue = my_editableTabsValue;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios
Vue.prototype.$staticValue = staticValue
Vue.use(ElementUI);


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 管理系统 ` ;
  const role = localStorage.getItem('ms_username');
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403');
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      next();
    }
  }
});


new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')
