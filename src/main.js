/*!

=========================================================
* Vue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import VueAlertify from 'vue-alertify'
import Vuelidate from 'vuelidate'
import io from 'socket.io-client'
import getCookie from './getCookie.js'
Vue.use(VueAlertify);
Vue.use(Vuelidate);



// import "bootstrap/dist/css/bootstrap.min.css"
// import "./../node_modules/bootstrap/dist/js/bootstrap.bundle"

// product add by category
import ProductAddBook from './views/AddProducts/ProductAddBook.vue'
import ProductAddElectronic from './views/AddProducts/ProductAddElectronic.vue'
import ProductAddFashion from './views/AddProducts/ProductAddFashion.vue'
import ProductAddHouseholdGoods from './views/AddProducts/ProductAddHouseholdGoods.vue'
import ProductAddIT from './views/AddProducts/ProductAddIT.vue'
import ProductAddToy from './views/AddProducts/ProductAddToy.vue'

Vue.component('ProductAddBook', ProductAddBook)
Vue.component('ProductAddElectronic', ProductAddElectronic)
Vue.component('ProductAddFashion', ProductAddFashion)
Vue.component('ProductAddHouseholdGoods', ProductAddHouseholdGoods)
Vue.component('ProductAddIT', ProductAddIT)
Vue.component('ProductAddToy', ProductAddToy)

// modal detail products
import ModalBook from './views/ModalDetailProducts/ModalBook.vue'
import ModalElectronic from './views/ModalDetailProducts/ModalElectronic.vue'
import ModalFashion from './views/ModalDetailProducts/ModalFashion.vue'
import ModalHouseholdGoods from './views/ModalDetailProducts/ModalHouseholdGoods.vue'
import ModalIT from './views/ModalDetailProducts/ModalIT.vue'
import ModalToy from './views/ModalDetailProducts/ModalToy.vue'
Vue.component('ModalBook', ModalBook)
Vue.component('ModalElectronic', ModalElectronic)
Vue.component('ModalFashion', ModalFashion)
Vue.component('ModalHouseholdGoods', ModalHouseholdGoods)
Vue.component('ModalIT', ModalIT)
Vue.component('ModalToy', ModalToy)

import vSelect from 'vue-select'

Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';


import Vuex from 'vuex'
import CKEditor from 'ckeditor4-vue';

Vue.use( CKEditor );

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    danhMucChinh: '',
    imageData:[],
    danhMucCon: '',
    shop: [],
    productDetail:null,
    category_id:null,
    notication:[],
    selectOrder:{
      username:"Nguyễn Hữu Tiến"
    },
    ViewProductDetail:{},
  },
})

Vue.config.productionTip = false

const userId = getCookie('shop_id');

export const EventBus = new Vue()
export const socket = io(`https://wetech-socket-11-12.herokuapp.com`,{query:`userId=${userId}`})
export const server = 'https://website-tmdt.herokuapp.com/api'
Vue.use(ArgonDashboard)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

