import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCounter (state, payload) {
      oldProduct.count += 1
    },
    addCart(state, payload) {
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart (context, payload) {
      // 1.查找数组中是否含有该商品
      let oldProduct = context.state.cartList.find(item => {
        item.iid === payload.iid
      })

      // 2.判断oldProduct是否有值
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit('addCart', payload)
      }
    }
  },
  modules: {
  }
})
