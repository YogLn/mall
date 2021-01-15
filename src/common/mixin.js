import BackTop from 'components/content/backTop/BackTop.vue'
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scrollRef.scrollTo(0, 0, 500)
    },
  },
}