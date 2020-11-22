<template>
<div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar :background-color="sidebarBackground" short-title="Argon" title="Argon">
        <template slot="links">
            <h5 class="container">Dashboard - Sảnh chính</h5>
            <sidebar-item :link="{
            name: 'Sảnh chính',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard'
          }" />

            <h5 class="container">Profile - Hồ sơ</h5>
            <sidebar-item :link="{name: 'Hồ sơ', icon: 'ni ni-single-02 text-yellow', path: '/profile'}" />

            <h5 class="container">Products - Sản phẩm</h5>
            <sidebar-item :link="{name: 'Danh sách sản phẩm', icon: 'ni ni-bullet-list-67 text-success', path: '/products-list'}" />
            <sidebar-item :link="{name: 'Thêm sản phẩm', icon: 'ni ni-fat-add text-success', path: '/products-add'}" />

            <h5 class="container">List Orders & Bill - Đơn hàng</h5>
            <sidebar-item :link="{name: 'Tất cả', icon: 'ni ni-ungroup text-orange', path: '/order-list'}" />
            <sidebar-item :link="{name: 'Đơn mới', icon: 'ni ni-satisfied text-orange', path: '/new-order'}" />

            <h5 class="container">Sale Off - Khuyến mãi</h5>
            <sidebar-item :link="{name: 'Khuyến mãi', icon: 'ni ni-box-2 text-warning', path: '/sale-off'}" />

            <h5 class="container">Reviews - Đánh giá</h5>
            <sidebar-item :link="{name: 'Đánh giá', icon: 'ni ni-chat-round text-info', path: '/reviews'}" />

        </template>

    </side-bar>

    <div class="main-content" :data="sidebarBackground">
        <dashboard-navbar></dashboard-navbar>

        <div @click="toggleSidebar">
            <fade-transition :duration="200" origin="center top" mode="out-in">
                <!-- your content here -->
                <router-view></router-view>
            </fade-transition>
            <content-footer v-if="!$route.meta.hideFooter"></content-footer>
        </div>
    </div>
</div>
</template>

<script>
import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import {
    FadeTransition
} from 'vue2-transitions';

export default {
    components: {
        DashboardNavbar,
        ContentFooter,
        FadeTransition
    },
    data() {
        return {
            sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
        };
    },
    methods: {
        toggleSidebar() {
            if (this.$sidebar.showSidebar) {
                this.$sidebar.displaySidebar(false);
            }
        }
    }
};
</script>

<style lang="scss">
</style>
