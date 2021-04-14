<template>
  <div id="project-edit">
    <el-tabs>
      <el-tab-pane class="content" label="基础配置">
        <project-config :config="config" @generate="onGenerate"/>
      </el-tab-pane>
      <el-tab-pane label="表结构配置" class="content">
        <el-row :gutter="20">
          <el-col :span="4" v-for="(table, index) in tables" :key="table.id">
            <project-table :table.sync="table" :index="index"/>
          </el-col>
          <el-col :span="4">
            <el-card class="create-table-card" @click.native="onCreateTable">
              <i class="el-icon-plus"/>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="菜单配置" class="content">
        <el-row :gutter="20">
          <el-col :span="3" v-for="(menu, index) in menus" :key="menu.id">
            <project-menu :menu="menu" :index="index"/>
          </el-col>
          <el-col :span="3">
            <el-card class="create-menu-card" @click.native="onCreateMenu">
              <i class="el-icon-plus"/>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="角色配置" class="content">
        <el-row :gutter="20">
          <el-col :span="3" v-for="(role, index) in roles" :key="role.id">
            <project-role :role="role" :index="index"/>
          </el-col>
          <el-col :span="3">
            <el-card class="create-role-card" @click.native="onCreateRole">
              <i class="el-icon-plus"/>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ProjectConfig from "../ProjectConfig/ProjectConfig";
  import ProjectTable from "../ProjectTable/ProjectTable";
  import ProjectMenu from "../ProjectMenu/ProjectMenu";
  import ProjectRole from "../ProjectRole/ProjectRole";
  import axios from '../../util/Axios'
  import { mapState } from 'vuex'

  export default {
    name: "ProjectEdit",
    components: {ProjectRole, ProjectMenu, ProjectTable, ProjectConfig},
    data() {
      return {
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
          jdbcHost: 'localhost',
          jdbcPort: 3306,
          jdbcUser: 'root',
          jdbcPassword: 'root',
          jdbcDatabase: 'demo',
          type: 1
        },
        table: {
          name: '',
          columns: [{
            name: '',
            type: '',
            length: 0,
            label: '',
            title: '',
            primary: false,
            searchable: false,
            enableFormItem: true,
            enableTableField: true,
            formItemType: '',
            require: false,
            options: [],
            mappings: [],
            enableAssociate: false,
            associate: {
              targetTableName: '',
              targetColumnName: '',
              formItemColumnName: '',
              associateResultColumns: []
            }
          }],
          permissions: [{
            role: '',
            operations: [],
            checkAll: false
          }],
          enablePage: true
        },
        menu: {
          name: '',
          icon: '',
          href: '',
          bind: true,
          overwrite: false,
          roleDescriptions: [],
          tableName: ''
        },
        role: {
          name: '',
          description: '',
          menus: []
        }
      }
    },
    computed: {
      ...mapState(['menus', 'roles', 'tables'])
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
          name: 'TableEdit',
          params: {
            table: this.table,
            roles: this.roles
          }
        })
      },
      onCreateMenu() {
        this.$router.push({
          name: 'MenuEdit',
          params: {
            menu: this.menu
          }
        })
      },
      onCreateRole() {
        this.$router.push({
          name: 'RoleEdit',
          params: {
            role: this.role
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
          pages: this.tables.filter(t => t.enablePage).map(t => {
            let form = JSON.parse(JSON.stringify(t.form))
            form.items.forEach(it => {
              if (it.options.length === 0) {
                delete it.options
              }
            })
            let tableComponent = JSON.parse(JSON.stringify(t.table))
            tableComponent.fields.forEach(it => {
              if (it.mappings.length === 0) {
                delete it.mappings
              }
            })
            return {
              form: form,
              table: tableComponent
            }
          }),
          roles: roles,
          type: this.config.type
        }
        axios.post('/project/generate', JSON.stringify(project), {
          responseType: 'blob'
        }).then(data => {
          if (!data) {
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
        })
      }
    }
  }
</script>

<style lang="stylus">
  #project-edit
    .el-tabs__nav
      margin-left 100px

    .content
      margin-left 100px

    .create-table-card, .create-menu-card, .create-role-card
      cursor pointer
</style>
