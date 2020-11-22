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
      <form
        class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
      >
        <div class="form-group mb-0">
          <base-input
            placeholder="Search"
            class="input-group-alternative"
            alternative=""
            addon-right-icon="fas fa-search"
          >
          </base-input>
        </div>
      </form>
      <br />
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="container">
              <br />
              <!-- Nav tabs -->
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    data-toggle="tab"
                    href="#creatSaleOff"
                    >Tạo khuyến mãi</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#listSaleOff"
                    >Danh sách khuyến mãi</a
                  >
                </li>
              </ul>

              <!-- Tạo khuyến mãi -->
              <div class="tab-content">
                <div id="creatSaleOff" class="container tab-pane active">
                  <form>
                    <br />
                    <div class="pl-lg-4">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="form-group">
                            <label class="form-control-label">
                              Tên sản phẩm
                            </label>
                            <v-select
                              :options="unSaleOffoptions"
                              label="product_name"
                              v-model="product"
                            >
                              <template slot="option" slot-scope="option">
                                <img
                                  :src="option.image"
                                  width="40"
                                  height="40"
                                />
                                {{ option.product_name }}
                              </template>
                            </v-select>
                            <div class="text-warning" v-if="submitStatus && !$v.product.required">Vui lòng chọn sản phẩm!</div>
                          </div>
                          <div class="form-group">
                            <label class="form-control-label"
                              >Giảm giá (%)</label
                            >
                            <div class="input-group mb-3">
                              <input
                                type="number"
                                class="form-control"
                                placeholder="VD: 55; 45..."
                                min="0"
                                max="100"
                                v-model="percent"
                                :class="{ 'is-invalid': submitStatus && $v.percent.$error }"
                              />
                              <div class="input-group-append">
                                <span class="input-group-text">%</span>
                              </div>
                            </div>
                            <div class="text-warning" v-if="submitStatus && !$v.percent.required">Vui lòng nhập phần trăm khuyến mãi!</div>
                            <div class="text-warning" v-if="submitStatus && !$v.percent.minValue">Giá trị phần trăm nhỏ nhất là 0!</div>
                            <div class="text-warning" v-if="submitStatus && !$v.percent.maxValue">Giá trị phần trăm nhỏ nhất là 100!</div>
                          </div>
                          <div class="row">
                            <!-- Từ ngày -->
                            <div class="col-lg-6">
                              <div class="form-group">
                                <label class="form-control-label"
                                  >Từ ngày</label
                                >
                                <input
                                  type="datetime-local"
                                  class="form-control"
                                  v-model="created_at"
                                  :class="{ 'is-invalid': submitStatus && $v.created_at.$error }"
                                />
                              </div>
                              <div class="text-warning" v-if="submitStatus && !$v.created_at.required">Vui lòng chọn ngày bắt đầu!</div>
                            </div>
                            <!-- Từ ngày -->
                            <div class="col-lg-6">
                              <div class="form-group">
                                <label class="form-control-label"
                                  >Đến ngày</label
                                >
                                <input
                                  type="datetime-local"
                                  class="form-control"
                                  v-model="updated_at"
                                  :class="{ 'is-invalid': submitStatus && $v.updated_at.$error }"
                                />
                              </div>
                              <div class="text-warning" v-if="submitStatus && !$v.updated_at.required">Vui lòng chọn ngày kết thúc!</div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="table-responsive">
                            <table class="table align-items-center table-hover">
                              <thead class="thead-light">
                                <tr>
                                  <th scope="col"></th>
                                  <th
                                    scope="col"
                                    class="sort"
                                    data-sort="prodetail_id"
                                  >
                                    Mã biến thể
                                  </th>
                                  <th
                                    scope="col"
                                    class="sort"
                                    data-sort="price"
                                  >
                                    Giá
                                  </th>
                                  <th
                                    scope="col"
                                    class="sort"
                                    data-sort="color"
                                  >
                                    Màu
                                  </th>
                                  <th scope="col" class="sort" data-sort="size">
                                    Kích thước
                                  </th>
                                  <th
                                    scope="col"
                                    class="sort"
                                    data-sort="weight"
                                  >
                                    Khối lượng
                                  </th>
                                </tr>
                              </thead>
                              <tbody class="list">
                                <tr
                                  v-for="(modalDetail,
                                  index) in showProductDetail"
                                  :key="index + 99"
                                >
                                  <td class="text-center">
                                    <input
                                      type="checkbox"
                                      :value="modalDetail"
                                      v-model="detail"
                                    />
                                  </td>
                                  <!-- mã sản phẩm -->
                                  <th scope="row">
                                    <div class="media align-items-center">
                                      <!-- hình ảnh sản phẩm -->
                                      <a
                                        href="javascript:void(0)"
                                        class="avatar rounded-circle mr-3"
                                      >
                                        <img
                                          alt=""
                                          v-bind:src="modalDetail.image"
                                        />
                                      </a>
                                      <!-- tên sản phẩm -->
                                      <div class="media-body">
                                        <span class="name mb-0 text-sm">{{
                                          modalDetail.prodetail_id
                                        }}</span>
                                      </div>
                                    </div>
                                  </th>
                                  <td class="">
                                    {{ modalDetail.price.format(0, 3, ".") }}
                                    &#8363;
                                  </td>
                                  <td class="">{{ modalDetail.color }}</td>
                                  <td class="">{{ modalDetail.size }}</td>
                                  <td class="">{{ modalDetail.weight }}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="pl-lg-4">
                      <div class="form-group">
                        <input
                          type="button"
                          class="btn btn-primary"
                          value="Tạo khuyến mãi"
                          :disabled="submitStatus === 'PENDING'"
                          @click="creatSaleOff"
                        />
                        <input
                          type="button"
                          class="btn btn-danger"
                          value="Hủy"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <!-- Danh sách khuyến mãi -->
                <div id="listSaleOff" class="container tab-pane fade">
                  <br />
                  <div class="card">
                    <div class="table-responsive">
                      <table class="table align-items-center table-hover">
                        <thead class="thead-light">
                          <tr>
                            <th scope="col">Thao tác</th>
                            <th scope="col" class="sort" data-sort="product_id">
                              Mã SP
                            </th>
                            <th
                              scope="col"
                              class="sort"
                              data-sort="product_name"
                            >
                              Sản phẩm
                            </th>
                            <th scope="col" class="sort" data-sort="cate_name">
                              Danh mục con
                            </th>
                            <th scope="col" class="sort" data-sort="brand">
                              Thương hiệu
                            </th>
                            <th scope="col" class="sort" data-sort="origin">
                              Nhà cung cấp
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          class="list"
                          
                        >
                        <tr v-if="SaledOff.length==0">Không có dữ liệu</tr>
                          <tr v-for="(SaledOff, index) in SaledOff"
                          v-bind:key="index + 2324">
                            <td class="text-center">
                              <div class="dropdown">
                                <a
                                  class="btn btn-sm btn-icon-only text-light"
                                  href="#"
                                  role="button"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i class="fas fa-ellipsis-v"></i>
                                </a>
                                <div
                                  class="dropdown-menu dropdown-menu-right dropdown-menu-arrow"
                                >
                                  <a
                                    class="dropdown-item"
                                    href="javascript:void(0)"
                                    data-toggle="modal"
                                    data-target="#detailProduct"
                                    @click="getListProductDetail(product)"
                                    >Xem chi tiết</a
                                  >
                                </div>
                              </div>
                            </td>
                            <!-- mã sản phẩm -->
                            <td class="nameShop">{{ SaledOff.product_id }}</td>
                            <th scope="row">
                              <div class="media align-items-center">
                                <!-- hình ảnh sản phẩm -->
                                <a href="#" class="avatar rounded-circle mr-3">
                                  <img
                                    alt="Image placeholder"
                                    v-bind:src="SaledOff.image"
                                  />
                                </a>
                                <!-- tên sản phẩm -->
                                <div class="media-body">
                                  <span class="name mb-0 text-sm">{{
                                    SaledOff.product_name
                                  }}</span>
                                </div>
                              </div>
                            </th>
                            <td class="nameShop">{{ SaledOff.cate_name }}</td>
                            <td class="nameShop">{{ SaledOff.brand }}</td>
                            <td class="nameShop">{{ SaledOff.origin }}</td>
                          </tr>
                        </tbody>
                        <!-- The Modal -->
                        <div class="modal fade" id="detailProduct">
                          <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                              <!-- Modal Header -->
                              <div class="modal-header">
                                <h4 class="modal-title">Chi tiết sản phẩm</h4>
                                <button
                                  type="button"
                                  class="close"
                                  data-dismiss="modal"
                                >
                                  &times;
                                </button>
                              </div>

                              <!-- Modal body -->
                              <div class="modal-body">
                                <div class="table-responsive">
                                  <button
                                    class="btn btn-primary btn-sm"
                                    @click="addDetailProduct()"
                                  >
                                    NHẬP KHO
                                  </button>
                                  <br />
                                  <br />
                                  <table
                                    class="table align-items-center table-flush"
                                  >
                                    <thead class="thead-light">
                                      <tr>
                                        <th scope="col" class="sort" data-sort>
                                          Hình ảnh
                                        </th>
                                        <th
                                          scope="col"
                                          class="sort"
                                          data-sort="detail_id"
                                        >
                                          Mã sản phẩm
                                        </th>
                                        <th
                                          scope="col"
                                          class="sort"
                                          data-sort="price"
                                        >
                                          Giá
                                        </th>
                                        <th
                                          scope="col"
                                          class="sort"
                                          data-sort="quantity"
                                        >
                                          SLượng kho
                                        </th>
                                        <th
                                          scope="col"
                                          class="sort"
                                          data-sort="color"
                                        >
                                          Màu
                                        </th>
                                        <th scope="col">Thao tác</th>
                                      </tr>
                                    </thead>
                                    <tbody class="list">
                                      <tr
                                        v-for="(modalDetail,
                                        index) in showProductDetail"
                                        :key="index + 99"
                                      >
                                        <!-- mã sản phẩm -->
                                        <td>
                                          <a
                                            href="#"
                                            class="avatar rounded-circle mr-3"
                                          >
                                            <img
                                              alt="Image placeholder"
                                              v-bind:src="modalDetail.image"
                                            />
                                          </a>
                                        </td>
                                        <td class="nameShop">
                                          {{ modalDetail.prodetail_id }}
                                        </td>
                                        <td class="nameShop">
                                          {{
                                            modalDetail.price.format(0, 3, ".")
                                          }}
                                          &#8363;
                                        </td>
                                        <td class="nameShop">
                                          {{ modalDetail.quantity }}
                                        </td>
                                        <td class="nameShop">
                                          {{ modalDetail.color }}
                                        </td>
                                        <td class="text-right">
                                          <div class="dropdown">
                                            <a
                                              class="btn btn-sm btn-icon-only text-light"
                                              href="#"
                                              role="button"
                                              data-toggle="dropdown"
                                              aria-haspopup="true"
                                              aria-expanded="false"
                                            >
                                              <i class="fas fa-ellipsis-v"></i>
                                            </a>
                                            <div
                                              class="dropdown-menu dropdown-menu-right dropdown-menu-arrow"
                                            >
                                              <a
                                                class="dropdown-item"
                                                href="javascript:void(0)"
                                                >Xem chi tiết</a
                                              >
                                              <a
                                                class="dropdown-item"
                                                href="javascript:void(0)"
                                                @click="
                                                  deleteProducts(
                                                    modalDetail.prodetail_id
                                                  )
                                                "
                                                >Xóa</a
                                              >
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <!-- Modal footer -->
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </table>
                    </div>
                    <div class="card-footer py-4">
                      <nav aria-label="...">
                        <ul class="pagination justify-content-end mb-0">
                          <li class="page-item">
                            <a class="page-link" @click="previous()">
                              <i class="fas fa-angle-left"></i>
                              <span class="sr-only">Previous</span>
                            </a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" @click="next()">
                              <i class="fas fa-angle-right"></i>
                              <span class="sr-only">Next</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <br />
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
import axios from "axios";
import { server } from "../main";
import swal from "sweetalert";
import { required, minValue, maxValue } from "vuelidate/lib/validators";

