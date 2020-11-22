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
            v-model="search"
            @keyup="searchProduct(shop_id)"
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

              <div class="row">
                <div class="col-lg">
                  <h4 class="text-success">DANH SÁCH SẢN PHẨM</h4>
                </div>
              </div>
              <br />
              Có <span class="text-success">{{ length }}</span> sản phẩm
              <div class="table-responsive">
                <table class="table align-items-center table-hover">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">Thao tác</th>
                      <th scope="col" class="sort" data-sort="product_id">
                        Mã SP
                      </th>
                      <th scope="col" class="sort" data-sort="product_name">
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
                    v-for="(product, index) in products"
                    v-bind:key="index"
                  >
                    <tr>
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
                      <td class="nameShop">{{ product.product_id }}</td>
                      <th scope="row">
                        <div class="media align-items-center">
                          <!-- hình ảnh sản phẩm -->
                          <a href="#" class="avatar rounded-circle mr-3">
                            <img
                              alt="Image placeholder"
                              v-bind:src="product.image"
                            />
                          </a>
                          <!-- tên sản phẩm -->
                          <div class="media-body">
                            <span class="name mb-0 text-sm">{{
                              product.product_name
                            }}</span>
                          </div>
                        </div>
                      </th>
                      <td class="nameShop">{{ product.cate_name }}</td>
                      <td class="nameShop">{{ product.brand }}</td>
                      <td class="nameShop">{{ product.origin }}</td>
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
                            <table class="table align-items-center table-flush">
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
                                    <div v-if="modalDetail.status_discount==1">
                                      <del>{{ modalDetail.price.format(0, 3, ".") }} &#8363;</del>
                                      {{ modalDetail.discount_price.format(0, 3, ".") }} &#8363;
                                    </div>
                                    <div v-if="modalDetail.status_discount==0">
                                      {{ modalDetail.price.format(0, 3, ".") }} &#8363;
                                    </div>
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
                                          @click="
                                            ViewProductDetail(
                                              modalDetail.prodetail_id
                                            )
                                          "
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
            </div>
            <div class="card-footer py-4">
              <v-pagination
                v-model="current_page"
                :page-count="last_page"
                :classes="bootstrapPaginationClasses"
                :labels="paginationAnchorTexts"
              >
              </v-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { server, store } from "../main";
import $ from "jquery";
import axios from "axios";
import vPagination from "vue-plain-pagination";
import swal from "sweetalert";

