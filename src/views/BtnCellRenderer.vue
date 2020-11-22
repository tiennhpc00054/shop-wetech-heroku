<template>
  <span>
    <button @click="btnClickedHandler()">Click me!</button>
  </span>
</template>
<script>
export default {
  methods: {
    btnClickedHandler() {
      this.params.clicked(this.params.value);
    }
  },
};
</script>