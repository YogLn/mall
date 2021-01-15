<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartlength}})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'

export default {
  components: { NavBar },
  computed: {
    cartlength() {
      return this.$store.state.cartList.length
    }
  }
}
</script>

<style scoped>
.nav-bar {

}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
</style>
