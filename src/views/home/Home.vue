<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :title="['流行','新款','精选']" @tabClick="tabClick" ref="tabControlRef1" class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scrollRef" :probe-type="3" @scroll="contentScroll" :pullUpLoad="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend :recommends="recommends"></recommend>
      <feature></feature>
      <tab-control :title="['流行','新款','精选']" @tabClick="tabClick" ref="tabControlRef2"/>
      <good-list :goods="showgoods"></good-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import Recommend from './childComps/Recommend.vue'
import Feature from './childComps/Feature.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import GoodList from '../../components/content/goods/GoodList.vue'
import Scroll from '../../components/common/scroll/scroll.vue'
import Swiper from '../../components/common/swiper/Swiper.vue'

import {debounce} from '../../common/utils'
import {backTopMixin} from '@/common/mixin'

export default {
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    Feature,
    TabControl,
    GoodList,
    Scroll,
    Swiper,
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 1.监听图片加载完成
    const refresh = debounce(this.$refs.scrollRef.refresh,30)
    this.$bus.$on('itemImgLoad', () => {
      refresh()
    })

  },
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',
      
      tabOffsetTop: 0,
      // 判断是否吸顶
      isTabFixed: false
    }
  },
  computed: {
    showgoods() {
      return this.goods[this.currentType].list
    },
  },
  methods: {
    /*
     *事件监听相关方法
     */
    swiperImgLoad() {
    // 2.过去tabcontrol得offsetTop
    // 所有的额组件都有一个属性： $el
    this.tabOffsetTop = this.$refs.tabControlRef2.$el.offsetTop
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControlRef1.currentIndex = index
      this.$refs.tabControlRef2.currentIndex = index
    },
    contentScroll(position) {
      // 1.判断是否显示返回顶部
      if (-position.y > 1000) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      // 2.判断tabcontrol是否吸顶
      this.isTabFixed = -(position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    /**
     * 网络处理相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page + 1
        // 完成了上拉加载更多
        this.$refs.scrollRef.finishPullUp()
      })
    },
  },
  activated() {
    this.$refs.scrollRef.scrollTo(0, this.saveY, 0)
    this.$refs.scrollRef.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scrollRef.scroll.y
  },
}
</script>

<style scoped>
#home {
  position: relative;
  /* height: 100vh; */
  margin-top: 12.222vw;
}
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.content {
   position: absolute;
    top: 0px;
    bottom: 49px;
    left: 0;
    right: 0;
}

.tab-control {
  position: relative;
  z-index: 12;
}
</style>
