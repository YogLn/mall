<template>
  <div class="goods">
    <good-list-item v-for="(item, index) in goods" :key="index" :goodsItem="item"></good-list-item>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem.vue'
export default {
  components: { GoodListItem },
  props: {
    goods: {
      type: Array,
      default: []
    }
  }  
}
</script>

<style scoped>
.goods {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

</style>