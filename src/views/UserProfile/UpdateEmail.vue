<template>
<card class="card" title="Thay đổi Email">
    <div>
        <form>
            <div class="row">
                <div class="col-md-6">
                    <fg-input type="email" label="Email hiện tại" :disabled="true" placeholder="Email">
                    </fg-input>
                    <fg-input type="email" label="Email mới" placeholder="Nhập email mới bạn muốn thay đổi">
                    </fg-input>
                    <fg-input type="password" label="Mật khẩu" placeholder="Nhập mật khẩu">
                    </fg-input>
                    <p-button type="info" round @click.native.prevent="updateEmail">
                        Thay đổi
                    </p-button>
                </div>
                <div class="col-md-6">
                    <div class="d-flex justify-content-center">
                        <img src="http://simpleicon.com/wp-content/uploads/mail-6.png" alt="" width="50%">
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
