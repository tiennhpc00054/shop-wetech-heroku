<template>
  <div>
    <div class="ref">
      <img
        :src="addImage"
        class=""
        v-on:click="handleClickInputImg"
        width="100%"
      />
      <input
        ref="fileInputImg"
        type="file"
        style="display: none"
        v-on:change="handleFileUpload()"
      />
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import axios from "axios";
import { server,EventBus } from "./../../main";
export default {
  name: "ref",
  data() {
    return {
      file: null,
      addImage:
        "https://static.thenounproject.com/png/971744-200.png",
    };
  },
  methods: {
    handleClickInputImg() {
      this.$refs.fileInputImg.click();
    },
    handleFileUpload() {
      this.file = this.$refs.fileInputImg.files[0];
      let formData = new FormData();
      formData.append("image", this.file);
      axios
        .post(`${server}/add-image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.addImage = response.data;
          EventBus.$emit("bus-upload-image",response.data)
        });
    },
  },
};
</script>

<style>
.ref {
  max-width: 100px;
  margin: 20px;
}
</style>