// import Notiflix from "notiflix";

export default {
  data() {
    return {
      product: {},
      percent: null,
      created_at: null,
      updated_at: null,
      batDau:null,
      ketThuc:null,

      unSaleOffoptions: [],
      SaledOff: [],

      detail: [],
      product_id: null,
      showProductDetail: [],


      submitStatus: false,
    };
  },
  methods: {
    creatSaleOff() {
      let batDau = new Date(this.created_at);
      let ketThuc = new Date(this.updated_at);
      this.batDau = batDau.getTime();
      this.ketThuc = ketThuc.getTime();
      

      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        return false
      }
      let details = [];
      this.detail.forEach((element) => {
        let el = `"${element.prodetail_id}"`;
        details.push(el);
      });
      let convertArrProdetail = `[${details.toString()}]`;
      if(this.ketThuc-this.batDau<0){
        swal({
            title: "Thất bại!",
            text:"Ngày kết thúc phải bằng hoặc sau ngày bắt đầu khuyến mãi!",
            icon: "error",
            button: "Kiểm tra lại",
          });
        return false;
      }
      axios
        .post(`${server}/discount`, {
          prodetail_id: convertArrProdetail,
          percent: parseInt(this.percent),
          from_day: this.created_at,
          to_day: this.updated_at,
        })
        .then((response) => {
          if (response.data.success) {
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
    getListProductDetail(product) {
      this.product_id = product.product_id;
      axios
        .post(`${server}/detail-info`, { id: product.product_id })
        .then((response) => {
          this.showProductDetail = response.data;
        });
    },
  },
  mounted() {
    Number.prototype.format = function (n, x, s, c) {
      var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
        num = this.toFixed(Math.max(0, ~~n));

      return (c ? num.replace(".", c) : num).replace(
        new RegExp(re, "g"),
        "$&" + (s || ",")
      );
    };
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
    this.shop_id = JSON.parse(getCookie("shop_id"));
    axios
      .post(`${server}/unactive-discount`, { shop_id: this.shop_id })
      .then((response) => {
        var unSaleOff = response.data;
        for (var item in unSaleOff) {
          this.unSaleOffoptions.push(unSaleOff[item]);
        }
        // console.log(response.data);
      });
    axios
      .post(`${server}/active-discount`, { shop_id: this.shop_id })
      .then((response) => {
        var SaledOff = response.data.data;
        this.current_page = response.data.current_page;
        this.next_page = response.data.next_page_url;
        this.previous_page = response.data.prev_page_url;
        for (var item in SaledOff) {
          this.SaledOff.push(SaledOff[item]);
        }
      });
  },
  watch: {
    product() {
      axios
        .post(`${server}/detail-info`, { id: this.product.product_id })
        .then((response) => {
          this.showProductDetail = response.data;
        });
    },
  },
  validations: {
    //sản phẩm
    product: {
      required,
    },
    //phần trăm khuyến mãi
    percent: {
      required,
      minValue: minValue(0),
      maxValue: maxValue(100)
    },
    //ngày bắt đầu
    created_at: {
      required,
    },
    //ngày kết thúc
    updated_at: {
      required,
    },
  },
};
</script>
<style>
</style>
