import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2';


// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
// const options = {
//   confirmButtonColor: '#41b882',
//   cancelButtonColor: '#ff7674',
// };

Vue.use(VueSweetalert2);
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')

