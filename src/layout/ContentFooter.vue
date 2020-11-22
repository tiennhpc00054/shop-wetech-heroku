<template>
  <footer class="footer px-4">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
        <div class="copyright text-center text-lg-left text-muted">
          <i class="fa fa-copyright" aria-hidden="true"></i> <strong>{{year}}</strong> Bản quyền bởi <a href="javascript:void(0)" class="font-weight-bold ml-1">WeTech</a>
        </div>
      </div>
      <div class="col-lg-6">
        <ul class="nav nav-footer justify-content-center justify-content-lg-end">
          <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link" target="_blank"><i class="ni ni-cart"></i> Shopping by WeTech</a>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link" target="_blank"><img src="https://bagiang.com/wp-content/uploads/2019/02/icon-facebook.png" alt="" width="15"> Facebook</a>
          </li>
          <li class="nav-item">
            <a href="mailto:rekococontact@gmail.com" class="nav-link" target="_blank"><img src="https://image.flaticon.com/icons/png/512/281/281769.png" alt="" width="15"> Gmail</a>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link" target="_blank"><img src="https://cdn.tgdd.vn/2020/03/GameApp/Instagram-200x200.jpg" alt="" width="15"> Instagram</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
