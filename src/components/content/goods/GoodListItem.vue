<template>
  <div class="goods" @click="itemClick">
    <img :src="showImg" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default: {}
    }
  },
  computed: {
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      // if(this.$route.path.indexOf('/home')) {

      // }
      this.$bus.$emit('itemImgLoad')
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
}
</script>

<style scoped>
.goods {
    padding-bottom: 11.111vw;
    position: relative;
    width: 48%;
  }
  .goods img {
    width: 100%;
  }

  .goods-info {
    font-size: 3.333vw;
    position: absolute;
    bottom: 1.389vw;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0.833vw;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 5.556vw;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -4.167vw;
    top: 0;
    width: 3.889vw;
    height: 3.889vw;
    background: url("~assets/img/common/collect.svg") 0 0/3.889vw 3.889vw;
  }

</style>