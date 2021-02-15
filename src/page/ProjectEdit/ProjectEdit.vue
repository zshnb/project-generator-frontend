<template>
  <div id="project-edit">
    <el-tabs>
      <el-tab-pane class="content" label="基础配置">
        <project-config :config="config" @generate="onGenerate"/>
      </el-tab-pane>
      <el-tab-pane label="表结构配置" class="content">
        <el-row :gutter="20">
          <el-col :span="3" v-for="(table, index) in tables" :key="table.id">
            <project-table :table.sync="table" @delete-table="onDeleteTable(index)"/>
          </el-col>
          <el-col :span="3">
            <el-card class="create-table-card" @click.native="showCreateTableDialog">
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
            <el-card class="create-menu-card" @click.native="showCreateMenuDialog">
              <i class="el-icon-plus"/>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="角色配置" class="content">
        <el-row :gutter="20">
          <el-col :span="3" v-for="(role, index) in roles" :key="role.id">
            <project-role :role="role" @delete-role="onDeleteRole(index)"/>
          </el-col>
          <el-col :span="3">
            <el-card class="create-role-card" @click.native="showCreateRoleDialog">
              <i class="el-icon-plus"/>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <table-dialog :table="table"
                  :roles="roles"
                  v-if="isTableDialogShow"
                  :is-dialog-show.sync="isTableDialogShow"
                  @on-save="onSaveTable"/>
    <menu-dialog :menu="menu"
                 :tables="tables"
                 v-if="isMenuDialogShow"
                 :is-dialog-show.sync="isMenuDialogShow"
                 @on-save="onSaveMenu"/>
    <role-dialog :role="role"
                 :menus="menus"
                 v-if="isRoleDialogShow"
                 :is-dialog-show.sync="isRoleDialogShow"
                 @on-save="onSaveRole"/>
  </div>
</template>

<script>
  import ProjectConfig from "../ProjectConfig/ProjectConfig";
  import ProjectTable from "../ProjectTable/ProjectTable";
  import TableDialog from "../../components/TableDialog/TableDialog";
  import MenuDialog from "../../components/MenuDialog/MenuDialog";
  import RoleDialog from "../../components/RoleDialog/RoleDialog";
  import ProjectMenu from "../ProjectMenu/ProjectMenu";
  import ProjectRole from "../ProjectRole/ProjectRole";
  import axios from '../../util/Axios'

  export default {
    name: "ProjectEdit",
    components: {ProjectRole, ProjectMenu, RoleDialog, MenuDialog, TableDialog, ProjectTable, ProjectConfig},
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
              formItemType: 'com.zshnb.projectgenerator.generator.entity.SelectFormItem'
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
        menus: [],
        menu: {
          name: '',
          icon: '',
          href: '',
          tableName: ''
        },
        roles: [],
        role: {
          name: '',
          description: '',
          menus: []
        },
        isTableDialogShow: false,
        isMenuDialogShow: false,
        isRoleDialogShow: false
      }
    },
    watch: {
      table: {
        handler(newValue, oldValue) {
          let index = newValue.columns.length - 1
          switch (oldValue.columns[index].type) {
            case 'int': {
              newValue.columns[index].length = 11
              break
            }
            case 'varchar': {
              newValue.columns[index].length = 255
              break
            }
            case 'tinyint': {
              newValue.columns[index].length = 1
              break
            }
            case 'date':
            case 'text':
            case 'datetime': {
              newValue.columns[index].length = 0
              break
            }
            case 'double': {
              newValue.columns[index].length = 11
              break
            }
          }
        },
        deep: true
      },
      config: {
        handler(newValue, oldValue) {
          newValue.rootPackageName = `${newValue.groupId}.${newValue.artifactId}`
          newValue.jdbcDatabase = newValue.artifactId
        },
        deep: true
      }
    },
    methods: {
      onSaveTable(event) {
        this.tables.push(event)
        Object.assign(this.table, {
          name: '',
          columns: [{
            name: '',
            type: '',
            length: 0,
            comment: '',
            primary: false,
            searchable: false,
            enableFormItem: true,
            formItemType: ''
          }],
          permissions: [{
            role: '',
            operations: []
          }],
          enablePage: true,
          form: {
            formItems: []
          },
        })
      },
      showCreateTableDialog() {
        this.$router.push({
          name: 'TableEdit',
          params: {
            table: this.table
          }
        })
      },
      onDeleteTable(index) {
        this.tables.splice(index, 1)
      },
      onSaveMenu(event) {
        this.menus.push(event)
        Object.assign(this.menu, {
          name: '',
          icon: '',
          href: '',
          tableName: ''
        })
      },
      showCreateMenuDialog() {
        this.isMenuDialogShow = true
      },
      onDeleteMenu(index) {
        this.menus.splice(index, 1)
      },
      onSaveRole(event) {
        this.roles.push(event)
        Object.assign(this.role, {
          name: '',
          description: '',
          menus: []
        })
      },
      showCreateRoleDialog() {
        this.isRoleDialogShow = true
      },
      onDeleteRole(index) {
        this.roles.splice(index, 1)
      },
      onGenerate() {
        const project = {
          config: this.config,
          tables: this.tables,
          pages: this.tables.map(t => {
            return {form: t.form}
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
