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
          label: '用户名',
          title: '用户名',
          primary: false,
          searchable: false,
          enableFormItem: true,
          enableTableField: true,
          formItemType: 'com.zshnb.projectgenerator.generator.entity.InputFormItem',
          enableAssociate: false
        }, {
          name: 'password',
          type: 'varchar',
          length: 255,
          label: '密码',
          title: '密码',
          primary: false,
          searchable: false,
          enableFormItem: true,
          enableTableField: true,
          formItemType: 'com.zshnb.projectgenerator.generator.entity.PasswordFormItem',
          enableAssociate: false
        }, {
          name: 'role',
          type: 'varchar',
          length: 255,
          label: '角色',
          title: '角色',
          primary: false,
          searchable: false,
          enableFormItem: true,
          enableTableField: true,
          formItemType: 'com.zshnb.projectgenerator.generator.entity.SelectFormItem',
          options: [],
          enableAssociate: false
        }, {
          name: 'id',
          type: 'int',
          length: 11,
          comment: '',
          primary: true,
          searchable: false,
          enableFormItem: false,
          enableTableField: false,
          formItemType: '',
          enableAssociate: false
        }, {
          name: 'create_at',
          type: 'datetime',
          length: 0,
          comment: '',
          primary: false,
          searchable: false,
          enableFormItem: false,
          enableTableField: false,
          formItemType: '',
          enableAssociate: false
        }, {
          name: 'update_at',
          type: 'datetime',
          length: 0,
          comment: '',
          primary: false,
          searchable: false,
          enableFormItem: false,
          enableTableField: false,
          formItemType: '',
          options: [],
          enableAssociate: false
        }],
        permissions: [{
          role: '',
          operations: []
        }],
        enablePage: true,
        form: {
          items: [
            {
              formItemClassName: 'com.zshnb.projectgenerator.generator.entity.InputFormItem',
              require: true
            },
            {
              formItemClassName: 'com.zshnb.projectgenerator.generator.entity.InputFormItem',
              require: true
            },
            {
              formItemClassName: 'com.zshnb.projectgenerator.generator.entity.SelectFormItem',
              require: true,
              options: []
            }
          ]
        },
        table: {
          fields: [
            {
              formItemClassName: "com.zshnb.projectgenerator.generator.entity.InputFormItem",
              title: "用户名"
            },
            {
              formItemClassName: "com.zshnb.projectgenerator.generator.entity.InputFormItem",
              title: "密码"
            },
            {
              formItemClassName: "com.zshnb.projectgenerator.generator.entity.SelectFormItem",
              title: "角色"
            }
          ]
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
    saveTable(state, payload) {
      let overwrite = payload.overwrite
      let table = payload.table
      if (!overwrite) {
        state.tables.push(table)
      }
    },
    deleteTable(state, index) {
      state.tables.splice(index, 1)
    },
    saveRole(state, payload) {
      let role = payload.role
      let overwrite = payload.overwrite
      if (!overwrite) {
        state.roles.push(role)
      }
      let table = state.tables.find(t => t.name === 'user')
      if (table !== undefined) {
        let roleColumnIndex = table.columns.findIndex(c => c.name === 'role')
        let options = state.roles.map(r => {
          return {
            title: r.description,
            value: r.name
          }
        })
        table.columns[roleColumnIndex].options = options
        table.form.items[roleColumnIndex].options = options
      }
    },
    deleteRole(state, index) {
      state.roles.splice(index, 1)
    },
    saveMenu(state, payload) {
      let menu = payload.menu
      let overwrite = payload.overwrite
      if (!overwrite) {
        state.menus.push(menu)
      }
    },
    deleteMenu(state, index) {
      state.menus.splice(index, 1)
    },
    addMenuInRole(state, payload) {
      let role = state.roles.find(it => it.name === payload.roleName)
      if (role === undefined) {
        throw Error(`role: ${payload.roleName} not found`)
      }
      let menu = payload.menu
      role.menus.push({
        name: menu.name,
        href: menu.href,
        icon: menu.icon
      })
    }
  }
})

export default store
