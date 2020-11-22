<template>
  <div>
    <div class="modal fade" id="detailProduct">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Chi tiết sản phẩm</h4>
            <button type="button" class="close" data-dismiss="modal">
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
                    <th scope="col" class="sort" data-sort>Hình ảnh</th>
                    <th scope="col" class="sort" data-sort="detail_id">
                      Mã sản phẩm
                    </th>
                    <th scope="col" class="sort" data-sort="price">Giá</th>
                    <th scope="col" class="sort" data-sort="quantity">
                      SLượng kho
                    </th>
                    <th scope="col" class="sort" data-sort="color">Màu</th>
                    <th scope="col">Thao tác</th>
                  </tr>
                </thead>
                <tbody class="list">
                  <tr
                    v-for="(modalDetail, index) in showProductDetail"
                    :key="index + 99"
                  >
                    <!-- mã sản phẩm -->
                    <td>
                      <a href="#" class="avatar rounded-circle mr-3">
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
                      {{ modalDetail.price }}
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
                          <a class="dropdown-item" href="javascript:void(0)"
                            >Xem chi tiết</a
                          >
                          <a
                            class="dropdown-item"
                            href="javascript:void(0)"
                            @click="deleteProducts(modalDetail.prodetail_id)"
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
  </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>