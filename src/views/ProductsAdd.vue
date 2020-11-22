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
      <div class="container-fluid d-flex align-items-center">
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row justify-content-center">
        <div class="col">
          <div class="card">
            <div class="container">
              <br />
              <div class="border-0">
                <h3 class="mb-0">Chọn danh mục cho sản phẩm mới</h3>
                <div class="alert alert-danger alert-dismissible">
                  <button type="button" class="close" data-dismiss="alert">&times;</button>
                  Vui lòng
                  <strong>chọn danh mục chính sau đó chọn danh mục con</strong> trước khi điền thông tin cho sản phẩm.
                </div>
              </div>
              <hr />
              <div class="container">
                <div class="row">
                  <div class="col-7">
                    <label class="form-control-label" for>Danh mục chính</label>
                  </div>
                  <div class="col-5">
                    <label class="form-control-label" for>Danh mục con</label>
                  </div>
                </div>
                <div class="row">
                  <div class="col-7">
                    <select v-model="catename" class="form-control" required>
                      <option
                        v-for="(categorie, index) in categoryForNewProduct"
                      :key="index">{{categorie.category}}</option>
                    </select>
                  </div>
                  <div class="col-5">
                    <select v-model="danhMucCon" class="form-control" required>
                      <option v-for="(categorie, index) in cateCon" :key="index+454">{{categorie.cate_id}} - {{categorie.cate_name}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class="container">
              <!-- form Điện tử -->
              <div v-if="catename=='Điện gia dụng'||catename=='Điện tử - Điện lạnh'">
                <div id="ProductAddElectronic">
                  <br>
                  <br>
                  <br>
                  <ProductAddElectronic></ProductAddElectronic>
                </div>
              </div>
              <!-- form Công nghệ -->
              <div
                v-if="catename=='Điện thoại - Máy tính bảng'||catename=='Laptop - IT'||catename=='Phụ kiện - Thiết bị số'"
              >
                <div id="ProductAddIT">
                  <br>
                  <br>
                  <br>
                  <ProductAddIT></ProductAddIT>
                </div>
              </div>
              <!-- form Hàng tiêu dùng -->
              <div v-if="catename=='Hàng tiêu dùng - thực phẩm'">
                <div id="ProductAddHouseholdGoods">
                  <br>
                  <br>
                  <br>
                  <ProductAddHouseholdGoods></ProductAddHouseholdGoods>
                </div>
              </div>
              <!-- form Đồ chơi & mẹ và bé -->
              <div v-if="catename=='Đồ chơi - Mẹ và bé'">
                <div id="ProductAddToy">
                  <br>
                  <br>
                  <br>
                  <ProductAddToy></ProductAddToy>
                </div>
              </div>
              <!-- form Sách -->
              <div v-if="catename=='Sách'">
                <div id="ProductAddBook">
                  <br>
                  <br>
                  <br>
                  <ProductAddBook></ProductAddBook>
                </div>
              </div>
              <!-- form Thời trang -->
              <div v-if="catename=='Thời trang - phụ kiện'||catename=='Làm đẹp - sức khỏe'">
                <div id="ProductAddFashion">
                  <br>
                  <br>
                  <br>
                  <ProductAddFashion></ProductAddFashion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {server,store, EventBus} from './../main'
import axios from "./../../node_modules/axios";
export default {
  data() {
    return {
      categoryForNewProduct: [],
      catename: "",
      danhMucCon: "",
      cateCon: [],
    };
  },
  mounted() {
    axios.post(`${server}/category`).then((response) => {
      var categoriesNew = response.data;
      for (var item in categoriesNew) {
        // console.log(categoriesNew[item])
        this.categoryForNewProduct.push(categoriesNew[item]);
      }
    });
  },
  methods: {},
  watch: {
    catename(value) {
      axios
        .post(`${server}/cate-product`, { category: value })
        .then((response) => {
          var categoriesNew = response.data;
          this.cateCon = categoriesNew;
        });
        store.state.danhMucChinh =  value
    },
    danhMucCon(value){
        store.state.danhMucCon =  value
        EventBus.$emit('catecon',{
          cate_id:value.slice(0,value.indexOf("-")-1),
          cate_name:value.slice(value.indexOf("-")+2)
        })
        
    },
  },

    
};
</script>

<style>
</style>