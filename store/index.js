import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:true
  },
  getters: {
  },
  mutations: {
    setLogin(state){
      state.isLogin = true
    },
    clearLogin(state){
      state.isLogin = false
    }
  },
  actions: {
  },
  modules: {
  }
})
