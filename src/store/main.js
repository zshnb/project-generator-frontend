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
          require: true,
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
          require: true,
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
          require: true,
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
          primary: false,
          searchable: false,
          enableFormItem: false,
          enableTableField: false,
          formItemType: '',
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
      } else {
        let index = state.tables.findIndex(it => it.name === table.name)
        state.tables.splice(index, 1, table)
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
      } else {
        let index = state.roles.findIndex(it => it.name === role.name )
        state.roles.splice(index, 1, role)
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
      } else {
        let index = state.menus.findIndex(it => it.name === menu.name )
        state.menus.splice(index, 1, menu)
      }
    },
    deleteMenu(state, index) {
      state.menus.splice(index, 1)
    },
    addMenuInRole(state, payload) {
      let role = state.roles.find(it => it.description === payload.roleDescription)
      if (role === undefined) {
        throw Error(`role: ${payload.roleDescription} not found`)
      }
      let menu = payload.menu
      role.menus.push({
        name: menu.name,
        href: menu.href,
        icon: menu.icon,
        bind: menu.bind
      })
    }
  }
})

export default store
