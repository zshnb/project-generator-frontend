import { getDefaultOperations, generateDefaultColumns } from "../util/TableUtils";
import { formItemClassNames, frameItemClassNames } from "../util/Constant";
import { databaseConfigs } from "../util/Constant";

const state = {
  config: {
    groupId: 'com.demo',
    artifactId: 'demo',
    version: '1.0',
    rootPackageName: 'com.demo.demo',
    entityPackageName: 'entity',
    servicePackageName: 'service',
    serviceImplPackageName: 'serviceImpl',
    mapperPackageName: 'mapper',
    controllerPackageName: 'controller',
    database: 'mysql',
    jdbcHost: databaseConfigs.mysql.jdbcHost,
    jdbcPort: databaseConfigs.mysql.jdbcPort,
    jdbcUser: databaseConfigs.mysql.jdbcUser,
    jdbcPassword: databaseConfigs.mysql.jdbcPassword,
    jdbcDatabase: 'demo',
  },
  type: '',
  tables: [],
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
  },
  setType(state, type) {
    state.type = type
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
