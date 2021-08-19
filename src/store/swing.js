import { databaseConfigs, frameItemClassNames } from "../util/Constant";
import { generateDefaultColumns } from "../util/TableUtils";

const state = {
  config: {
    groupId: 'com.demo',
    artifactId: 'demo',
    version: '1.0',
    rootPackageName: 'com.demo.demo',
    entityPackageName: 'entity',
    mapperPackageName: 'mapper',
    database: 'mysql',
    jdbcHost: databaseConfigs.mysql.jdbcHost,
    jdbcPort: databaseConfigs.mysql.jdbcPort,
    jdbcUser: databaseConfigs.mysql.jdbcUser,
    jdbcPassword: databaseConfigs.mysql.jdbcPassword,
    jdbcDatabase: 'demo',
  },
  tables: [
    {
      name: 'user',
      comment: '用户',
      columns: [{
        name: 'username',
        type: 'varchar',
        comment: '用户名',
        length: 255,
        primary: false,
        repeatable: false,
        require: true,
        searchable: false,
        enableFormItem: true,
        enableTableField: true,
        formItemType: frameItemClassNames.textFieldFrameItem,
        enableAssociate: false
      }, {
        name: 'password',
        type: 'varchar',
        comment: '密码',
        length: 255,
        primary: false,
        repeatable: true,
        require: true,
        searchable: false,
        enableFormItem: true,
        enableTableField: true,
        formItemType: frameItemClassNames.passwordFrameItem,
        enableAssociate: false
      }, {
        name: 'role',
        type: 'varchar',
        comment: '角色',
        length: 255,
        primary: false,
        repeatable: true,
        require: true,
        searchable: false,
        enableFormItem: true,
        enableTableField: true,
        formItemType: frameItemClassNames.selectFrameItem,
        options: [],
        enableAssociate: false
      }, ...generateDefaultColumns()],
      enablePage: false,
      frame: {
        items: [
          {
            formItemClassName: frameItemClassNames.textFieldFrameItem,
            require: true
          },
          {
            formItemClassName: frameItemClassNames.passwordFrameItem,
            require: true
          },
          {
            formItemClassName: frameItemClassNames.selectFrameItem,
            require: true,
            options: []
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
  menus: state => state.menus,
  type: state => state.type
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
      let index = state.roles.findIndex(it => it.name === role.name)
      state.roles.splice(index, 1, role)
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
      let index = state.menus.findIndex(it => it.name === menu.name)
      state.menus.splice(index, 1, menu)
    }
  },
  deleteMenu(state, index) {
    state.menus.splice(index, 1)
  },
  addMenuInRole(state, payload) {
    let role = state.roles.find(it => it.description === payload.roleDescription)
    if (role === undefined) {
      throw Error(`role: ${ payload.roleDescription } not found`)
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
