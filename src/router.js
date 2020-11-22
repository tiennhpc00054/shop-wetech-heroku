import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

//add product
import ProductsList from './views/ProductsList.vue'
import ProductsAdd from './views/ProductsAdd.vue'
import OrderList from './views/OrderList.vue'
import OrderNew from './views/OrderNew.vue'
import ViewProductDetail from './views/ViewProductDetail.vue'
import SaleOff from './views/SaleOff.vue'
import Review from './views/Reviews.vue'

//add detail product
import DetailsAddBook from './views/AddDetails/DetailsAddBook.vue'
import DetailsAddToy from './views/AddDetails/DetailsAddToy.vue'
import DetailsAddFashion from './views/AddDetails/DetailsAddFashion.vue'
import DetailsAddHouseholdGoods from './views/AddDetails/DetailsAddHouseholdGoods.vue'
import DetailsAddIT from './views/AddDetails/DetailsAddIT.vue'
import DetailsAddElectronic from './views/AddDetails/DetailsAddElectronic.vue'

//view product detail
import ViewDetailsAndUpdateBook from './views/ViewDetailsAndUpdate/ViewDetailsAndUpdateBook.vue'
import ViewDetailsAndUpdateToy from './views/ViewDetailsAndUpdate/ViewDetailsAndUpdateToy.vue'
import ViewDetailsAndUpdateFashion from './views/ViewDetailsAndUpdate/ViewDetailsAndUpdateFashion.vue'
import ViewDetailsAndUpdateHouseholdGoods from './views/ViewDetailsAndUpdate/ViewDetailsAndUpdateHouseholdGoods.vue'
import ViewDetailsAndUpdateIT from './views/ViewDetailsAndUpdate/ViewDetailsAndUpdateIT.vue'
import ViewDetailsAndUpdateElectronic from './views/ViewDetailsAndUpdate/ViewDetailsAndUpdateElectronic.vue'

import swal from 'sweetalert';

export default new Router({
  linkExactActiveClass: 'active',
  mode:"history",
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      beforeEnter: (to, from, next) => {
        if(document.cookie){
          next()
        }else{
          swal({
            title: "Hết phiên đăng nhập!",
            text: "Vui lòng đăng nhập lại!",
            button: "Đăng nhập"
          });
          next({path: '/login'})
        }
      },
      children: [
        {
          path: '/dashboard',
          name: 'Sảnh chính',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue'),
        },
        //profile
        {
          path: '/profile',
          name: 'Hồ sơ',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        //product
        {
          path: '/products-list',
          name: 'Danh sách sản phẩm',
          component: ProductsList
        },
        {
          path: '/products-add',
          name: 'Thêm sản phẩm',
          component: ProductsAdd
        },
        {
          path: '/order-list',
          name: 'Danh sách đơn hàng',
          component: OrderList
        },
        {
          path: '/new-order',
          name: 'Đơn hàng mới - Chờ duyệt',
          component: OrderNew
        },
        {
          path: '/view-product-detail',
          name: 'Chi tiết sản phẩm',
          component: ViewProductDetail
        },
        {
          path: '/sale-off',
          name: 'Khuyến mãi',
          component: SaleOff
        },
        {
          path: '/reviews',
          name: 'Đánh giá',
          component: Review
        },
        //thêm biến thể
        {
          path: '/detail-add-book',
          name: 'Thêm biến thể sách',
          component: DetailsAddBook
        },
        {
          path: '/detail-add-toy',
          name: 'Thêm biến thể Đồ chơi - Mẹ và bé',
          component: DetailsAddToy
        },
        {
          path: '/detail-add-fashion',
          name: 'Thêm biến thể Thời trang',
          component: DetailsAddFashion
        },
        {
          path: '/detail-add-house-hold-goods',
          name: 'Thêm biến thể Hàng tiêu dùng',
          component: DetailsAddHouseholdGoods
        },
        {
          path: '/detail-add-information-technology',
          name: 'Thêm biến thể Công nghệ',
          component: DetailsAddIT
        },
        {
          path: '/detail-add-electronic',
          name: 'Thêm biến thể Điện tử',
          component: DetailsAddElectronic
        },
        //xem chi tiết sản phẩm
        {
          path: '/view-product-detail-book',
          name: 'Xem chi tiết và cập nhật biến thể sách',
          component: ViewDetailsAndUpdateBook
        },
        {
          path: '/view-product-detail-toy',
          name: 'Xem chi tiết và cập nhật biến thể Đồ chơi - Mẹ và bé',
          component: ViewDetailsAndUpdateToy
        },
        {
          path: '/view-product-detail-fashion',
          name: 'Xem chi tiết và cập nhật biến thể Thời trang',
          component: ViewDetailsAndUpdateFashion
        },
        {
          path: '/view-product-detail-house-hold-goods',
          name: 'Xem chi tiết và cập nhật biến thể Hàng tiêu dùng',
          component: ViewDetailsAndUpdateHouseholdGoods
        },
        {
          path: '/view-product-detail-information-technology',
          name: 'Xem chi tiết và cập nhật biến thể Công nghệ',
          component: ViewDetailsAndUpdateIT
        },
        {
          path: '/view-product-detail-electronic',
          name: 'Xem chi tiết và cập nhật biến thể Điện tử',
          component: ViewDetailsAndUpdateElectronic
        },
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    }
  ]
})
