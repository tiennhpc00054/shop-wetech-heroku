<template>
  <div>
    <!-- Main content -->
    <!-- Page content -->
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card">
            <!-- Card header -->
            <div class="card-header border-0">
              <h5>Thêm sản phẩm - Thời trang</h5>
            </div>
            <div class="card-body">
              <form>
                <h6 class="heading-small text-muted mb-4">Thông tin cơ bản</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <!-- Tên sản phẩm -->
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label"> Tên sản phẩm </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Tên sản phẩm"
                          v-model="product.product_name"
                          :class="{
                            'is-invalid':
                              submitStatus && $v.product.product_name.$error,
                          }"
                        />
                        <div
                          class="text-warning"
                          v-if="
                            submitStatus && !$v.product.product_name.required
                          "
                        >
                          Không bỏ trống trường này!
                        </div>
                      </div>
                    </div>
                    <!-- Thương hiệu -->
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">Thương hiệu</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Thương hiệu"
                          v-model="product.brand"
                          :class="{
                            'is-invalid':
                              submitStatus && $v.product.brand.$error,
                          }"
                        />
                        <div
                          class="text-warning"
                          v-if="submitStatus && !$v.product.brand.required"
                        >
                          Không bỏ trống trường này!
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="row">
                        <!-- danh mục chính -->
                        <div class="col-lg-6">
                          <div class="form-group">
                            <label class="form-control-label"
                              >Danh mục chính</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              placeholder
                              readonly
                              :value="danhMucChinh"
                              :class="{
                                'is-invalid':
                                  submitStatus && $v.danhMucChinh.$error,
                              }"
                            />
                            <div
                              class="text-warning"
                              v-if="submitStatus && !$v.danhMucChinh.required"
                            >
                              Chọn danh mục chính!
                            </div>
                          </div>
                        </div>
                        <!-- danh mục con -->
                        <div class="col-lg-6">
                          <div class="form-group">
                            <label class="form-control-label"
                              >Danh mục con</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              placeholder
                              :value="danhMucCon"
                              readonly
                              :class="{
                                'is-invalid':
                                  submitStatus && $v.danhMucCon.$error,
                              }"
                            />
                            <div
                              class="text-warning"
                              v-if="submitStatus && !$v.danhMucCon.required"
                            >
                              Chọn danh mục con!
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Trạng thái sản phẩm -->
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">Mở bán ngay ?</label>
                        <select
                          class="form-control"
                          v-model="product.status"
                          :class="{
                            'is-invalid':
                              submitStatus && $v.product.status.$error,
                          }"
                        >
                          <option value="1">Mở bán sản phẩm (Còn hàng)</option>
                          <option value="0">Chờ lấy hàng (Hết hàng)</option>
                        </select>
                        <div
                          class="text-warning"
                          v-if="submitStatus && !$v.product.status.required"
                        >
                          Không bỏ trống trường này!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- Chi tiết sản phẩm -->
                <h6 class="heading-small text-muted mb-4">Chi tiết sản phẩm</h6>
                <div class="pl-lg-4" id="detailNext">
                  <div class="row">
                    <!-- Kích thước sản phẩm -->
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label"
                          >Size</label
                        >
                        <input
                          class="form-control"
                          type="text"
                          placeholder="VD: S; M; L... 1; 2; 3;..."
                          v-model="product.size"
                        />
                      </div>
                    </div>
                    <!-- Cân nặng  -->
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label">Cân nặng (Kg)</label>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Nếu cần thiết..."
                          v-model="product.weight"
                          min="0"
                        />
                      </div>
                    </div>
                    <!-- Nguồn gốc -->
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label">Thể tích (ml)</label>
                        <input
                          class="form-control"
                          type="number"
                          placeholder="VD: 300; 500;..."
                          v-model="product.volume"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <!-- Đơn giá -->
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label">Đơn giá</label>
                        <div class="input-group mb-3">
                          <input
                            type="number"
                            class="form-control"
                            placeholder="VD:99000"
                            v-model="product.price"
                            :class="{
                              'is-invalid':
                                submitStatus && $v.product.price.$error,
                            }"
                          />
                          <div class="input-group-append">
                            <span class="input-group-text">VNĐ</span>
                          </div>
                          <div
                            class="text-warning"
                            v-if="submitStatus && !$v.product.price.required"
                          >
                            Không bỏ trống trường này!
                          </div>
                          <div
                            class="text-warning"
                            v-if="submitStatus && !$v.product.price.minValue"
                          >
                            Không nhận giá trị âm!
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Số lượng kho -->
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label">Số lượng nhập</label>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="VD: 1; 2;..."
                          min="0"
                          v-model="product.quantity"
                          :class="{
                            'is-invalid':
                              submitStatus && $v.product.quantity.$error,
                          }"
                        />
                        <div
                          class="text-warning"
                          v-if="submitStatus && !$v.product.quantity.required"
                        >
                          Không bỏ trống trường này!
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label">Khuyến mãi ?</label>
                        <select
                          class="form-control"
                          v-model="product.status_discount"
                        >
                          <option value="1" selected>Khuyến mãi</option>
                          <option value="0" selected>Không khuyến mãi</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="row" v-if="product.status_discount==1">
                    <!-- Giá giảm -->
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label">Giảm giá (%)</label>
                        <div class="input-group mb-3">
                          <input
                            type="number"
                            class="form-control"
                            placeholder="VD: 55; 45..."
                            v-model="product.percent"
                            min="0"
                            max="100"
                          />
                          <div class="input-group-append">
                            <span class="input-group-text">%</span>
                          </div>
                        </div>
                        <div
                          class="text-warning"
                          v-if="submitStatus && !$v.product.percent.minValue"
                        >
                          Giá trị nhỏ nhất là 0!
                        </div>
                        <div
                          class="text-warning"
                          v-if="submitStatus && !$v.product.percent.maxValue"
                        >
                          Giá trị lớn nhất là 100!
                        </div>
                      </div>
                    </div>
                    <!-- Từ ngày -->
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label">Từ ngày</label>
                        <input
                          type="datetime-local"
                          class="form-control"
                          v-model="product.from_day"
                        />
                      </div>
                    </div>
                    <!-- Từ ngày -->
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label">Đến ngày</label>
                        <input
                          type="datetime-local"
                          class="form-control"
                          v-model="product.to_day"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <!-- Kích thước sản phẩm -->
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">Màu sắc</label>
                        <input
                          class="form-control"
                          type="text"
                          v-model="product.color"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">Chất liệu</label>
                        <input
                          class="form-control"
                          type="text"
                          placeholder="VD: Giấy; nhựa;..."
                          v-model="product.material"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label">Nguồn gốc</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="VD: NXB; Tác giả; Quốc gia;..."
                          v-model="product.origin"
                          :class="{
                            'is-invalid':
                              submitStatus && $v.product.origin.$error,
                          }"
                        />
                        <div
                          class="text-warning"
                          v-if="submitStatus && !$v.product.origin.required"
                        >
                          Không bỏ trống trường này!
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label"
                          >Sản phẩm đi kèm / Quà tặng</label
                        >
                        <div class="input-group mb-3">
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Nhập sản phẩm kèm theo..."
                            v-model="product.accessory"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- Description -->
                <h6 class="heading-small text-muted mb-4">Mô tả</h6>
                <div class="pl-lg-4">
                  <div class="form-group">
                    <label class="form-control-label">Mô tả ngắn</label>
                    <ckeditor
                      v-model="product.introduction"
                      :config="editorConfig"
                      :editor-url="editorUrl"
                      :class="{
                        'is-invalid':
                          submitStatus && $v.product.introduction.$error,
                      }"
                    ></ckeditor>
                    <div
                      class="text-warning"
                      v-if="submitStatus && !$v.product.introduction.required"
                    >
                      Không bỏ trống trường này!
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">Thêm hình ảnh</label>
                    <div class="row d-flex justify-content-center">
                      <div class=""><Ref /></div>
                      <div class=""><Ref /></div>
                      <div class=""><Ref /></div>
                      <div class=""><Ref /></div>
                      <div class=""><Ref /></div>
                      <div class=""><Ref /></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-control-label">Mô tả chi tiết</label>
                    <ckeditor
                      v-model="product.description"
                      :config="editorConfig"
                      :editor-url="editorUrl"
                      :class="{
                        'is-invalid':
                          submitStatus && $v.product.description.$error,
                      }"
                    ></ckeditor>
                    <div
                      class="text-warning"
                      v-if="submitStatus && !$v.product.description.required"
                    >
                      Không bỏ trống trường này!
                    </div>
                  </div>

                  <div class="form-group">
                    <input
                      type="button"
                      class="btn btn-primary"
                      name
                      value="Thêm sản phẩm"
                      @click="addProduct"
                    />
                    <input
                      type="button"
                      class="btn btn-danger"
                      name
                      value="Hủy"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { store, EventBus, server } from "./../../main";
