<template>
  <div class="">
    <nav-bar>
      <div class="back" slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div class="title" slot="center">
        <div class="title-item" v-for="(item, index) in titles" 
            :key="index" 
            :class="{active: index === currentIndex}"
            @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>

  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar.vue'
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.$emit('titleClick', index)
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  },
}
</script>

<style lang="less" scoped>
.title {
  display: flex;
  .title-item {
    flex: 1;
    font-size: 13px;
  }
}
.active {
  color: var(--color-high-text)
}
.back {
  margin-left: 3px;
  padding: 8px;
  display: flex;
  img {
    align-items: center;
  }
}
</style>