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
              <div class="row">
                <div class="col-lg">
                  <h4 class="text-success">ĐƠN MỚI - ĐƠN CHỜ DUYỆT</h4>
                </div>
              </div>
              <br />
              <div class="table-responsive">
                <div></div>
                <table class="table align-items-center table-flush">
                  <thead class="thead-light">
                    <tr>
                      <th scope="col">Thao tác</th>
                      <th scope="col" class="sort" data-sort="idBill">
                        Mã đơn hàng
                      </th>
                      <th scope="col" class="sort" data-sort="nameUser">
                        Tên khách hàng
                      </th>
                      <th scope="col" class="sort" data-sort="status">
                        Địa chỉ
                      </th>
                      <th scope="col" class="sort" data-sort="created_at">
                        Thời gian đặt
                      </th>
                    </tr>
                  </thead>
                  <tbody class="list">
                    <tr v-if="unactive.length == 0">
                      <td>Không có dữ liệu</td>
                    </tr>
                    <tr
                      v-for="(unactive, index) in unactive"
                      v-bind:key="index + 1"
                    >
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
                              data-target="#detailBill"
                              @click="getOrderDetail(unactive)"
                              >Chi tiết đơn hàng</a
                            >
                            <a
                              class="dropdown-item"
                              href="javascript:void(0)"
                              @click="checkOrder(unactive.id)"
                              >Duyệt đơn hàng
                            </a>
                          </div>
                        </div>
                      </td>
                      <td>
                        <strong>{{ unactive.id }}</strong>
                      </td>
                      <td>{{ unactive.name }}</td>
                      <td>
                        {{ unactive.order_address }}
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <span class="completion mr-2">{{
                            unactive.created_at
                          }}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <!-- The Modal -->
                  <div class="modal fade" id="detailBill">
                    <div class="modal-dialog modal-xl">
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
                          <div class="container">
                            <div class="row">
                              <div class="col">
                                <div class="card">
                                  <!-- Card header -->
                                  <div class="card-header border-0">
                                    <div class="media align-items-center">
                                      <!-- avatar người dùng -->
                                      <a
                                        href="javascript:void(0)"
                                        class="avatar rounded-circle mr-3"
                                      >
                                        <img
                                          alt="Avatar"
                                          :src="infomation.avatar"
                                        />
                                      </a>
                                      <div class="media-body">
                                        <span class="name mb-0 text-sm">
                                          <strong>{{ infomation.name }}</strong>
                                        </span>
                                        -
                                        <img
                                          src="https://i.pinimg.com/originals/a0/c7/d2/a0c7d21bb6e784b884560d83215aca16.png"
                                          alt=""
                                          width="15"
                                        />
                                        {{ infomation.phone_number }}
                                      </div>
                                      <!-- địa chỉ người dùng -->
                                      <div class="float-right">
                                        <i class="ni ni-delivery-fast"></i>
                                        <span class="name mb-0 text-sm">
                                          <a
                                            :href="
                                              googlemap +
                                              infomation.order_address
                                            "
                                            target="_blank"
                                          >
                                            {{ infomation.order_address }}</a
                                          >
                                        </span>
                                        &emsp; | &emsp;
                                        <span
                                          class="badge badge-pill badge-primary"
                                          style="font-family: Times New Roman"
                                          ><strong>{{
                                            infomation.status
                                          }}</strong></span
                                        >
                                      </div>
                                    </div>
                                  </div>
                                  <!-- table -->
                                  <div class="table-responsive">
                                    <table
                                      class="table align-items-center table-flush"
                                    >
                                      <tr>
                                        <th
                                          scope="col"
                                          class="sort"
                                          data-sort="code"
                                        >
                                          Sản phẩm
                                        </th>
                                        <th
                                          scope="col"
                                          class="sort"
                                          data-sort="name"
                                        >
                                          Đơn giá
                                        </th>
                                        <th
                                          scope="col"
                                          class="sort"
                                          data-sort="status"
                                        >
                                          Số lượng
                                        </th>
                                        <th
                                          scope="col"
                                          class="sort"
                                          data-sort="completion"
                                        >
                                          Màu sắc
                                        </th>
                                        <th
                                          scope="col"
                                          class="sort"
                                          data-sort="completion"
                                        >
                                          Kích cở
                                        </th>
                                        <th
                                          scope="col"
                                          class="sort"
                                          data-sort="completion"
                                        >
                                          Thành tiền
                                        </th>
                                      </tr>
                                      <tbody class="list">
                                        <tr
                                          v-for="(modalOrderDetail,
                                          index) in modalOrderDetail"
                                          :key="index + 99"
                                        >
                                          <th scope="row">
                                            <div
                                              class="media align-items-center"
                                            >
                                              <!-- hình ảnh sản phẩm -->
                                              <a
                                                href="#"
                                                class="avatar rounded-circle mr-3"
                                              >
                                                <img
                                                  alt="Image placeholder"
                                                  :src="modalOrderDetail.image"
                                                />
                                              </a>
                                              <!-- tên sản phẩm -->
                                              <div class="media-body">
                                                <span
                                                  class="name mb-0 text-sm"
                                                  >{{
                                                    modalOrderDetail.product_name
                                                  }}</span
                                                >
                                              </div>
                                            </div>
                                          </th>
                                          <!-- giá sản phẩm -->
                                          <td>
                                            {{
                                              modalOrderDetail.price.format(
                                                0,
                                                3,
                                                "."
                                              )
                                            }}
                                            &#8363;
                                          </td>
                                          <td>
                                            {{ modalOrderDetail.cart_quantity }}
                                          </td>
                                          <td>{{ modalOrderDetail.color }}</td>
                                          <td>{{ modalOrderDetail.size }}</td>
                                          <td>
                                            {{
                                              (
                                                modalOrderDetail.price *
                                                modalOrderDetail.cart_quantity
                                              ).format(0, 3, ".")
                                            }}
                                            &#8363;
                                          </td>
                                        </tr>
                                      </tbody>
                                      <tfoot>
                                        <tr>
                                          <th
                                            scope="col"
                                            class="sort"
                                            data-sort=""
                                          ></th>
                                          <th
                                            scope="col"
                                            class="sort"
                                            data-sort=""
                                          ></th>
                                          <th
                                            scope="col"
                                            class="sort"
                                            data-sort=""
                                          ></th>
                                          <th
                                            scope="col"
                                            class="sort"
                                            data-sort=""
                                          ></th>
                                          <th
                                            scope="col"
                                            class="sort"
                                            data-sort=""
                                          >
                                            Tổng tiền:
                                          </th>
                                          <th
                                            scope="col"
                                            class="sort"
                                            data-sort=""
                                          >
                                            {{ subtotal }} &#8363;
                                          </th>
                                          <th
                                            scope="col"
                                            class="sort"
                                            data-sort=""
                                          ></th>
                                        </tr>
                                      </tfoot>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-dismiss="modal"
                          >
                            Đóng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </table>
              </div>
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
</template>

