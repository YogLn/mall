<template>
  <div class="tab-control">
    <div v-for="(item, index) in title" :key="index" class="tab-control-item" 
    :class="{active: currentIndex === index}" @click="itemClick(index)"> 
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  },
}
</script>

<style lang="less" scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 44px;
  font-size: 15px;
  background-color: #fff;
  padding: 10px;
}
.tab-control-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.active span {
  padding: 3px;
  border-bottom: 3px solid var(--color-tint);
}
</style>