<template>
  <div class="back-top">
    <img src="~/assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  methods: {
    backClick() {

    }
  },
}
</script>

<style scoped lang="less">
.back-top {
  position: fixed;
  display: flex;
  right: 10px;
  bottom: 60px;
  img {
    height: 50px;
    width: 50px;
  }
}

</style>