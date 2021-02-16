<template>
  <div id="project-edit">
    <el-tabs>
      <el-tab-pane class="content" label="基础配置">
        <project-config :config="config" @generate="onGenerate"/>
      </el-tab-pane>
      <el-tab-pane label="表结构配置" class="content">
        <el-row :gutter="20">
          <el-col :span="3" v-for="(table, index) in tables" :key="table.id">
            <project-table :table.sync="table" :index="index"/>
          </el-col>
          <el-col :span="3">
            <el-card class="create-table-card" @click.native="onCreateTable">
              <i class="el-icon-plus"/>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="菜单配置" class="content">
        <el-row :gutter="20">
          <el-col :span="3" v-for="(menu, index) in menus" :key="menu.id">
            <project-menu :menu="menu" @delete-menu="onDeleteMenu(index)"/>
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
          jdbcDatabase: '',
          type: 1
        },
        table: {
          name: '',
          columns: [{
            name: '',
            type: '',
            length: 0,
            comment: '',
            primary: false,
            searchable: false,
            enableFormItem: true,
            formItemType: '',
            require: false,
            options: []
          }],
          permissions: [{
            role: '',
            operations: []
          }],
          enablePage: true,
          form: {
            formItems: []
          },
        },
        menu: {
          name: '',
          icon: '',
          href: '',
          tableName: ''
        },
        role: {
          name: '',
          description: '',
          menus: []
        },
        isMenuDialogShow: false,
        isRoleDialogShow: false
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
      onDeleteMenu(index) {
        this.menus.splice(index, 1)
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
        const project = {
          config: this.config,
          tables: this.tables,
          pages: this.tables.map(t => {
            return { form: t.form }
          }),
          roles: this.roles
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
