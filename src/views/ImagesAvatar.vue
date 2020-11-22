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
                        src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.0-9/p960x960/117127887_612805836295710_6116670817612199975_o.jpg?_nc_cat=107&_nc_sid=85a577&_nc_ohc=BLvT2qOgCVUAX_fPNxw&_nc_ht=scontent.fsgn5-2.fna&tp=6&oh=4a12d697e2a9a8143a7ad98db8128c3e&oe=5F988F6B"
                        class="img-thumbnail avata"
                        alt=""
                        width="60%"
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
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
export default {
  data() {
    return {};
  },
};
</script>

<style>
.avata{
  border-radius: 50%;
}
</style>
