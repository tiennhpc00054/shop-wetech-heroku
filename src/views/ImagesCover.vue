<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="
        min-height: 100px;
        background-image: url(img/theme/profile-cover.jpg);
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
        <div class="col-12">
          <card class="card" title="Thay đổi ảnh bìa">
            <div>
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="customFile"
                      />
                      <label class="custom-file-label" for="customFile"
                        >Chọn hình ảnh mới</label
                      >
                    </div>
                    <hr />
                    <button class="btn btn-outline-success">Thay đổi</button>
                  </div>
                  <div class="col-md-6">
                    <div
                      class="d-flex justify-content-center flex-wrap align-content-center"
                    >
                      <img
                        src="https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.0-9/s960x960/52507980_248387546070876_6368011970985066496_o.jpg?_nc_cat=103&_nc_sid=13bebb&_nc_ohc=QoVjFEJb6RYAX-Mt-Hl&_nc_ht=scontent.fsgn5-7.fna&tp=7&oh=f3f9798247a6476b0524953d8534b62c&oe=5F9B635A"
                        class="img-thumbnail"
                        alt=""
                        width="70%"
                      />
                    </div>
                  </div>
                </div>
                <div class="clearfix"></div>
              </form>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {server} from './../main'
export default {
  name: "user-profile",
  data() {
    return {
      user: {},
    };
  },
  methods:{
    updateProfile(){
      axios.post(`${server}/update-account`,this.user)
      .then(Response =>{
        console.log(Response.data)
      })
    }
  },
  created(){
    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    } 

    this.user = JSON.parse(getCookie("user"))
  }
};
</script>

<style>
</style>
