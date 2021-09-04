<template>
  <div id="swing-project-detail">
    <el-tabs :active-name="activeName" @tab-click="onChangeTabPane">
      <el-tab-pane class="content" label="基础配置" name="base-setting">
        <config :config="config"/>
        <el-button type="primary" @click="onGenerate">生成</el-button>
      </el-tab-pane>
      <el-tab-pane label="表结构配置" class="content" name="table-setting">
        <div style="margin-bottom: 10px">
          <el-button type="primary" @click="onCreateTable">添加表</el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(table, index) in tables" :key="table.id">
            <el-card>
              <div slot="header">
                <div class="card-header">
                  <p>{{table.name}}</p>
                  <div>
                    <el-button size="small" type="primary" @click="onEditTable(table)" icon="el-icon-edit"></el-button>
                    <el-button size="small" type="danger" @click="onDeleteTable(index)" icon="el-icon-delete"></el-button>
                  </div>
                </div>
              </div>
              <div class="table-body">
                <ul>
                  <li v-for="column in table.columns" :key="column.id">
                    <span>{{column.name}}</span>
                    <span>{{column.type}}</span>
                    <span>({{column.length}})</span>
                  </li>
                </ul>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="菜单配置" class="content" name="menu-setting">
        <div style="margin-bottom: 10px">
          <el-button type="primary" @click="onCreateMenu">添加菜单</el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="3" v-for="(menu, index) in menus" :key="menu.id">
            <el-card>
              <div slot="header">
                <span>{{menu.name}}</span>
                <el-button size="small" type="primary" @click="onEditMenu(menu)">编辑</el-button>
                <el-button size="small" type="danger" @click="onDeleteMenu(index)">删除</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="角色配置" class="content" name="role-setting">
        <div style="margin-bottom: 10px">
          <el-button type="primary" @click="onCreateRole">添加角色</el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="3" v-for="(role, index) in roles" :key="role.id">
            <el-card>
              <div slot="header">
                <span>{{role.description}}</span>
                <el-button size="small" type="primary" @click="onEditRole(role)">编辑</el-button>
                <el-button size="small" type="danger" @click="onDeleteRole(index)">删除</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { Loading } from "element-ui";
import axios from "../../../util/Axios";
import ProjectRole from "../../SBMP/ProjectRole/ProjectRole";
import ProjectMenu from "../../SBMP/ProjectMenu/ProjectMenu";
import Table from "../Table/Table";
import Config from "../Config/Config";
import { getColumn } from "../../../util/swing/TableUtils";
import { getDefaultOperations } from "../../../util/TableUtils";

export default {
  name: "ProjectDetail",
  components: { ProjectRole, ProjectMenu, Table, Config },
  data() {
    return {
      table: {
        name: '',
        comment: '',
        columns: [getColumn()],
        permissions: [{
          role: '',
          operations: getDefaultOperations()
        }],
        enablePage: true
      },
      menu: {
        name: '',
        href: '',
        overwrite: false,
        roleDescriptions: [],
        tableName: ''
      },
      role: {
        name: '',
        description: '',
        menus: []
      },
      activeName: 'project-setting'
    }
  },
  computed: {
    ...mapState('swing', ['menus', 'roles', 'tables', 'config'])
  },
  mounted() {
    this.activeName = this.$route.query.activeName || 'base-setting'
  },
  watch: {
    config: {
      handler(newValue, oldValue) {
        newValue.rootPackageName = `${newValue.groupId}.${newValue.artifactId}`
        newValue.jdbcDatabase = newValue.artifactId
      },
      deep: true
    }
  },
  methods: {
    onCreateTable() {
      this.$router.push({
        name: 'SwingTable',
        params: {
          table: this.table
        }
      })
    },
    onEditTable(table) {
      this.$router.push({
        name: 'SwingTable',
        params: {
          table
        }
      })
    },
    onDeleteTable(index) {
      this.deleteTable(index)
    },
    onCreateMenu() {
      this.$router.push({
        name: 'SwingMenu',
        params: {
          menu: this.menu
        }
      })
    },
    onEditMenu(menu) {
      this.$router.push({
        name: 'MenuEdit',
        params: {
          menu: menu
        }
      })
    },
    onDeleteMenu(index) {
      this.deleteMenu(index)
    },
    onCreateRole() {
      this.$router.push({
        name: 'SwingRole',
        params: {
          role: this.role
        }
      })
    },
    onEditRole(role) {
      this.$router.push({
        name: 'RoleEdit',
        params: {
          role: role
        }
      })
    },
    onDeleteRole(index) {
      this.deleteRole(index)
    },
    onChangeTabPane(tab) {
      this.$router.push({
        path: this.$route.path,
        query: {
          activeName: tab.name
        }
      })
    },
    onGenerate() {
      let roles = this.roles.map(it => {
        let role = JSON.parse(JSON.stringify(it))
        delete role.id
        role.menus.forEach(m => {
          m.role = role.name
          delete m.id
        })
        return role
      })
      let tables = this.tables.map(it => {
        let table = JSON.parse(JSON.stringify(it))
        table.columns.forEach(c => {
          if (c.associate && c.associate.targetTableName === '') {
            delete c.associate
          }
          delete c.options
          delete c.mappings
          delete c.id
          delete c.label
          delete c.title
          delete c.require
          delete c.formItemType
          delete c.enableAssociate
        })
        delete table.id
        delete table.form
        delete table.table
        return table
      })
      let project = {
        config: this.config,
        tables: tables,
        frames: this.tables.filter(t => t.enablePage).map(t => {
          return {
            items: t.items
          }
        }),
        roles: roles
      }
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: '项目生成中...'
      });
      axios.post('/project/generate', JSON.stringify({ swingProject: project }), {
        responseType: 'blob'
      }).then(data => {
        if (!data) {
          loadingInstance.close()
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.setAttribute('download', `${this.config.artifactId}.zip`)
        document.body.appendChild(a)
        a.click() //执行下载
        window.URL.revokeObjectURL(a.href)
        document.body.removeChild(a)
        loadingInstance.close()
      }).catch(res => {
        loadingInstance.close()
      })
    },
    ...mapMutations('swing', ['deleteTable', 'deleteMenu', 'deleteRole']),
  }
}
</script>

<style scoped lang="stylus">
#swing-project-detail
  .card-header
    display flex
    justify-content space-between
    align-items center
</style>
>
