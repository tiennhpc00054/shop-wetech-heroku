<template>
<card class="card" title="Thay đổi số điện thoại">
    <div>
        <form>
            <div class="row">
                <div class="col-md-6">
                    <fg-input type="text" label="Số điện thoại hiện tại" :disabled="true" placeholder="" >
                    </fg-input>
                    <fg-input type="text" label="Số điện thoại mới" placeholder="Nhập số điện thoại mới" >
                    </fg-input>
                    <fg-input type="password" label="Mật khẩu" placeholder="Nhập mật khẩu" >
                    </fg-input>
                    <p-button type="info" round @click.native.prevent="updatePhoneNumber">
                        Thay đổi
                    </p-button>
                </div>
                <div class="col-md-6">
                    <div class="d-flex justify-content-center flex-wrap align-content-center">
                        <img src="https://cdn.onlinewebfonts.com/svg/img_454427.png" alt="" width="60%">
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
        </form>
    </div>
</card>
</template>

<script>
export default {
    data() {
        return {
        };
    },
};
</script>

<style>
</style>