<script>
import axios from "axios";
import { server } from "../main";
import Notiflix from "notiflix";
import vPagination from "vue-plain-pagination";

export default {
  data() {
    return {
      googlemap: "http://maps.google.com/?q=",
      unactive: [],
      modalOrderDetail: [],
      infomation: {},
      subtotal: null,

      current_page: "",
      last_page: "",
      next_page: "",
      previous_page: "",
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
    //Chưa duyệt
    this.getUnactive();
    //
    Notiflix.Notify.Init({
      fontSize: "15px",
      timeout: 4000,
      messageMaxLength: 200,
      position: "right-bottom",
    });
  },
  methods: {
    //Modal detail orders
    getOrderDetail(unactive) {
      this.infomation = unactive;
      this.modalOrderDetail = JSON.parse(unactive.order_detail);
      let tongTien = 0;
      JSON.parse(unactive.order_detail).forEach((element) => {
        tongTien += element.price * element.cart_quantity;
      });
      this.subtotal = tongTien;
    },
    //Xuất đơn chờ duyệt
    getUnactive() {
      axios
        .post(`${server}/unactive-order-shop`, { shop_id: this.shop_id })
        .then((response) => {
          var unactive = response.data.data;
          this.current_page = response.data.current_page;
          this.next_page = response.data.next_page_url;
          this.previous_page = response.data.prev_page_url;
          for (var item in unactive) {
            this.unactive.push(unactive[item]);
          }
          console.log(response.data);
        });
    },
    //Duyệt sản phẩm theo id
    checkOrder(id) {
      axios.post(`${server}/shop-check`, { id: id }).then((response) => {
        if (response.data.success) {
          Notiflix.Notify.Success(
            `Đã duyệt`,
            (window.location.href = "/new-order")
          );
        }
        // console.log(response.data);
      });
    },
    //pagination
    PageAct() {
      let this2 = this;
      axios
        .post(`${server}` + "/unactive-order-shop?page=" + this2.current_page, {shop_id: this.shop_id})
        .then(function (response) {
          this2.unactive = response.data.data;
          this2.current_page = response.data.current_page;
          this2.last_page = response.data.last_page;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
  },
  watch: {
    current_page(value) {
      console.log(value);
      this.PageAct();
    },
  },
};
</script>
<style>
</style>
