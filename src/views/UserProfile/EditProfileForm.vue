<template>
  <card class="card" title="Sửa hồ sơ">
    <div>
      <form>
        <div class="row">
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Username"
              :disabled="true"
              placeholder="Username"
              v-model="user.username"
            >
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              type="email"
              label="Email"
              :disabled="true"
              placeholder="Email"
              v-model="user.email"
            >
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Tên công ty"
              placeholder="Tên công ty, doanh nghiệp"
              v-model="user.shop_name"
            >
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Họ và tên"
              placeholder="Họ và tên"
              v-model="user.name"
            >
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <fg-input
              type="text"
              label="Địa chỉ"
              placeholder="Địa chỉ công ty, doanh nghiệp"
              v-model="user.address"
            >
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <fg-input
              type="text"
              label="Số điện thoại"
              placeholder="Số điện thoại"
              v-model="user.phone_number"
            >
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              type="text"
              label="Số CMND / Thẻ căn cước"
              placeholder="Số CMND / Thẻ căn cước"
              v-model="user.identity_card"
            >
            </fg-input>
          </div>
          <div class="col-md-4">
            <fg-input
              type="number"
              label="Postal Code"
              placeholder="ZIP Code"
              v-model="user.postalCode"
            >
            </fg-input>
          </div>
        </div>
        <div class="text-center">
          <p-button type="info" round @click.native.prevent="updateProfile">
            Update Profile
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
import axios from "./../../../node_modules/axios";
export default {
  data() {
    return {
      shopsInfo: [],
      user: {
        //xuất
        //nhập
        username: "",
        email: "",
        shop_name: "",
        name: "",
        address: "",
        phone_number: "",
        identity_card: "",
        postalCode: "",
      },
    };
  },
  // methods: {
  //   updateProfile() {
  //     alert("Your data: " + JSON.stringify(this.user));
  //   },
  // },
  mounted() {
    axios.get(`${server}/login-member`).then((response) => {
      console.log(response.data);
      var shop = response.data;
      for (var item in shop) {
        this.shopInfo.push(shop[item]);
      }
    });
  },
};
</script>

<style>
</style>
