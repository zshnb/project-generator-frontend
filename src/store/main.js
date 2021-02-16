import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tables: [
      {
        name: 'user',
        columns: [{
          name: 'username',
          type: 'varchar',
          length: 255,
          comment: '用户名',
          primary: false,
          searchable: false,
          enableFormItem: true,
          formItemType: 'com.zshnb.projectgenerator.generator.entity.InputFormItem'
        }, {
          name: 'password',
          type: 'varchar',
          length: 255,
          comment: '密码',
          primary: false,
          searchable: false,
          enableFormItem: true,
          formItemType: 'com.zshnb.projectgenerator.generator.entity.InputFormItem'
        }, {
          name: 'role',
          type: 'varchar',
          length: 255,
          comment: '角色',
          primary: false,
          searchable: false,
          enableFormItem: true,
          formItemType: 'com.zshnb.projectgenerator.generator.entity.SelectFormItem',
          options: []
        }],
        permissions: [{
          role: '',
          operations: []
        }],
        enablePage: true,
        form: {
          formItems: []
        }
      }
    ],
    roles: [],
    menus: []
  },
  getters: {
    tables: state => state.tables,
    roles: state => state.roles,
    menus: state => state.menus
  },
  mutations: {
    saveTable(state, table) {
      state.tables.push(table)
    },
    deleteTable(state, index) {
      state.tables.splice(index, 1)
    },
    saveRole(state, role) {
      state.roles.push(role)
    },
    deleteRole(state, index) {
      state.roles.splice(index, 1)
    },
    saveMenu(state, menu) {
      state.menus.push(menu)
    },
    deleteMenu(state, index) {
      state.menus.splice(index, 1)
    }
  }
})

export default store
