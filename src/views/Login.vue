<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                          <div>
                            <img src="https://res.cloudinary.com/nguy-n-ti-n/image/upload/v1602691772/logo_zonvge.png" alt="" width="50px">
                            </div>
                            <small>Đăng nhập lại tài khoản của bạn</small>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Tên đăng nhập"
                                        addon-left-icon="ni ni-single-02"
                                        v-model="user.username" >
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Mật khẩu"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="user.password" @keyup.enter="Login">
                            </base-input>

                            <div class="text-center">
                                <base-button type="primary" class="my-4" @click="Login()">Đăng nhập</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- <div class="row mt-3">
                    <div class="col-6">
                        <a href="#" class="text-light"><small>Quên mật khẩu?</small></a>
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>Tạo một tài khoản khác</small></router-link>
                    </div>
                </div> -->
            </div>
        </div>
</template>
<script>
// import { EventBus } from './../main'
import { server } from './../main'
import axios from 'axios'
import swal from 'sweetalert'
export default {
    data(){
      return{
        user: {
          username: "",
          password: ""
        },

      }
  },
  methods: {
    Login(){
      axios.post(`${server}/login-member`,this.user)
      .then(function (response) {
        if(response.data.error){
          swal({
            text: "Sai tên đăng nhập hoặc mật khẩu!",
            dangerMode: "Nhập lại"
          });
          return false
        }
          response.data.forEach(abc => {

            var user = JSON.stringify(abc) 
            document.cookie = `user=${user}; max-age=86400`
            document.cookie = `user_id=${abc.user_id}; max-age=86400`
            document.cookie = `shop_id=${abc.shop_id}; max-age=86400`
            window.location.href = "/"
            // console.log(abc)
          });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    },
  },
  created(){
    document.title = "Login"
  }
};
</script>
<style>
</style>