export default {
  data() {
    return {
      products: [],
      showProductDetail: [],
      t: null,
      category: null,
      current_page: "",
      last_page: "",
      next_page: "",
      previous_page: "",
      search: null,
      length: null,
      imageData: [],

      bootstrapPaginationClasses: {
        ul: "pagination",
        li: "page-item",
        liActive: "active",
        liDisable: "disabled",
        button: "page-link",
      },
      paginationAnchorTexts: {
        first: "First",
        prev: '<i class="fas fa-angle-left"></i>',
        next: '<i class="fas fa-angle-right"></i>',
        last: "Last",
      },
    };
  },
  components: {
    vPagination,
  },
  methods: {
    getListProductDetail(product) {
      this.t = product.product_id;
      this.category = product.category;
      axios
        .post(`${server}/detail-info`, { id: product.product_id })
        .then((response) => {
          this.showProductDetail = response.data;
        });

      store.state.productDetail = product;
      store.state.category_id = this.t;
    },
    //delete sản phẩm
    deleteProducts(id) {
      swal("Bạn có chắc muốn xóa sản phẩm?", {
        buttons: {
          cancel: "Hủy",
          catch: {
            text: "Xóa",
            value: "catch",
          },
        },
      }).then((value) => {
        switch (value) {
          case "catch":
            axios
              .post(`${server}/delete-product`, { prodetail_id: id })
              .then((response) => {
                if (response.data.success) {
                  setTimeout(function () {
                    window.location.reload(1);
                  }, 1000);
                  swal("Thành công!", "Đã xóa sản phẩm!", "success");
                  this.getListProductDetail(this.t);
                }
              });
            break;
          default:
            swal("Không xóa sản phẩm!");
        }
      });
    },
    // thêm biến thể
    addDetailProduct() {
      $("#detailProduct").hide();
      $("body").removeClass("modal-open");
      switch (this.category) {
        case "Sách":
          this.$router.push({ path: "/detail-add-book" });
          break;
        case "Đồ chơi - Mẹ và bé":
          this.$router.push({ path: "/detail-add-toy" });
          break;
        case "Thời trang - phụ kiện":
          this.$router.push({ path: "/detail-add-fashion" });
          break;
        case "Làm đẹp - sức khỏe":
          this.$router.push({ path: "/detail-add-fashion" });
          break;
        case "Hàng tiêu dùng - thực phẩm":
          this.$router.push({ path: "/detail-add-house-hold-goods" });
          break;
        case "Điện thoại - Máy tính bảng":
          this.$router.push({ path: "/detail-add-information-technology" });
          break;
        case "Laptop - IT":
          this.$router.push({ path: "/detail-add-information-technology" });
          break;
        case "Phụ kiện - Thiết bị số":
          this.$router.push({ path: "/detail-add-information-technology" });
          break;
        case "Điện gia dụng":
          this.$router.push({ path: "/detail-add-electronic" });
          break;
        case "Điện tử - Điện lạnh":
          this.$router.push({ path: "/detail-add-electronic" });
          break;

        default:
          break;
      }
    },
    //xem chi tiết sản phẩm
    ViewProductDetail(id) {
      axios
        .post(`${server}/image-detail-shop`, {
          prodetail_id: id,
        })
        .then((re) => {
          var imagesData = re.data;
          for (var item in imagesData) {
            this.imageData.push(imagesData[item]);
          }
          store.state.imageData = this.imageData;
        });
      axios
        .post(`${server}/prodetail-shop`, { prodetail_id: id })
        .then((response) => {
          var ViewProductDetails = response.data;
          // console.log(ViewProductDetails[0]);
          store.state.ViewProductDetail = ViewProductDetails[0];
          $("#detailProduct").hide();
          $("body").removeClass("modal-open");
          switch (this.category) {
            case "Sách":
              this.$router.push({ path: "/view-product-detail-book" });
              break;
            case "Đồ chơi - Mẹ và bé":
              this.$router.push({ path: "/view-product-detail-toy" });
              break;
            case "Thời trang - phụ kiện":
              this.$router.push({ path: "/view-product-detail-fashion" });
              break;
            case "Làm đẹp - sức khỏe":
              this.$router.push({ path: "/view-product-detail-fashion" });
              break;
            case "Hàng tiêu dùng - thực phẩm":
              this.$router.push({
                path: "/view-product-detail-house-hold-goods",
              });
              break;
            case "Điện thoại - Máy tính bảng":
              this.$router.push({
                path: "/view-product-detail-information-technology",
              });
              break;
            case "Laptop - IT":
              this.$router.push({
                path: "/view-product-detail-information-technology",
              });
              break;
            case "Phụ kiện - Thiết bị số":
              this.$router.push({
                path: "/view-product-detail-information-technology",
              });
              break;
            case "Điện gia dụng":
              this.$router.push({ path: "/view-product-detail-electronic" });
              break;
            case "Điện tử - Điện lạnh":
              this.$router.push({ path: "/view-product-detail-electronic" });
              break;

            default:
              break;
          }
        });
    },
    searchProduct() {
      axios
        .post(`${server}/search-shop`, {
          shop_id: this.shop_id,
          keywords: this.search,
        })
        .then((response) => {
          var listSearched = response.data.data;
          this.current_page = response.data.current_page;
          this.next_page = response.data.next_page_url;
          this.previous_page = response.data.prev_page_url;
          this.products = listSearched;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    PageAct() {
      let this2 = this;
      axios
        .post(`${server}` + "/show-product-shop?page=" + this2.current_page, {
          shop_id: this.shop_id,
        })
        .then(function (response) {
          this2.products = response.data.data;
          this2.current_page = response.data.current_page;
          this2.last_page = response.data.last_page;
          console.log(this2.current_page);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
  },
  mounted() {
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
      .post(`${server}/show-product-shop`, { shop_id: this.shop_id })
      .then((response) => {
        var length = response.data.total;
        this.length = length;
        var productsNew = response.data.data;
        this.current_page = response.data.current_page;
        this.next_page = response.data.next_page_url;
        this.last_page = response.data.last_page;
        this.previous_page = response.data.prev_page_url;
        for (var item in productsNew) {
          this.products.push(productsNew[item]);
        }
        // console.log(response.data);
      });
    Number.prototype.format = function (n, x, s, c) {
      var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
        num = this.toFixed(Math.max(0, ~~n));

      return (c ? num.replace(".", c) : num).replace(
        new RegExp(re, "g"),
        "$&" + (s || ",")
      );
    };
  },
  watch: {
    current_page(value) {
      console.log(value);
      this.PageAct();
    },
  },
};
</script>

<style lang="scss">
</style>
