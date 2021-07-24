const state = {
  entities: []
}
const getters = {
  entities: state => state.entities
}
const mutations = {
  addEntity(state, payload) {
    let overwrite = payload.overwrite
    let entity = payload.entity
    if (!overwrite) {
      state.entities.push(entity)
    } else {
      let index = state.entities.findIndex(it => it.name === entity.name)
      state.entities.splice(index, 1, entity)
    }
  },
  deleteEntity(state, index) {
    state.entities.splice(index, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
