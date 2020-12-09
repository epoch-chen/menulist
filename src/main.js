import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Table, TableColumn, Pagination } from 'element-ui';
import axios from 'axios';
Vue.config.productionTip = false;
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Pagination);
Vue.prototype.$http = axios;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
