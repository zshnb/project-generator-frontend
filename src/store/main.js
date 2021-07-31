import Vue from 'vue'
import Vuex from 'vuex'
import c from './c'
import sbmp from "./sbmp";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sbmp,
    c
  }
})

export default store
