import { getDefaultOperations, generateDefaultColumns } from "../util/TableUtils";
import { formItemClassNames } from "../util/Constant";

const state = {
  tables: [
    {
      name: 'user',
      bindRoles: [],
      comment: '用户',
      columns: [{
        name: 'username',
        type: 'varchar',
        comment: '用户名',
        length: 255,
        label: '用户名',
        title: '用户名',
        primary: false,
        repeatable: false,
        require: true,
        searchable: false,
        enableFormItem: true,
        enableTableField: true,
        formItemType: formItemClassNames.inputFormItem,
        enableAssociate: false,
        mappings: []
      }, {
        name: 'password',
        type: 'varchar',
        comment: '密码',
        length: 255,
        label: '密码',
        title: '密码',
        primary: false,
        repeatable: true,
        require: true,
        searchable: false,
        enableFormItem: true,
        enableTableField: true,
        formItemType: formItemClassNames.passwordFormItem,
        enableAssociate: false,
        mappings: []
      }, {
        name: 'role',
        type: 'varchar',
        comment: '角色',
        length: 255,
        label: '角色',
        title: '角色',
        primary: false,
        repeatable: true,
        require: true,
        searchable: false,
        enableFormItem: true,
        enableTableField: true,
        formItemType: formItemClassNames.selectFormItem,
        options: [],
        enableAssociate: false,
        mappings: []
      }, ...generateDefaultColumns()],
      permissions: [{
        role: '',
        operations: getDefaultOperations()
      }],
      enablePage: true,
      form: {
        items: [
          {
            formItemClassName: formItemClassNames.inputFormItem,
            require: true
          },
          {
            formItemClassName: formItemClassNames.inputFormItem,
            require: true
          },
          {
            formItemClassName: formItemClassNames.selectFormItem,
            require: true,
            options: []
          }
        ]
      },
      table: {
        fields: [
          {
            formItemClassName: formItemClassNames.inputFormItem,
            title: "用户名"
          },
          {
            formItemClassName: formItemClassNames.inputFormItem,
            title: "密码"
          },
          {
            formItemClassName: formItemClassNames.selectFormItem,
            title: "角色"
          }
        ]
      }
    }
  ],
  roles: [],
  menus: []
}

const getters = {
  tables: state => state.tables,
  roles: state => state.roles,
  menus: state => state.menus
}

const mutations = {
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

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
