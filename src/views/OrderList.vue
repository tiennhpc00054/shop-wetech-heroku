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
            @keyup="searchOrder(shop_id)"
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
                  <a class="nav-link active" data-toggle="tab" href="#all"
                    >Tất cả</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#unactive"
                    >Chờ chuyệt</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#actived"
                    >Đã duyệt</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#packaged"
                    >Đã đóng gói</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#passedForShipper"
                    >Đã giao cho Shipper</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#shipping"
                    >Đang giao</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#shipped"
                    >Đã giao</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#cancelled"
                    >Đã hủy</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#return"
                    >Trả hàng / Hoàn tiền</a
                  >
                </li>
              </ul>

              <!-- Tất cả -->
              <div class="tab-content">
                <div id="all" class="container tab-pane active">
                  <br />
                  Có <span class="text-success">{{ allLength }}</span> đơn hàng
                  <div class="table-responsive">
                    <div></div>
                    <table class="table align-items-center table-flush">
                      <thead class="thead-light">
                        <tr>
                          <th scope="col" class="sort" data-sort="idBill">
                            Mã đơn hàng
                          </th>
                          <th scope="col" class="sort" data-sort="nameUser">
                            Tên khách hàng
                          </th>
                          <th scope="col" class="sort" data-sort="total">
                            Tổng tiền
                          </th>
                          <th scope="col" class="sort" data-sort="address">
                            Địa chỉ
                          </th>
                          <th scope="col" class="sort" data-sort="created_at">
                            Thời gian đặt
                          </th>
                          <th scope="col" class="sort" data-sort="status">
                            Trạng thái
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        class="list"
                        v-for="(all, index) in all"
                        v-bind:key="index"
                      >
                        <tr>
                          <td>
                            <strong>{{ all.id }}</strong>
                          </td>
                          <td>{{ all.name }}</td>
                          <td>{{ all.total.format(0, 3, ".") }} &#8363;</td>
                          <td>
                            {{ all.order_address }}
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <span class="completion mr-2">{{
                                all.created_at
                              }}</span>
                            </div>
                          </td>
                          <td>
                            {{ all.status }}
                          </td>
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
                </div>
                <!-- Chờ duyệt -->
                <div id="unactive" class="container tab-pane fade">
                  <br />
                  Có <span class="text-success">{{ unactiveLength }}</span> đơn
                  hàng
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
                      <tbody
                        class="list"
                        v-for="(unactive, index) in unactive"
                        v-bind:key="index + 1"
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
                                  data-target="#detailBillUnactive"
                                  @click="getOrderDetailUnactive(unactive)"
                                  >Chi tiết đơn hàng</a
                                >
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0)"
                                  @click="checkOrder(unactive)"
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
                      <div class="modal fade" id="detailBillUnactive">
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
                                              :src="unactivemd.avatar"
                                            />
                                          </a>
                                          <div class="media-body">
                                            <span class="name mb-0 text-sm">
                                              <strong>{{
                                                unactivemd.name
                                              }}</strong>
                                            </span>
                                            -
                                            <img
                                              src="https://i.pinimg.com/originals/a0/c7/d2/a0c7d21bb6e784b884560d83215aca16.png"
                                              alt=""
                                              width="15"
                                            />
                                            {{ unactivemd.phone_number }}
                                          </div>
                                          <!-- địa chỉ người dùng -->
                                          <div class="float-right">
                                            <i class="ni ni-delivery-fast"></i>
                                            <span class="name mb-0 text-sm">
                                              <a
                                                :href="
                                                  googlemap +
                                                  unactivemd.order_address
                                                "
                                                target="_blank"
                                              >
                                                {{
                                                  unactivemd.order_address
                                                }}</a
                                              >
                                            </span>
                                            &emsp; | &emsp;
                                            <span
                                              class="badge badge-pill badge-primary"
                                              style="
                                                font-family: Times New Roman;
                                              "
                                              ><strong>{{
                                                unactivemd.status
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
                                              v-for="(modalOrderDetailUnactive,
                                              index) in modalOrderDetailUnactive"
                                              :key="index + 99567"
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
                                                      :src="
                                                        modalOrderDetailUnactive.image
                                                      "
                                                    />
                                                  </a>
                                                  <!-- tên sản phẩm -->
                                                  <div class="media-body">
                                                    <span
                                                      class="name mb-0 text-sm"
                                                      >{{
                                                        modalOrderDetailUnactive.product_name
                                                      }}</span
                                                    >
                                                  </div>
                                                </div>
                                              </th>
                                              <!-- giá sản phẩm -->
                                              <td>
                                                {{
                                                  modalOrderDetailUnactive.price.format(
                                                    0,
                                                    3,
                                                    "."
                                                  )
                                                }}
                                                &#8363;
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailUnactive.cart_quantity
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailUnactive.color
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailUnactive.size
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  (
                                                    modalOrderDetailUnactive.price *
                                                    modalOrderDetailUnactive.cart_quantity
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
                                                {{ subtotal }}
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
                    <div class="card-footer py-4">
                      <!-- <v-pagination
                        v-model="current_page"
                        :page-count="last_page"
                        :classes="bootstrapPaginationClasses"
                        :labels="paginationAnchorTexts"
                      >
                      </v-pagination> -->
                    </div>
                  </div>
                </div>
                <!-- Đã duyệt -->
                <div id="actived" class="container tab-pane fade">
                  <br />
                  Có <span class="text-success">{{ activedLength }}</span> đơn
                  hàng
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
                          <th scope="col" class="sort" data-sort="total">
                            Tổng tiền
                          </th>
                          <th scope="col" class="sort" data-sort="status">
                            Địa chỉ
                          </th>
                          <th scope="col" class="sort" data-sort="created_at">
                            Thời gian đặt
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        class="list"
                        v-for="(actived, index) in actived"
                        v-bind:key="index + 2436"
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
                                  data-target="#detailBillActived"
                                  @click="getOrderDetailActived(actived)"
                                  >Chi tiết đơn hàng</a
                                >
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0)"
                                  @click="daDongGoi(actived.id)"
                                  >Đã đóng gói
                                </a>
                              </div>
                            </div>
                          </td>
                          <td>
                            <strong>{{ actived.id }}</strong>
                          </td>
                          <td>{{ actived.name }}</td>
                          <td>{{ actived.total.format(0, 3, ".") }} &#8363;</td>
                          <td>
                            {{ actived.order_address }}
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <span class="completion mr-2">{{
                                actived.created_at
                              }}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <!-- The Modal -->
                      <div class="modal fade" id="detailBillActived">
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
                                              :src="activedmd.avatar"
                                            />
                                          </a>
                                          <div class="media-body">
                                            <span class="name mb-0 text-sm">
                                              <strong>{{
                                                activedmd.name
                                              }}</strong>
                                            </span>
                                            -
                                            <img
                                              src="https://i.pinimg.com/originals/a0/c7/d2/a0c7d21bb6e784b884560d83215aca16.png"
                                              alt=""
                                              width="15"
                                            />
                                            {{ activedmd.phone_number }}
                                          </div>
                                          <!-- địa chỉ người dùng -->
                                          <div class="float-right">
                                            <i class="ni ni-delivery-fast"></i>
                                            <span class="name mb-0 text-sm">
                                              <a
                                                :href="
                                                  googlemap +
                                                  activedmd.order_address
                                                "
                                                target="_blank"
                                              >
                                                {{ activedmd.order_address }}</a
                                              >
                                            </span>
                                            &emsp; | &emsp;
                                            <span
                                              class="badge badge-pill badge-primary"
                                              style="
                                                font-family: Times New Roman;
                                              "
                                              ><strong>{{
                                                activedmd.status
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
                                              v-for="(modalOrderDetailActived,
                                              index) in modalOrderDetailActived"
                                              :key="index + 994576"
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
                                                      :src="
                                                        modalOrderDetailActived.image
                                                      "
                                                    />
                                                  </a>
                                                  <!-- tên sản phẩm -->
                                                  <div class="media-body">
                                                    <span
                                                      class="name mb-0 text-sm"
                                                      >{{
                                                        modalOrderDetailActived.product_name
                                                      }}</span
                                                    >
                                                  </div>
                                                </div>
                                              </th>
                                              <!-- giá sản phẩm -->
                                              <td>
                                                {{
                                                  modalOrderDetailActived.price.format(
                                                    0,
                                                    3,
                                                    "."
                                                  )
                                                }}
                                                &#8363;
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailActived.cart_quantity
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailActived.color
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailActived.size
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  (
                                                    modalOrderDetailActived.price *
                                                    modalOrderDetailActived.cart_quantity
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
                                                {{ subtotal }}
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
                    <div class="card-footer py-4"></div>
                  </div>
                </div>
                <!-- Đã đóng gói -->
                <div id="packaged" class="container tab-pane fade">
                  <br />
                  Có <span class="text-success">{{ packagedLength }}</span> đơn
                  hàng
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
                          <th scope="col" class="sort" data-sort="total">
                            Tổng tiền
                          </th>
                          <th scope="col" class="sort" data-sort="status">
                            Địa chỉ
                          </th>
                          <th scope="col" class="sort" data-sort="created_at">
                            Thời gian đặt
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        class="list"
                        v-for="(packaged, index) in packaged"
                        v-bind:key="index + 3788679"
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
                                  data-target="#detailBillPackaged"
                                  @click="getOrderDetailPackaged(packaged)"
                                  >Chi tiết đơn hàng</a
                                >
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0)"
                                  >Hủy đơn hàng
                                </a>
                              </div>
                            </div>
                          </td>
                          <td>
                            <strong>{{ packaged.id }}</strong>
                          </td>
                          <td>{{ packaged.name }}</td>
                          <td>
                            {{ packaged.total.format(0, 3, ".") }} &#8363;
                          </td>
                          <td>
                            {{ packaged.order_address }}
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <span class="completion mr-2">{{
                                packaged.created_at
                              }}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <!-- The Modal -->
                      <div class="modal fade" id="detailBillPackaged">
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
                                              :src="packagedmd.avatar"
                                            />
                                          </a>
                                          <div class="media-body">
                                            <span class="name mb-0 text-sm">
                                              <strong>{{
                                                packagedmd.name
                                              }}</strong>
                                            </span>
                                            -
                                            <img
                                              src="https://i.pinimg.com/originals/a0/c7/d2/a0c7d21bb6e784b884560d83215aca16.png"
                                              alt=""
                                              width="15"
                                            />
                                            {{ packagedmd.phone_number }}
                                          </div>
                                          <!-- địa chỉ người dùng -->
                                          <div class="float-right">
                                            <i class="ni ni-delivery-fast"></i>
                                            <span class="name mb-0 text-sm">
                                              <a
                                                :href="
                                                  googlemap +
                                                  packagedmd.order_address
                                                "
                                                target="_blank"
                                              >
                                                {{
                                                  packagedmd.order_address
                                                }}</a
                                              >
                                            </span>
                                            &emsp; | &emsp;
                                            <span
                                              class="badge badge-pill badge-primary"
                                              style="
                                                font-family: Times New Roman;
                                              "
                                              ><strong>{{
                                                packagedmd.status
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
                                              v-for="(modalOrderDetailPackaged,
                                              index) in modalOrderDetailPackaged"
                                              :key="index + 994543676"
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
                                                      :src="
                                                        modalOrderDetailPackaged.image
                                                      "
                                                    />
                                                  </a>
                                                  <!-- tên sản phẩm -->
                                                  <div class="media-body">
                                                    <span
                                                      class="name mb-0 text-sm"
                                                      >{{
                                                        modalOrderDetailPackaged.product_name
                                                      }}</span
                                                    >
                                                  </div>
                                                </div>
                                              </th>
                                              <!-- giá sản phẩm -->
                                              <td>
                                                {{
                                                  modalOrderDetailPackaged.price.format(
                                                    0,
                                                    3,
                                                    "."
                                                  )
                                                }}
                                                &#8363;
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailPackaged.cart_quantity
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailPackaged.color
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailPackaged.size
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  (
                                                    modalOrderDetailPackaged.price *
                                                    modalOrderDetailPackaged.cart_quantity
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
                                                {{ subtotal }}
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
                    <div class="card-footer py-4"></div>
                  </div>
                </div>
                <!-- Đã giao cho shipper -->
                <div id="passedForShipper" class="container tab-pane fade">
                  <br />
                  Có
                  <span class="text-success">{{ warehouseLength }}</span> đơn
                  hàng
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
                          <th scope="col" class="sort" data-sort="total">
                            Tổng tiền
                          </th>
                          <th scope="col" class="sort" data-sort="status">
                            Địa chỉ
                          </th>
                          <th scope="col" class="sort" data-sort="created_at">
                            Thời gian đặt
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        class="list"
                        v-for="(warehouse, index) in warehouse"
                        v-bind:key="index + 1045756856"
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
                                  data-target="#detailWarehouse"
                                  @click="getOrderDetailWarehouse(warehouse)"
                                  >Chi tiết đơn hàng</a
                                >
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0)"
                                  >Hủy đơn hàng
                                </a>
                              </div>
                            </div>
                          </td>
                          <td>
                            <strong>{{ warehouse.id }}</strong>
                          </td>
                          <td>{{ warehouse.name }}</td>
                          <td>
                            {{ warehouse.total.format(0, 3, ".") }} &#8363;
                          </td>
                          <td>
                            {{ warehouse.order_address }}
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <span class="completion mr-2">{{
                                warehouse.created_at
                              }}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <!-- The Modal -->
                      <div class="modal fade" id="detailWarehouse">
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
                                              :src="warehousemd.avatar"
                                            />
                                          </a>
                                          <div class="media-body">
                                            <span class="name mb-0 text-sm">
                                              <strong>{{
                                                warehousemd.name
                                              }}</strong>
                                            </span>
                                            -
                                            <img
                                              src="https://i.pinimg.com/originals/a0/c7/d2/a0c7d21bb6e784b884560d83215aca16.png"
                                              alt=""
                                              width="15"
                                            />
                                            {{ warehousemd.phone_number }}
                                          </div>
                                          <!-- địa chỉ người dùng -->
                                          <div class="float-right">
                                            <i class="ni ni-delivery-fast"></i>
                                            <span class="name mb-0 text-sm">
                                              <a
                                                :href="
                                                  googlemap +
                                                  warehousemd.order_address
                                                "
                                                target="_blank"
                                              >
                                                {{
                                                  warehousemd.order_address
                                                }}</a
                                              >
                                            </span>
                                            &emsp; | &emsp;
                                            <span
                                              class="badge badge-pill badge-primary"
                                              style="
                                                font-family: Times New Roman;
                                              "
                                              ><strong>{{
                                                warehousemd.status
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
                                              v-for="(modalOrderDetailWarehouse,
                                              index) in modalOrderDetailWarehouse"
                                              :key="index + 995685"
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
                                                      :src="
                                                        modalOrderDetailWarehouse.image
                                                      "
                                                    />
                                                  </a>
                                                  <!-- tên sản phẩm -->
                                                  <div class="media-body">
                                                    <span
                                                      class="name mb-0 text-sm"
                                                      >{{
                                                        modalOrderDetailWarehouse.product_name
                                                      }}</span
                                                    >
                                                  </div>
                                                </div>
                                              </th>
                                              <!-- giá sản phẩm -->
                                              <td>
                                                {{
                                                  modalOrderDetailWarehouse.price.format(
                                                    0,
                                                    3,
                                                    "."
                                                  )
                                                }}
                                                &#8363;
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailWarehouse.cart_quantity
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailWarehouse.color
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailWarehouse.size
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  (
                                                    modalOrderDetailWarehouse.price *
                                                    modalOrderDetailWarehouse.cart_quantity
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
                                                {{ subtotal }}
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
                    <div class="card-footer py-4"></div>
                  </div>
                </div>
                <!-- Đang giao -->
                <div id="shipping" class="container tab-pane fade">
                  <br />
                  Có <span class="text-success">{{ shippingLength }}</span> đơn
                  hàng
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
                          <th scope="col" class="sort" data-sort="total">
                            Tổng tiền
                          </th>
                          <th scope="col" class="sort" data-sort="status">
                            Địa chỉ
                          </th>
                          <th scope="col" class="sort" data-sort="created_at">
                            Thời gian đặt
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        class="list"
                        v-for="(shipping, index) in shipping"
                        v-bind:key="index + 104575673234"
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
                                  data-target="#detailWarehouse"
                                  @click="getOrderDetailShipping(shipping)"
                                  >Chi tiết đơn hàng</a
                                >
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0)"
                                  >Hủy đơn hàng
                                </a>
                              </div>
                            </div>
                          </td>
                          <td>
                            <strong>{{ shipping.id }}</strong>
                          </td>
                          <td>{{ shipping.name }}</td>
                          <td>
                            {{ shipping.total.format(0, 3, ".") }} &#8363;
                          </td>
                          <td>
                            {{ shipping.order_address }}
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <span class="completion mr-2">{{
                                shipping.created_at
                              }}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <!-- The Modal -->
                      <div class="modal fade" id="detailWarehouse">
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
                                              :src="shippingmd.avatar"
                                            />
                                          </a>
                                          <div class="media-body">
                                            <span class="name mb-0 text-sm">
                                              <strong>{{
                                                shippingmd.name
                                              }}</strong>
                                            </span>
                                            -
                                            <img
                                              src="https://i.pinimg.com/originals/a0/c7/d2/a0c7d21bb6e784b884560d83215aca16.png"
                                              alt=""
                                              width="15"
                                            />
                                            {{ shippingmd.phone_number }}
                                          </div>
                                          <!-- địa chỉ người dùng -->
                                          <div class="float-right">
                                            <i class="ni ni-delivery-fast"></i>
                                            <span class="name mb-0 text-sm">
                                              <a
                                                :href="
                                                  googlemap +
                                                  shippingmd.order_address
                                                "
                                                target="_blank"
                                              >
                                                {{
                                                  shippingmd.order_address
                                                }}</a
                                              >
                                            </span>
                                            &emsp; | &emsp;
                                            <span
                                              class="badge badge-pill badge-primary"
                                              style="
                                                font-family: Times New Roman;
                                              "
                                              ><strong>{{
                                                shippingmd.status
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
                                              v-for="(modalOrderDetailShipping,
                                              index) in modalOrderDetailShipping"
                                              :key="index + 995685"
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
                                                      :src="
                                                        modalOrderDetailShipping.image
                                                      "
                                                    />
                                                  </a>
                                                  <!-- tên sản phẩm -->
                                                  <div class="media-body">
                                                    <span
                                                      class="name mb-0 text-sm"
                                                      >{{
                                                        modalOrderDetailShipping.product_name
                                                      }}</span
                                                    >
                                                  </div>
                                                </div>
                                              </th>
                                              <!-- giá sản phẩm -->
                                              <td>
                                                {{
                                                  modalOrderDetailShipping.price.format(
                                                    0,
                                                    3,
                                                    "."
                                                  )
                                                }}
                                                &#8363;
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailShipping.cart_quantity
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailShipping.color
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailShipping.size
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  (
                                                    modalOrderDetailShipping.price *
                                                    modalOrderDetailShipping.cart_quantity
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
                                                {{ subtotal }}
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
                    <div class="card-footer py-4"></div>
                  </div>
                </div>
                <!-- Đã giao -->
                <div id="shipped" class="container tab-pane fade">
                  <br />
                  Có <span class="text-success">{{ shippedLength }}</span> đơn
                  hàng
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
                          <th scope="col" class="sort" data-sort="total">
                            Tổng tiền
                          </th>
                          <th scope="col" class="sort" data-sort="status">
                            Địa chỉ
                          </th>
                          <th scope="col" class="sort" data-sort="created_at">
                            Thời gian đặt
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        class="list"
                        v-for="(shipped, index) in shipped"
                        v-bind:key="index + 104573234"
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
                                  data-target="#detailWarehouse"
                                  @click="getOrderDetailShipped(shipped)"
                                  >Chi tiết đơn hàng</a
                                >
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0)"
                                  >Hủy đơn hàng
                                </a>
                              </div>
                            </div>
                          </td>
                          <td>
                            <strong>{{ shipped.id }}</strong>
                          </td>
                          <td>{{ shipped.name }}</td>
                          <td>{{ shipped.total.format(0, 3, ".") }} &#8363;</td>
                          <td>
                            {{ shipped.order_address }}
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <span class="completion mr-2">{{
                                shipped.created_at
                              }}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <!-- The Modal -->
                      <div class="modal fade" id="detailWarehouse">
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
                                              :src="shippedmd.avatar"
                                            />
                                          </a>
                                          <div class="media-body">
                                            <span class="name mb-0 text-sm">
                                              <strong>{{
                                                shippedmd.name
                                              }}</strong>
                                            </span>
                                            -
                                            <img
                                              src="https://i.pinimg.com/originals/a0/c7/d2/a0c7d21bb6e784b884560d83215aca16.png"
                                              alt=""
                                              width="15"
                                            />
                                            {{ shippedmd.phone_number }}
                                          </div>
                                          <!-- địa chỉ người dùng -->
                                          <div class="float-right">
                                            <i class="ni ni-delivery-fast"></i>
                                            <span class="name mb-0 text-sm">
                                              <a
                                                :href="
                                                  googlemap +
                                                  shippedmd.order_address
                                                "
                                                target="_blank"
                                              >
                                                {{ shippedmd.order_address }}</a
                                              >
                                            </span>
                                            &emsp; | &emsp;
                                            <span
                                              class="badge badge-pill badge-primary"
                                              style="
                                                font-family: Times New Roman;
                                              "
                                              ><strong>{{
                                                shippedmd.status
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
                                              v-for="(modalOrderDetailShipped,
                                              index) in modalOrderDetailShipped"
                                              :key="index + 995685"
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
                                                      :src="
                                                        modalOrderDetailShipped.image
                                                      "
                                                    />
                                                  </a>
                                                  <!-- tên sản phẩm -->
                                                  <div class="media-body">
                                                    <span
                                                      class="name mb-0 text-sm"
                                                      >{{
                                                        modalOrderDetailShipped.product_name
                                                      }}</span
                                                    >
                                                  </div>
                                                </div>
                                              </th>
                                              <!-- giá sản phẩm -->
                                              <td>
                                                {{
                                                  modalOrderDetailShipped.price.format(
                                                    0,
                                                    3,
                                                    "."
                                                  )
                                                }}
                                                &#8363;
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailShipped.cart_quantity
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailShipped.color
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailShipped.size
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  (
                                                    modalOrderDetailShipped.price *
                                                    modalOrderDetailShipped.cart_quantity
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
                                                {{ subtotal }}
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
                    <div class="card-footer py-4"></div>
                  </div>
                </div>
                <!-- Đã hủy -->
                <div id="cancelled" class="container tab-pane fade">
                  <br />
                  Có
                  <span class="text-success">{{ cancelledLength }}</span> đơn
                  hàng
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
                          <th scope="col" class="sort" data-sort="total">
                            Tổng tiền
                          </th>
                          <th scope="col" class="sort" data-sort="status">
                            Địa chỉ
                          </th>
                          <th scope="col" class="sort" data-sort="created_at">
                            Thời gian đặt
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        class="list"
                        v-for="(cancelled, index) in cancelled"
                        v-bind:key="index + 104573234"
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
                                  data-target="#detailWarehouse"
                                  @click="getOrderDetailCancelled(cancelled)"
                                  >Chi tiết đơn hàng</a
                                >
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0)"
                                  >Hủy đơn hàng
                                </a>
                              </div>
                            </div>
                          </td>
                          <td>
                            <strong>{{ cancelled.id }}</strong>
                          </td>
                          <td>{{ cancelled.name }}</td>
                          <td>
                            {{ cancelled.total.format(0, 3, ".") }} &#8363;
                          </td>
                          <td>
                            {{ cancelled.order_address }}
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <span class="completion mr-2">{{
                                cancelled.created_at
                              }}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <!-- The Modal -->
                      <div class="modal fade" id="detailWarehouse">
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
                                              :src="cancelledmd.avatar"
                                            />
                                          </a>
                                          <div class="media-body">
                                            <span class="name mb-0 text-sm">
                                              <strong>{{
                                                cancelledmd.name
                                              }}</strong>
                                            </span>
                                            -
                                            <img
                                              src="https://i.pinimg.com/originals/a0/c7/d2/a0c7d21bb6e784b884560d83215aca16.png"
                                              alt=""
                                              width="15"
                                            />
                                            {{ cancelledmd.phone_number }}
                                          </div>
                                          <!-- địa chỉ người dùng -->
                                          <div class="float-right">
                                            <i class="ni ni-delivery-fast"></i>
                                            <span class="name mb-0 text-sm">
                                              <a
                                                :href="
                                                  googlemap +
                                                  cancelledmd.order_address
                                                "
                                                target="_blank"
                                              >
                                                {{
                                                  cancelledmd.order_address
                                                }}</a
                                              >
                                            </span>
                                            &emsp; | &emsp;
                                            <span
                                              class="badge badge-pill badge-primary"
                                              style="
                                                font-family: Times New Roman;
                                              "
                                              ><strong>{{
                                                cancelledmd.status
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
                                              v-for="(modalOrderDetailCancelled,
                                              index) in modalOrderDetailCancelled"
                                              :key="index + 995685"
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
                                                      :src="
                                                        modalOrderDetailCancelled.image
                                                      "
                                                    />
                                                  </a>
                                                  <!-- tên sản phẩm -->
                                                  <div class="media-body">
                                                    <span
                                                      class="name mb-0 text-sm"
                                                      >{{
                                                        modalOrderDetailCancelled.product_name
                                                      }}</span
                                                    >
                                                  </div>
                                                </div>
                                              </th>
                                              <!-- giá sản phẩm -->
                                              <td>
                                                {{
                                                  modalOrderDetailCancelled.price.format(
                                                    0,
                                                    3,
                                                    "."
                                                  )
                                                }}
                                                &#8363;
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailCancelled.cart_quantity
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailCancelled.color
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  modalOrderDetailCancelled.size
                                                }}
                                              </td>
                                              <td>
                                                {{
                                                  (
                                                    modalOrderDetailCancelled.price *
                                                    modalOrderDetailCancelled.cart_quantity
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
                                                {{ subtotal }}
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
                    <div class="card-footer py-4"></div>
                  </div>
                </div>
                <!-- Trả hàng -->
                <div id="returned" class="container tab-pane fade">
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
                          <th scope="col" class="sort" data-sort="total">
                            Tổng tiền
                          </th>
                          <th scope="col" class="sort" data-sort="status">
                            Địa chỉ
                          </th>
                          <th scope="col" class="sort" data-sort="created_at">
                            Thời gian đặt
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        class="list"
                        v-for="(returned, index) in returned"
                        v-bind:key="index + 7"
                      >
                        <tr>
                          <th scope="row">
                            <div class="media align-items-center">
                              <div class="media-body">
                                <span class="name mb-0 text-sm">{{
                                  returned.id
                                }}</span>
                              </div>
                            </div>
                          </th>
                          <td class="budget">{{ returned.name }}</td>
                          <td>
                            <span class="status">{{ returned.total }}</span>
                          </td>
                          <td>
                            <div class="d-flex align-items-center">
                              <span class="completion mr-2">{{
                                returned.status
                              }}</span>
                            </div>
                          </td>
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
                                  >Chi tiết đơn hàng</a
                                >
                                <a
                                  class="dropdown-item"
                                  href="javascript:void(0)"
                                  >Thao tác kế tiếp</a
                                >
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="card-footer py-4"></div>
                  </div>
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
import Notiflix from "notiflix";
import vPagination from "vue-plain-pagination";

export default {
  data() {
    return {
      googlemap: "http://maps.google.com/?q=",
      all: [],
      allLength: [],
      unactive: [],
      unactiveLength: [],
      actived: [],
      activedLength: [],
      packaged: [],
      packagedLength: [],
      shipping: [],
      shippingLength: [],
      shipped: [],
      shippedLength: [],
      cancelled: [],
      cancelledLength: [],
      returned: [],
      returnedLength: [],
      newOrder: null,
      warehouse: [],
      subtotal: null,
      search: null,

      //phân trang
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

      //modal unactivemd
      modalOrderDetailUnactive: [],
      unactivemd: {},
      //modal activedmd
      modalOrderDetailActived: [],
      activedmd: {},
      //modal packagedmd
      modalOrderDetailPackaged: [],
      packagedmd: {},
      //modal warehousemd
      modalOrderDetailWarehouse: [],
      warehousemd: {},
      //modal shippingmd
      modalOrderDetailShipping: [],
      shippingmd: {},
      //modal shippedmd
      modalOrderDetailShipped: [],
      shippedmd: {},
      //modal cancelledmd
      modalOrderDetailCancelled: [],
      cancelledmd: {},
    };
  },
  components: {
    vPagination,
  },
  created() {
    // EventBus.$on("new-order",(data)=>{
    //   this.$alertify.success(`Bạn có đơn hàng mới từ ${data.username}`)
    // })
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

    this.allOrder();
    this.unActive();
    this.active();
    this.donggoi();
    this.daVeKho();
    this.shippingfc();
    this.shippedfc();
    this.cancelledfc();
    this.returnedfc();
  },
  mounted() {
    Notiflix.Notify.Init({
      fontSize: "15px",
      timeout: 4000,
      messageMaxLength: 200,
      position: "right-bottom",
    });
  },
  methods: {
    async checkOrder(item) {
      await this.getOrderDetailUnactive(item);
      axios
        .post(`${server}/shop-check`, { id: item.id, total: this.subtotal })
        .then((response) => {
          if (response.data.success) {
            //meu tra ve thanh cong thi goi lại api lay san pham
            this.unActive();
            Notiflix.Notify.Success(`Đã duyệt đơn hàng`);
          }
        });
    },
    allOrder() {
      //Tất cả
      axios
        .post(`${server}/get-order-shop`, { shop_id: this.shop_id })
        .then((response) => {
          var Length = response.data.total;
          this.allLength = Length;
          var all = response.data.data;
          this.current_page = response.data.current_page;
          this.next_page = response.data.next_page_url;
          this.previous_page = response.data.prev_page_url;
          this.all = all;
          // for (var item in all) {
          //   this.all.push(all[item]);
          //   // console.log(response.data);
          // }
        });
    },
    PageAllOrder() {
      let this2 = this;
      axios
        .post(`${server}` + "/get-order-shop?page=" + this2.current_page, {
          shop_id: this.shop_id,
        })
        .then(function (response) {
          this2.all = response.data.data;
          this2.current_page = response.data.current_page;
          this2.last_page = response.data.last_page;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    unActive() {
      //Chưa duyệt
      axios
        .post(`${server}/unactive-order-shop`, { shop_id: this.shop_id })
        .then((response) => {
          var Length = response.data.total;
          this.unactiveLength = Length;
          var unactive = response.data.data;
          this.current_page = response.data.current_page;
          this.next_page = response.data.next_page_url;
          this.previous_page = response.data.prev_page_url;
          this.unactive = unactive;
          // for (var item in unactive) {
          //   this.unactive.push(unactive[item]);
          // }
          // console.log(response.data);
        });
    },
    active() {
      //Đã duyệt
      axios
        .post(`${server}/active-order-shop`, { shop_id: this.shop_id })
        .then((response) => {
          var Length = response.data.total;
          this.activedLength = Length;
          var actived = response.data.data;
          this.current_page = response.data.current_page;
          this.next_page = response.data.next_page_url;
          this.previous_page = response.data.prev_page_url;
          this.actived = actived;
        });
    },
    donggoi() {
      //Đã đóng gói
      axios
        .post(`${server}/update-order-shop`, { shop_id: this.shop_id })
        .then((response) => {
          var Length = response.data.total;
          this.packagedLength = Length;
          var packaged = response.data.data;
          this.current_page = response.data.current_page;
          this.next_page = response.data.next_page_url;
          this.previous_page = response.data.prev_page_url;
          this.packaged = packaged;
        });
    },
    daVeKho() {
      //Đã về kho
      axios
        .post(`${server}/to-warehouse`, { shop_id: this.shop_id })
        .then((response) => {
          var Length = response.data.total;
          this.warehouseLength = Length;
          var warehouse = response.data.data;
          this.current_page = response.data.current_page;
          this.next_page = response.data.next_page_url;
          this.previous_page = response.data.prev_page_url;
          this.warehouse = warehouse;
        });
    },
    shippingfc() {
      //Đang giao
      axios
        .post(`${server}/confirm-order-shop`, { shop_id: this.shop_id })
        .then((response) => {
          var Length = response.data.total;
          this.shippingLength = Length;
          var shipping = response.data.data;
          this.current_page = response.data.current_page;
          this.next_page = response.data.next_page_url;
          this.previous_page = response.data.prev_page_url;
          this.shipping = shipping;
        });
    },
    shippedfc() {
      //Đã giao
      axios
        .post(`${server}/finish-order-shop`, { shop_id: this.shop_id })
        .then((response) => {
          var Length = response.data.total;
          this.shippedLength = Length;
          var shipped = response.data.data;
          this.current_page = response.data.current_page;
          this.next_page = response.data.next_page_url;
          this.previous_page = response.data.prev_page_url;
          this.shipped = shipped;
        });
    },
    cancelledfc() {
      //Đã hủy
      axios
        .post(`${server}/cancel-order-shop`, { shop_id: this.shop_id })
        .then((response) => {
          var Length = response.data.total;
          this.cancelledLength = Length;
          var cancelled = response.data.data;
          this.current_page = response.data.current_page;
          this.next_page = response.data.next_page_url;
          this.previous_page = response.data.prev_page_url;
          this.cancelled = cancelled;
        });
    },
    // returnedfc() {
    //   //Trả hàng
    //   axios
    //     .post(`${server}/return-order-shop`, { shop_id: this.shop_id })
    //     .then((response) => {
    //       var returned = response.data;
    //       this.returned = returned;
    //     });
    // },
    //Thao tác với đơn hàng
    //đã đóng gói
    daDongGoi(id) {
      axios.post(`${server}/shop-update`, { id: id }).then((response) => {
        if (response.data.success) {
          Notiflix.Notify.Success(`Đã đóng gói`, (window.location.href = ""));
        }
        // console.log(response.data);
      });
    },
    //Modal detail orders
    //unactive
    getOrderDetailUnactive(unactive) {
      this.unactivemd = unactive;
      this.modalOrderDetailUnactive = JSON.parse(unactive.order_detail);
      let tongTien = 0;
      JSON.parse(unactive.order_detail).forEach((element) => {
        tongTien += element.price * element.cart_quantity;
      });
      this.subtotal = tongTien;
    },
    //actived
    getOrderDetailActived(actived) {
      this.activedmd = actived;
      this.modalOrderDetailActived = JSON.parse(actived.order_detail);
      this.subtotal = this.activedmd.total;
    },
    //packaged
    getOrderDetailPackaged(packaged) {
      this.packagedmd = packaged;
      this.modalOrderDetailPackaged = JSON.parse(packaged.order_detail);
      this.subtotal = this.packagedmd.total;
    },
    //warehouse
    getOrderDetailWarehouse(warehouse) {
      this.warehousemd = warehouse;
      this.modalOrderDetailWarehouse = JSON.parse(warehouse.order_detail);
      this.subtotal = this.warehousemd.total;
    },
    //shipping
    getOrderDetailShipping(shipping) {
      this.shippingmd = shipping;
      this.modalOrderDetailShipping = JSON.parse(shipping.order_detail);
      this.subtotal = this.shippingmd.total;
    },
    //shipped
    getOrderDetailShipped(shipped) {
      this.shippedmd = shipped;
      this.modalOrderDetailShipped = JSON.parse(shipped.order_detail);
      this.subtotal = this.shippedmd.total;
    },
    //cancelled
    getOrderDetailCancelled(cancelled) {
      this.cancelledmd = cancelled;
      this.modalOrderDetailCancelled = JSON.parse(cancelled.order_detail);
      this.subtotal = this.cancelledmd.total;
    },

    //search
    searchOrder() {
      axios
        .post(`${server}/search-order-shop`, {
          shop_id: this.shop_id,
          keywords: this.search,
        })
        .then((response) => {
          var listSearched = response.data.data;
          this.current_page = response.data.current_page;
          this.next_page = response.data.next_page_url;
          this.previous_page = response.data.prev_page_url;
          this.all = listSearched;
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
      this.PageAllOrder();
    },
  },
};
</script>
<style>
</style>
