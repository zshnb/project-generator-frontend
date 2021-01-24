<template>
  <div id="project-edit">
    <el-tabs>
      <el-tab-pane label="基础配置">
        <project-config :config="config"/>
      </el-tab-pane>
      <el-tab-pane label="表结构配置">
        <el-row :gutter="20">
          <el-col :span="6" v-for="table in tables" :key="table.id">
            <project-table :table="table"/>
          </el-col>
          <el-col :span="6">
            <el-card class="create-table-card" @click.native="showCreateTableDialog">
              <i class="el-icon-plus"/>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="菜单配置">
        <el-row :gutter="20">
          <el-col :span="6" v-for="menu in menus" :key="menu.id">

          </el-col>
          <el-col :span="6">
            <el-card class="create-menu-card" @click.native="showCreateMenuDialog">
              <i class="el-icon-plus"/>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="角色配置">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card class="create-role-card" @click.native="showCreateRoleDialog">
              <i class="el-icon-plus"/>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <table-dialog :table="table"
                  v-if="isTableDialogShow"
                  :is-dialog-show.sync="isTableDialogShow"
                  @on-save="onSaveTable"/>
    <menu-dialog :menu="menu"
                 v-if="isMenuDialogShow"
                 :is-dialog-show="isMenuDialogShow"
                 @on-save="onSaveMenu"/>
    <role-dialog :role="role"
                 :menus="menus"
                 :is-dialog-show="isRoleDialogShow"
                 @on-save="onSaveRole"
                 @on-close="onCloseRole"/>
  </div>
</template>

<script>
  import ProjectConfig from "../ProjectConfig/ProjectConfig";
  import ProjectTable from "../ProjectTable/ProjectTable";
  import TableDialog from "../../components/TableDialog/TableDialog";
  import MenuDialog from "../../components/MenuDialog/MenuDialog";
  import RoleDialog from "../../components/RoleDialog/RoleDialog";

  export default {
    name: "ProjectEdit",
    components: {RoleDialog, MenuDialog, TableDialog, ProjectTable, ProjectConfig},
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
        tables: [],
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
        },
        menus: [],
        menu: {
          name: '',
          icon: '',
          href: ''
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
        this.isTableDialogShow = true
      },
      onSaveMenu(event) {
        this.menus.push(event)
        Object.assign(this.menu, {
          name: '',
          icon: '',
          href: ''
        })
      },
      showCreateMenuDialog() {
        this.isMenuDialogShow = true
      },
      onSaveRole() {
        this.role.menus.forEach(it => it.role = this.role.name)
        let newRole = {}
        Object.assign(newRole, this.role)
        this.roles.push(newRole)
        this.role = {
          name: '',
          description: '',
          menus: []
        }
        this.isRoleDialogShow = false
      },
      showCreateRoleDialog() {
        this.isRoleDialogShow = true
      },
      onCloseRole(data) {
        this.isRoleDialogShow = data
      },
    }
  }
</script>

<style scoped lang="stylus">
  #project-edit
    .create-table-card, .create-menu-card, .create-role-card
      cursor pointer
</style>
