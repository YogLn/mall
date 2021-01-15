<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    setTimeout(() => {
      this.scroll.refresh()
    }, 1000)
    /**
     * 创建对象
     */
    this.scroll = new BScroll('.wrapper', {
      pullUpLoad: this.pullUpLoad,
      scrollbar: true,
      probeType: this.probeType,
      click: true
    })
    /**
     * 监听滚动位置
     */
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })
    }
    /**
     * 上拉加载更多
     */
    if (this.pullingUp) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
  },
}
</script>

<style>
/* .wrapper {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  height: 2000px;
} */
</style>