import Ref from "./Ref";
import swal from "sweetalert";
import { required, minValue, maxValue } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      submitStatus: false,
      danhMucChinh: "",
      danhMucCon: "",
      imgArr: [],
      product: {
        quantity: 0,
        size: null,
        color: null,
        price: null,
        status: null,
        origin: null,
        accessory: null,
        dimension: null,
        weight: null,
        system: null,
        material: null,
        screen_size: null,
        wattage: null,
        volume: null,
        resolution: null,
        memory: null,
        product_name: null,
        brand: null,
        introduction: null,
        description: null,
        tag: null,
        status_discount: "0",
        status_product: "0",
        percent: null,
        from_day: null,
        to_day: null,

        shop_id: null,

        cate_id: null,
      },

      editorUrl: "https://cdn.ckeditor.com/4.14.1/full-all/ckeditor.js",
      editorData: "",
      editorConfig: {
        toolbarGroups: [
          {
            name: "document",
            groups: ["mode", "document", "doctools"],
          },
          {
            name: "clipboard",
            groups: ["clipboard", "undo"],
          },
          {
            name: "editing",
            groups: ["find", "selection", "spellchecker", "editing"],
          },
          {
            name: "forms",
            groups: ["forms"],
          },
          {
            name: "basicstyles",
            groups: ["basicstyles", "cleanup"],
          },
          {
            name: "paragraph",
            groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"],
          },
          {
            name: "links",
            groups: ["links"],
          },
          {
            name: "insert",
            groups: ["insert"],
          },
          {
            name: "styles",
            groups: ["styles"],
          },
          {
            name: "colors",
            groups: ["colors"],
          },
          {
            name: "tools",
            groups: ["tools"],
          },
          {
            name: "others",
            groups: ["others"],
          },
          {
            name: "about",
            groups: ["about"],
          },
        ],
        removeButtons:
          "NewPage,Print,Save,Templates,Replace,Find,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,Anchor,Flash,Smiley,PageBreak,ShowBlocks,About,Language,Iframe,Image",
      },
      batDau: null,
      ketThuc: null,
    };
  },
  components: {
    Ref,
  },
  methods: {
    addProduct() {
      let batDau = new Date(this.product.from_day);
      let ketThuc = new Date(this.product.to_day);
      this.batDau = batDau.getTime();
      this.ketThuc = ketThuc.getTime();

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        return false;
      }

      if (this.ketThuc - this.batDau < 0) {
        swal({
          title: "Thất bại!",
          text: "Ngày kết thúc phải bằng hoặc sau ngày bắt đầu khuyến mãi!",
          icon: "error",
          button: "Kiểm tra lại",
        });
        return false;
      }
      Axios.post(`${server}/add-product`, {
        quantity: this.product.quantity,
        size: this.product.size,
        color: this.product.color,
        price: this.product.price,
        status: this.product.status,
        origin: this.product.origin,
        accessory: this.product.accessory,
        dimension: this.product.dimension,
        weight: this.product.weight,
        system: this.product.system,
        material: this.product.material,
        screen_size: this.product.screen_size,
        wattage: this.product.wattage,
        volume: this.product.volume,
        resolution: this.product.resolution,
        memory: this.product.memory,
        product_name: this.product.product_name,
        brand: this.product.brand,
        introduction: this.product.introduction,
        description: this.product.description,
        tag: this.product.tag,
        status_discount: this.product.status_discount,
        status_product: "0",
        percent: this.product.percent,
        from_day: this.product.from_day,
        to_day: this.product.to_day,

        shop_id: this.product.shop_id,

        cate_id: this.product.cate_id,
        image: JSON.stringify(this.imgArr),
      })
        .then((re) => {
          console.log(re.data);
          if (re.data.success) {
            swal({
              title: "Thành công!",
              icon: "success",
              buttons: "OK",
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
    cancel() {},
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

    this.product.shop_id = JSON.parse(getCookie("shop_id"));

    this.danhMucChinh = store.state.danhMucChinh;

    EventBus.$on("catecon", (da) => {
      this.danhMucCon = da.cate_name;
      this.product.cate_id = da.cate_id;
    });

    EventBus.$on("bus-upload-image", (data) => {
      this.imgArr.push(data);
    });
  },

  validations: {
    //sản phẩm
    product: {
      quantity: {
        required,
      },
      size: {},
      color: {},
      price: {
        required,
        minValue: minValue(0),
      },
      status: {
        required,
      },
      origin: {
        required,
      },
      accessory: {},
      dimension: {},
      weight: {},
      system: {},
      material: {},
      screen_size: {},
      wattage: {},
      volume: {},
      resolution: {},
      memory: {},
      product_name: {
        required,
      },
      brand: {
        required,
      },
      introduction: {
        required,
      },
      description: {
        required,
      },
      tag: {},
      status_discount: {},
      status_product: {},
      percent: {
        minValue: minValue(0),
        maxValue: maxValue(100),
      },
      from_day: {},
      to_day: {},
    },
    danhMucChinh: {
      required,
    },
    danhMucCon: {
      required,
    },
  },
};
</script>

<style>
</style>
