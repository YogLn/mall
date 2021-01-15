<template>
  <div id="detail">
    <detail-nav-bar class="nav" @titleClick="titleClick" ref="navRef"></detail-nav-bar>
    <scroll class="content" :probeType="3" ref="scrollRef" @scroll="contentScroll">
      <detail-swiper :topImg="topImg"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="paramRef"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="commentRef"></detail-comment-info>
      <good-list :goods="recommennds" ref="recommendRef"></good-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from 'network/detail'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import Scroll from '../../components/common/scroll/scroll.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodList from '../../components/content/goods/GoodList.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'
import { backTopMixin } from '@/common/mixin'
export default {
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImg: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommennds: [],
      themeTopYs: [],
      currentIndex: 0,
    }
  },
  created() {
    // 1.请求iid
    this.iid = this.$route.params.iid

    // 2.请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.result
      // 1.获取顶部的轮播图
      this.topImg = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )
      // 3.店铺信息对象
      this.shop = new Shop(data.shopInfo)
      // 4.保存商品的详细数据
      this.detailInfo = data.detailInfo
      // 5.获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )
      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommennds = res.data.list
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scrollRef.refresh()
    },
    titleClick(index) {
      this.$refs.scrollRef.scrollTo(0, -this.themeTopYs[index], 300)
      this.themeTopYs = []

      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.paramRef.$el.offsetTop)
      this.themeTopYs.push(this.$refs.commentRef.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommendRef.$el.offsetTop)
    },
    contentScroll(position) {
       if (-position.y > 1000) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length; i++) {
        if (
          (i < length - 1 &&
            positionY > this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
          (i === length - 1 && positionY > this.themeTopYs[i])
        ) {
          this.currentIndex = i
          console.log(i)
          this.$refs.navRef.currentIndex = i
        }
      }
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImg[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.newPrice
      product.realPrice = this.goods.lowNowPrice
      product.iid = this.iid

      // 2.将商品添加带购物车
      // 通过mutations
      // this.$store.commit('addCart', product)
      // 通过actions
      this.$store.dispatch('addCart', product)
    }
  },
}
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.nav {
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 60px;
}
</style>