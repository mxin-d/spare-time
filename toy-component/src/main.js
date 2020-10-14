import Vue from 'vue';
import App from './App.vue';
import MxUI from './mx/index';

Vue.config.productionTip = false;
Vue.use(MxUI)

new Vue({
  render: h => h(App),
}).$mount('#app');
