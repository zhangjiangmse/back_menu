import Vue from 'vue'
import App from './App.vue'
import router from './router';
import ElementUI from 'element-ui';
import i18n from "@/i18n/i18";
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import axios from '@/http/index'



const my_tag_list = [];
const my_editableTabsValue = {"active-tab":''};

Vue.prototype.$my_tag_list = my_tag_list;
Vue.prototype.$my_editableTabsValue = my_editableTabsValue;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios
Vue.use(ElementUI);

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
