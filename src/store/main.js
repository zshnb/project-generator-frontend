import Vue from 'vue'
import Vuex from 'vuex'
import c from './c'
import ssmp from "./ssmp";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    ssmp,
    c
  }
})

export default store
