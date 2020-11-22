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
      <br />
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="container">
              <br />
              <div class="row">
                <div class="col-lg">
                  <h4 class="text-success">ĐÁNH GIÁ</h4>
                </div>
              </div>
              <div class="table-responsive">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#all"
                      >Tất cả</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#replied"
                      >Đã trả lời</a
                    >
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#notReply"
                      >Chưa trả lời</a
                    >
                  </li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                  <div class="tab-pane container active" id="all">
                    <br />
                    Có <span class="text-success" v-if="commentShops.length==0">0</span><span class="text-success">{{ AllLength }}</span> bài
                    đánh giá
                    <br />
                    <table class="table align-items-center table-hover">
                      <thead class="thead-light">
                        <tr>
                          <th scope="col">Thao tác</th>
                          <th scope="col" class="sort" data-sort="product_id">
                            Trạng thái
                          </th>
                          <th scope="col" class="sort" data-sort="product_id">
                            Sản phẩm
                          </th>
                          <th scope="col" class="sort" data-sort="product_name">
                            Tên người dùng
                          </th>
                          <th scope="col" class="sort" data-sort="cate_name">
                            Đánh giá
                          </th>
                          <th scope="col" class="sort" data-sort="brand">
                            Nội dung
                          </th>
                          <th scope="col" class="sort" data-sort="origin">
                            Thời gian đánh giá
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="commentShops.length == 0">
                          <td>Không có dữ liệu</td>
                        </tr>
                        <tr
                          v-for="(commentShop, index) in commentShops"
                          v-bind:key="index"
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
                                  data-target="#detailReview"
                                  @click="detailReview(commentShop)"
                                  v-if="commentShop.is_reply == 0"
                                  >Trả lời</a
                                >
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0)"
                                  v-if="commentShop.is_reply == 1"
                                  >Đã trả lời</a
                                >
                              </div>
                            </div>
                          </td>
                          <td class="nameShop">
                            <div v-if="commentShop.is_reply == 0">
                              Chưa trả lời
                            </div>
                            <div v-if="commentShop.is_reply == 1">
                              Đã trả lời
                            </div>
                          </td>
                          <th scope="row">
                            <div class="media align-items-center">
                              <!-- hình ảnh sản phẩm -->
                              <a href="#" class="avatar rounded-circle mr-3">
                                <img alt="Product" :src="commentShop.image" />
                              </a>
                              <!-- tên sản phẩm -->
                              <div class="media-body">
                                <span class="name mb-0 text-sm">{{
                                  commentShop.product_name
                                }}</span>
                              </div>
                            </div>
                          </th>
                          <td class="nameShop">{{ commentShop.name }}</td>
                          <td class="text-center">
                            {{ commentShop.rating }}
                            <img
                              src="https://res.cloudinary.com/nguy-n-ti-n/image/upload/v1605771471/pngtree-star-icon-png-image_1611681_cohvxy.png"
                              alt=""
                              width="20"
                              height="20"
                              class="mt--2"
                            />
                          </td>
                          <td class="nameShop">{{ commentShop.content }}</td>
                          <td class="nameShop">{{ commentShop.created_at }}</td>
                        </tr>
                      </tbody>
                      <div class="modal" id="detailReview">
                        <div class="modal-dialog modal-lg">
                          <div class="modal-content">
                            <!-- Modal Header -->
                            <div class="modal-header">
                              <h4 class="modal-title">Chi tiết bài đánh giá</h4>
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
                              <div class="media">
                                <!-- hình ảnh sản phẩm -->
                                <a href="#" class="avatar rounded-circle mr-3">
                                  <img
                                    alt="Avatar"
                                    :src="detailComment.avatar"
                                  />
                                </a>
                                <!-- tên sản phẩm -->
                                <div class="media-body">
                                  <h4 class="text-success">
                                    {{ detailComment.name }} -
                                    {{ detailComment.phone_number }}
                                  </h4>
                                  <star-rating
                                    v-model="detailComment.rating"
                                    read-only
                                    :star-size="20"
                                  ></star-rating>
                                  <p
                                    style="font-size: 13px; font-style: italic"
                                  >
                                    {{ detailComment.created_at }}
                                  </p>
                                </div>
                              </div>
                              <hr class="my-1" />
                              <div class="media">
                                <!-- hình ảnh sản phẩm -->
                                <a href="#" class="avatar rounded-circle mr-3">
                                  <img
                                    alt="Product"
                                    :src="detailComment.image"
                                  />
                                </a>
                                <!-- tên sản phẩm -->
                                <div class="media-body">
                                  <h4 class="text-blue">
                                    {{ detailComment.product_name }}
                                  </h4>
                                  <span class="text-primary"
                                    >Nội dung đánh giá:</span
                                  >
                                  <p>{{ detailComment.content }}</p>
                                  <label for="">Trả lời:</label>
                                  <textarea
                                    class="form-control"
                                    v-model="reply"
                                    @keyup.enter="replyComment"
                                    :class="{
                                      'is-invalid':
                                        submitStatus && $v.reply.$error,
                                    }"
                                  ></textarea>
                                  <div
                                    class="text-warning"
                                    v-if="submitStatus && !$v.reply.required"
                                  >
                                    Không bỏ trống trường này!
                                  </div>
                                  <br />
                                  <button
                                    type="button"
                                    class="btn btn-outline-primary d-flex float-right"
                                    data-dismiss="modal"
                                    @click="replyComment(detailComment)"
                                  >
                                    Trả lời
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </table>
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
                  <div class="tab-pane container fade" id="replied">
                    <br />
                    Có <span class="text-success" v-if="replied.length==0">0</span><span class="text-success">{{ ActiveLength }}</span> bài
                    đánh giá
                    <br />
                    <table class="table align-items-center table-hover">
                      <thead class="thead-light">
                        <tr>
                          <th scope="col" class="sort" data-sort="product_id">
                            Sản phẩm
                          </th>
                          <th scope="col" class="sort" data-sort="product_name">
                            Tên người dùng
                          </th>
                          <th scope="col" class="sort" data-sort="cate_name">
                            Đánh giá
                          </th>
                          <th scope="col" class="sort" data-sort="brand">
                            Nội dung
                          </th>
                          <th scope="col" class="sort" data-sort="origin">
                            Thời gian đánh giá
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="replied.length == 0">
                          <td>Không có dữ liệu</td>
                        </tr>
                        <tr
                          v-for="(replied, index) in replied"
                          v-bind:key="index"
                        >
                          <th scope="row">
                            <div class="media align-items-center">
                              <!-- hình ảnh sản phẩm -->
                              <a href="#" class="avatar rounded-circle mr-3">
                                <img alt="Product" :src="replied.image" />
                              </a>
                              <!-- tên sản phẩm -->
                              <div class="media-body">
                                <span class="name mb-0 text-sm">{{
                                  replied.product_name
                                }}</span>
                              </div>
                            </div>
                          </th>
                          <td class="nameShop">{{ replied.name }}</td>
                          <td class="text-center">
                            {{ replied.rating }}
                            <img
                              src="https://res.cloudinary.com/nguy-n-ti-n/image/upload/v1605771471/pngtree-star-icon-png-image_1611681_cohvxy.png"
                              alt=""
                              width="20"
                              height="20"
                              class="mt--2"
                            />
                          </td>
                          <td class="nameShop">{{ replied.content }}</td>
                          <td class="nameShop">{{ replied.created_at }}</td>
                        </tr>
                      </tbody>
                    </table>
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
                  <div class="tab-pane container fade" id="notReply">
                    <br />
                    Có <span class="text-success" v-if="notReply.length==0">0</span><span class="text-success">{{ UnactiveLength }}</span> bài
                    đánh giá
                    <br />
                    <table class="table align-items-center table-hover">
                      <thead class="thead-light">
                        <tr>
                          <th scope="col">Thao tác</th>
                          <th scope="col" class="sort" data-sort="product_id">
                            Sản phẩm
                          </th>
                          <th scope="col" class="sort" data-sort="product_name">
                            Tên người dùng
                          </th>
                          <th scope="col" class="sort" data-sort="cate_name">
                            Đánh giá
                          </th>
                          <th scope="col" class="sort" data-sort="brand">
                            Nội dung
                          </th>
                          <th scope="col" class="sort" data-sort="origin">
                            Thời gian đánh giá
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="notReply.length == 0">
                          <td>Không có dữ liệu</td>
                        </tr>
                        <tr
                          v-for="(notReply, index) in notReply"
                          v-bind:key="index"
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
                                  data-target="#detailReview"
                                  @click="detailReview(notReply)"
                                  >Trả lời</a
                                >
                              </div>
                            </div>
                          </td>
                          <th scope="row">
                            <div class="media align-items-center">
                              <!-- hình ảnh sản phẩm -->
                              <a href="#" class="avatar rounded-circle mr-3">
                                <img alt="Product" :src="notReply.image" />
                              </a>
                              <!-- tên sản phẩm -->
                              <div class="media-body">
                                <span class="name mb-0 text-sm">{{
                                  notReply.product_name
                                }}</span>
                              </div>
                            </div>
                          </th>
                          <td class="nameShop">{{ notReply.name }}</td>
                          <td class="text-center">
                            {{ notReply.rating }}
                            <img
                              src="https://res.cloudinary.com/nguy-n-ti-n/image/upload/v1605771471/pngtree-star-icon-png-image_1611681_cohvxy.png"
                              alt=""
                              width="20"
                              height="20"
                              class="mt--2"
                            />
                          </td>
                          <td class="nameShop">{{ notReply.content }}</td>
                          <td class="nameShop">{{ notReply.created_at }}</td>
                        </tr>
                      </tbody>
                      <div class="modal" id="detailReview">
                        <div class="modal-dialog modal-lg">
                          <div class="modal-content">
                            <!-- Modal Header -->
                            <div class="modal-header">
                              <h4 class="modal-title">Chi tiết bài đánh giá</h4>
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
                              <div class="media">
                                <!-- hình ảnh sản phẩm -->
                                <a href="#" class="avatar rounded-circle mr-3">
                                  <img
                                    alt="Avatar"
                                    :src="detailComment.avatar"
                                  />
                                </a>
                                <!-- tên sản phẩm -->
                                <div class="media-body">
                                  <h4 class="text-success">
                                    {{ detailComment.name }} -
                                    {{ detailComment.phone_number }}
                                  </h4>
                                  <star-rating
                                    v-model="detailComment.rating"
                                    read-only
                                    :star-size="20"
                                  ></star-rating>
                                  <p
                                    style="font-size: 13px; font-style: italic"
                                  >
                                    {{ detailComment.created_at }}
                                  </p>
                                </div>
                              </div>
                              <hr class="my-1" />
                              <div class="media">
                                <!-- hình ảnh sản phẩm -->
                                <a href="#" class="avatar rounded-circle mr-3">
                                  <img
                                    alt="Product"
                                    :src="detailComment.image"
                                  />
                                </a>
                                <!-- tên sản phẩm -->
                                <div class="media-body">
                                  <h4 class="text-blue">
                                    {{ detailComment.product_name }}
                                  </h4>
                                  <span class="text-primary"
                                    >Nội dung đánh giá:</span
                                  >
                                  <p>{{ detailComment.content }}</p>
                                  <label for="">Trả lời:</label>
                                  <textarea
                                    class="form-control"
                                    v-model="reply"
                                    @keyup.enter="replyComment"
                                    :class="{
                                      'is-invalid':
                                        submitStatus && $v.reply.$error,
                                    }"
                                  ></textarea>
                                  <div
                                    class="text-warning"
                                    v-if="submitStatus && !$v.reply.required"
                                  >
                                    Không bỏ trống trường này!
                                  </div>
                                  <br />
                                  <button
                                    type="button"
                                    class="btn btn-outline-primary d-flex float-right"
                                    data-dismiss="modal"
                                    @click="replyComment(detailComment)"
                                  >
                                    Trả lời
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </table>
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
              <br />
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
import StarRating from "vue-star-rating";
import vPagination from "vue-plain-pagination";
import { required } from "vuelidate/lib/validators";
import swal from "sweetalert";
export default {
  data() {
    return {
      AllLength: null,
      ActiveLength: null,
      UnactiveLength: null,
      commentShops: [],
      replied:[],
      notReply:[],
      detailComment: {},
      reply:
        "Cảm ơn bạn đã trải nghiệm và đánh giá sản phẩm. Shop chúc bạn thật nhiều sức khỏe và thật nhiều niềm vui.",

      submitStatus: false,
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
    StarRating,
    vPagination,
  },
  methods: {
    detailReview(commentShop) {
      this.detailComment = commentShop;
      console.log(this.detailComment);
    },
    replyComment(detailComment) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        return false;
      }
      axios
        .post(`${server}/reply-comment`, {
          id: detailComment.id,
          shop_id: detailComment.shop_id,
          product_id: detailComment.product_id,
          content: this.reply,
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

    PageAll() {
      let this2 = this;
      axios
        .post(`${server}` + "/comment-shop?page=" + this2.current_page, {
          shop_id: this.shop_id,
        })
        .then(function (response) {
          this2.commentShops = response.data.data;
          this2.current_page = response.data.current_page;
          this2.last_page = response.data.last_page;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    PageActive() {
      let this2 = this;
      axios
        .post(`${server}` + "/active-comment-shop?page=" + this2.current_page, {
          shop_id: this.shop_id,
        })
        .then(function (response) {
          this2.replied = response.data.data;
          this2.current_page = response.data.current_page;
          this2.last_page = response.data.last_page;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    PageUnactive() {
      let this2 = this;
      axios
        .post(`${server}` + "/unactive-comment-shop?page=" + this2.current_page, {
          shop_id: this.shop_id,
        })
        .then(function (response) {
          this2.notReply = response.data.data;
          this2.current_page = response.data.current_page;
          this2.last_page = response.data.last_page;
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
    //tất cả
    axios
      .post(`${server}/comment-shop`, { shop_id: this.shop_id })
      .then((response) => {
        var length = response.data.total;
        this.AllLength = length;
        var commentShops = response.data.data;
        this.current_page = response.data.current_page;
        this.next_page = response.data.next_page_url;
        this.last_page = response.data.last_page;
        this.previous_page = response.data.prev_page_url;
        for (var item in commentShops) {
          this.commentShops.push(commentShops[item]);
        }
      });
    // đã trả lời
    axios
      .post(`${server}/active-comment-shop`, { shop_id: this.shop_id })
      .then((response) => {
        var length = response.data.total;
        this.ActiveLength = length;
        var replied = response.data.data;
        this.current_page = response.data.current_page;
        this.next_page = response.data.next_page_url;
        this.last_page = response.data.last_page;
        this.previous_page = response.data.prev_page_url;
        for (var item in replied) {
          this.replied.push(replied[item]);
        }
      });
      // đã trả lời
    axios
      .post(`${server}/unactive-comment-shop`, { shop_id: this.shop_id })
      .then((response) => {
        var length = response.data.total;
        this.UnactiveLength = length;
        var notReply = response.data.data;
        this.current_page = response.data.current_page;
        this.next_page = response.data.next_page_url;
        this.last_page = response.data.last_page;
        this.previous_page = response.data.prev_page_url;
        for (var item in notReply) {
          this.notReply.push(notReply[item]);
        }
      });
  },
  watch: {
    current_page(value) {
      console.log(value);
      this.PageAll();
    },
  },
  validations: {
    reply: {
      required,
    },
  },
};
</script>
<style>
</style>
