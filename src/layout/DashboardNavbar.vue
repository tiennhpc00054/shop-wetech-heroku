<template>
  <base-nav
    class="navbar-top navbar-dark"
    id="navbar-main"
    :show-toggle-button="false"
    expand
  >
    <ul class="navbar-nav align-items-center d-none d-md-flex ml-lg-auto">
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0">
          <div class="media align-items-center" slot="title">
            <span class="avatar avatar-sm rounded-circle">
              <img alt="Avatar" v-bind:src="user.avatar" />
            </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm font-weight-bold">{{ user.name }}</span>
            </div>
          </div>

          <template>
            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Shop {{ user.shop_name }}</h6>
            </div>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>Hồ sơ</span>
            </router-link>
            <div class="dropdown-divider"></div>
            <div class="dropdown-item" @click="Logout()">
              <i class="ni ni-curved-next"></i>
              <span>Đăng xuất</span>
            </div>
          </template>
        </base-dropdown>
      </li>
      <base-dropdown class="nav-item" position="right" style="position: relative;">
        <a
          slot="title"
          class="nav-link nav-link-icon"
          href="#"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
        <span style="position: absolute;top:-10px;right:10px;padding:5px;z-index: 99" class="text-danger">
          <img width="10" height="10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Location_dot_red.svg/1024px-Location_dot_red.svg.png" />
        </span>
          <i  class="ni ni-bell-55"></i>
        </a>

        <a class="dropdown-item" href="javascript:void(0)">
          <div
            class="row container "
            style=";padding-right:30px"
            v-for="(notification, index) in notifications"
            v-bind:key="index+235"
          >
            <span class="avatar avatar-sm rounded-circle">
              <img alt="Avatar" v-bind:src="notification.avatar" />
            </span>
            <div class="col"><strong>{{notification.message}}</strong> {{notification.username}}</div>
          </div>
        </a>
      </base-dropdown>
    </ul>
  </base-nav>
</template>

<script>
import {store} from './../main'
export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
      user: {},
      notifications: [
        {
          username:"abc",
          avatar:"https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-1/p160x160/122750096_675938226649137_7036380323165245128_o.jpg?_nc_cat=110&ccb=2&_nc_sid=dbb9e7&_nc_ohc=D0wuk_1Q2UoAX_a_D8-&_nc_ht=scontent.fdad2-1.fna&tp=6&oh=9fa4dfb5e63436016c5a01dbc484485d&oe=5FD18884",
          message:"Bạn nhận được đơn mới từ"
        },
        {
          username:"abc",
          avatar:"https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-1/p160x160/122750096_675938226649137_7036380323165245128_o.jpg?_nc_cat=110&ccb=2&_nc_sid=dbb9e7&_nc_ohc=D0wuk_1Q2UoAX_a_D8-&_nc_ht=scontent.fdad2-1.fna&tp=6&oh=9fa4dfb5e63436016c5a01dbc484485d&oe=5FD18884",
          message:"Bạn nhận được đơn mới từ"
        },
        {
          username:"abc",
          avatar:"https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-1/p160x160/122750096_675938226649137_7036380323165245128_o.jpg?_nc_cat=110&ccb=2&_nc_sid=dbb9e7&_nc_ohc=D0wuk_1Q2UoAX_a_D8-&_nc_ht=scontent.fdad2-1.fna&tp=6&oh=9fa4dfb5e63436016c5a01dbc484485d&oe=5FD18884",
          message:"Bạn nhận được đơn mới từ"
        }
      ],
    };
  },
  created() {
    this.notifications = store.state.notication
    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    }

    this.user = JSON.parse(getCookie("user"));
    document.title = "Shop "+this.user.shop_name
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    Logout() {
      document.cookie = `user=null; max-age=0`;
      document.cookie = `user_id=null; max-age=0`;
      document.cookie = `shop_id=null; max-age=0`;
      window.location = "/login";
    },
  },
};
</script>
