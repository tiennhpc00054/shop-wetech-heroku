<template>
  <nav
    class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white"
    id="sidenav-main"
  >
    <div class="container-fluid">
      <!--Toggler-->
      <navbar-toggle-button @click.native="showSidebar">
        <span class="navbar-toggler-icon"></span>
      </navbar-toggle-button>
      <router-link class="navbar-brand" to="/"> </router-link>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <base-dropdown class="nav-item" position="right">
            <a class="dropdown-item" href="javascript:void(0)">
              <div
                class="row container"
                style="padding-right: 30px"
                v-for="(notification, index) in notifications"
                v-bind:key="index + 235"
              >
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Avatar" v-bind:src="notification.avatar" />
                </span>
                <div class="col">
                  <strong>{{ notification.message }}</strong>
                  {{ notification.username }}
                </div>
                <br>
                <br>
              </div>
            </a>
          </base-dropdown>
          <base-dropdown class="nav-item" position="right">
            <a slot="title" class="nav-link" href="#" role="button">
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" v-bind:src="user.avatar" />
                </span>
              </div>
            </a>

            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Shop {{ user.shop_name }}</h6>
            </div>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>Hồ sơ</span>
            </router-link>
            <div class="dropdown-divider"></div>
            <a
              href="javascript:void(0)"
              class="dropdown-item"
              @click="Logout()"
            >
              <i class="ni ni-curved-next"></i>
              <span>Đăng xuất</span>
            </a>
          </base-dropdown>
        </ul>
      </slot>
      <slot></slot>
      <div
        v-show="$sidebar.showSidebar"
        class="navbar-collapse collapse show"
        id="sidenav-collapse-main"
      >
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img :src="logo" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button
                @click.native="closeSidebar"
              ></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links"> </slot>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";

export default {
  name: "sidebar",
  data() {
    return {
      user: {},
      notifications: [
        {
          username: "abc",
          avatar:
            "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-1/p160x160/122750096_675938226649137_7036380323165245128_o.jpg?_nc_cat=110&ccb=2&_nc_sid=dbb9e7&_nc_ohc=D0wuk_1Q2UoAX_a_D8-&_nc_ht=scontent.fdad2-1.fna&tp=6&oh=9fa4dfb5e63436016c5a01dbc484485d&oe=5FD18884",
          message: "Bạn nhận được đơn mới từ",
        },
        {
          username: "abc",
          avatar:
            "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-1/p160x160/122750096_675938226649137_7036380323165245128_o.jpg?_nc_cat=110&ccb=2&_nc_sid=dbb9e7&_nc_ohc=D0wuk_1Q2UoAX_a_D8-&_nc_ht=scontent.fdad2-1.fna&tp=6&oh=9fa4dfb5e63436016c5a01dbc484485d&oe=5FD18884",
          message: "Bạn nhận được đơn mới từ",
        },
        {
          username: "abc",
          avatar:
            "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.0-1/p160x160/122750096_675938226649137_7036380323165245128_o.jpg?_nc_cat=110&ccb=2&_nc_sid=dbb9e7&_nc_ohc=D0wuk_1Q2UoAX_a_D8-&_nc_ht=scontent.fdad2-1.fna&tp=6&oh=9fa4dfb5e63436016c5a01dbc484485d&oe=5FD18884",
          message: "Bạn nhận được đơn mới từ",
        },
      ],
    };
  },
  created() {
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
  },
  components: {
    NavbarToggleButton,
  },
  props: {
    logo: {
      type: String,
      default:
        "https://res.cloudinary.com/nguy-n-ti-n/image/upload/v1602761547/logo2_a4idbi.png",
      description: "Sidebar app logo",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item",
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  methods: {
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true);
    },
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
  Logout() {
    document.cookie = `user=null; max-age=0`;
    document.cookie = `user_id=null; max-age=0`;
    document.cookie = `shop_id=null; max-age=0`;
    window.location = "/login";
  },
};
</script>
