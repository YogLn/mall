<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  text-align: center;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;  
  font-size: 12px;
  margin-top: 6px;
  padding: 10px 0;
}
img {
  width: 70px;
  height: 70px;
  margin-bottom: 8px;
}
</style>