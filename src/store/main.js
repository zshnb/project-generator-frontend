import Vue from 'vue'
import Vuex from 'vuex'
import c from './c'
import sbmp from "./sbmp";
import swing from "./swing";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sbmp,
    c,
    swing
  }
})

export default store
