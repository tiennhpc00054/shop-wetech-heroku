<template>
  <div>
    <div>
      <base-header
        class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style="
          min-height: 100px;
          background-image: url('');
          background-size: cover;
          background-position: center top;
        "
      >
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <div class="container-fluid d-flex align-items-center"></div>
      </base-header>

      <div class="container-fluid mt--7">
        <div class="row">
          <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
            <div class="card card-profile shadow">
              <div class="row justify-content-center">
                <div class="col-lg-3 order-lg-2">
                  <div class="card-profile-image">
                    <a href="#">
                      <img
                        :src="user.avatar"
                        class="rounded-circle image"
                        v-on:click="handleClickInputImg"
                        data-toggle="tooltip" title="Nhấp vào ảnh để đổi ảnh đại diện!"
                        data-placement="bottom"
                      />
                      <div class="overlay">
                        <div class="text">
                          <i class="ni ni-fat-add text-white"></i>
                        </div>
                      </div>
                      <input
                        ref="fileInputImg"
                        type="file"
                        style="display: none"
                        v-on:change="handleFileUpload()"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div
                class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
              ></div>
              <div class="card-body pt-0 pt-md-4">
                <div class="row">
                  <div class="col">
                    <div
                      class="card-profile-stats d-flex justify-content-center mt-md-5"
                    >
                      <div>
                        <span class="heading">13</span>
                        <span class="description">Sản phẩm</span>
                      </div>
                      <div>
                        <span class="heading">13</span>
                        <span class="description">Đã bán</span>
                      </div>
                      <div>
                        <span class="heading">13</span>
                        <span class="description">Doanh thu trong tháng</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <h3>
                    {{ user.name }}
                  </h3>

                  <div class="h5 mt-4">
                    {{ user.address }}
                  </div>
                  <div>
                    {{ user.phone_number }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-8 order-xl-1">
            <card shadow type="secondary">
              <div slot="header" class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Hồ sơ</h3>
                  </div>
                  <div class="col-4 text-right">
                    <a
                      href="javascript:void(0)"
                      class="btn btn-sm btn-primary"
                      @click="updateProfile()"
                      >Lưu hồ sơ</a
                    >
                  </div>
                </div>
              </div>
              <template>
                <form>
                  <h6 class="heading-small text-muted mb-4">
                    Thông tin người dùng
                  </h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label class="form-control-label" for="input-username"
                            >Tên người dùng</label
                          >
                          <input
                            type="text"
                            id="input-username"
                            class="form-control"
                            placeholder="Username"
                            v-bind:value="user.username"
                            readonly
                          />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label class="form-control-label" for="input-email"
                            >Email</label
                          >
                          <input
                            type="email"
                            id="input-email"
                            class="form-control"
                            placeholder="jesse@example.com"
                            v-bind:value="user.email"
                            readonly
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label
                            class="form-control-label"
                            for="input-first-name"
                            >Họ và tên</label
                          >
                          <input
                            type="text"
                            id="input-first-name"
                            class="form-control"
                            placeholder="First name"
                            v-model="user.name"
                            :class="{ 'is-invalid': submitStatus && $v.user.name.$error }"
                          />
                        </div>
                        <div class="text-warning" v-if="submitStatus && !$v.user.name.required">Không bỏ trống trường này!</div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label
                            class="form-control-label"
                            for="input-first-name"
                            >Tên cửa hàng</label
                          >
                          <input
                            type="text"
                            id="input-first-name"
                            class="form-control"
                            placeholder="Tên cửa hàng"
                            v-model="user.shop_name"
                            :class="{ 'is-invalid': submitStatus && $v.user.shop_name.$error }"
                          />
                        </div>
                        <div class="text-warning" v-if="submitStatus && !$v.user.shop_name.required">Không bỏ trống trường này!</div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-group">
                          <label
                            class="form-control-label"
                            for="input-last-name"
                            >Số điện thoại</label
                          >
                          <input
                            type="text"
                            id="input-last-name"
                            class="form-control"
                            placeholder="Last name"
                            v-model="user.phone_number"
                            :class="{ 'is-invalid': submitStatus && $v.user.phone_number.$error }"
                          />
                        </div>
                        <div class="text-warning" v-if="submitStatus && !$v.user.phone_number.required">Không bỏ trống trường này!</div>
                      </div>
                    </div>
                  </div>
                  <hr class="my-4" />
                  <!-- Address -->
                  <h6 class="heading-small text-muted mb-4">
                    Thông tin liên lạc
                  </h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="form-control-label" for="input-address"
                            >Địa chỉ</label
                          >
                          <input
                            id="input-address"
                            class="form-control"
                            placeholder="Home Address"
                            v-model="user.address"
                            type="text"
                            :class="{ 'is-invalid': submitStatus && $v.user.address.$error }"
                          />
                        </div>
                        <div class="text-warning" v-if="submitStatus && !$v.user.phone_nuaddressmber.required">Không bỏ trống trường này!</div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label class="form-control-label" for="input-city"
                            >Số CMND / Thẻ căn cước</label
                          >
                          <input
                            type="number  "
                            id="input-city"
                            class="form-control"
                            placeholder="City"
                            v-model="user.identity_card"
                            :class="{ 'is-invalid': submitStatus && $v.user.identity_card.$error }"
                          />
                        </div>
                        <div class="text-warning" v-if="submitStatus && !$v.user.identity_card.required">Không bỏ trống trường này!</div>
                        <div class="text-warning" v-if="submitStatus && !$v.user.identity_card.minLength">Số CMND / Thẻ căn cước chưa đúng định dạng</div>
                        <div class="text-warning" v-if="submitStatus && !$v.user.identity_card.maxLength">Số CMND / Thẻ căn cước chưa đúng định dạng</div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group">
                          <label class="form-control-label" for="input-country"
                            >Mã số thuế</label
                          >
                          <input
                            type="number"
                            id="input-postal-code"
                            class="form-control"
                            placeholder="Postal code"
                            v-model="user.tax"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="my-4" />
                  <!-- Description -->
                  <h6 class="heading-small text-muted mb-4">Tiểu sử</h6>
                  <div class="pl-lg-4">
                    <div class="form-group">
                      <label class="form-control-label">Tiểu sử của tôi</label>
                      <textarea
                        rows="4"
                        class="form-control"
                        placeholder="A few words about you ..."
                      ></textarea>
                    </div>
                  </div>
                </form>
              </template>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { server, EventBus } from "./../main";
import swal from "sweetalert";
import $ from "jquery"
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  name: "user-profile",
  data() {
    return {
      file: null,
      user: {},
      submitStatus: false,
    };
  },
  methods: {
    handleClickInputImg() {
      this.$refs.fileInputImg.click();
    },
    handleFileUpload() {
      this.file = this.$refs.fileInputImg.files[0];
      let formData = new FormData();
      formData.append("avatar", this.file);
      formData.append("user_id", this.user.user_id);
      axios
        .post(`${server}/upload-avatar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.user.avatar = response.data.avatar;
          document.cookie = `user=${JSON.stringify(this.user)}; max-age=86400`; 
          // EventBus.$emit("change-avatar",response.data)
        });
    },
    updateProfile() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        return false
      }

      axios
        .post(`${server}/update-account`, this.user)
        .then((Response) => {
          console.log(Response.data);
          if (Response.data.success) {
            var user = JSON.stringify(this.user);
            document.cookie = `user=${user}; max-age=86400`;
            setTimeout(function () {
              window.location.reload(1);
            }, 1000);
            swal({
              title: "Thành công!",
              icon: "success",
              buttons: false,
            });
          }
        })
        .catch(() => {
          swal({
            title: "Thất bại!",
            icon: "error",
            button: "Kiểm tra lại",
          });
        });
    },
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

    EventBus.$on("change-avatar", (data) => {
      this.user.avatar.push(data);
    });
  },
  validations: {
    user:{
      name:{
        required
      },
      shop_name:{
        required
      },
      phone_number:{
        required
      },
      address:{
        required
      },
      identity_card:{
        required,
        minLength: minLength(9),
        maxLength: maxLength(12)
      }
    }
  },
};
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});
</script>
<style>
</style>
