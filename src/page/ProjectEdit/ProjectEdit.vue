<template>
  <div id="project-edit">
    <el-tabs>
      <el-tab-pane label="基础配置">
        <project-config :config="config"/>
      </el-tab-pane>
      <el-tab-pane label="表结构配置">
        <el-row :gutter="20">
          <el-col :span="6">
            <project-table :table="table" @on-save="onSaveTable" :is-dialog-show="isTableDialogShow"/>
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
          <el-col :span="6">
            <el-card class="create-menu-card" @click.native="showCreateMenuDialog">
              <i class="el-icon-plus"/>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="角色配置">

      </el-tab-pane>
    </el-tabs>
    <table-dialog :table="table" :is-dialog-show="isTableDialogShow" @on-save="onSaveTable" @on-close="onCloseTable"/>
    <menu-dialog :menu="menu" :is-dialog-show="isMenuDialogShow" @on-save="onSaveMenu" @on-close="onCloseMenu"/>
  </div>
</template>

<script>
  import ProjectConfig from "../ProjectConfig/ProjectConfig";
  import ProjectTable from "../ProjectTable/ProjectTable";
  import TableDialog from "../../components/TableDialog/TableDialog";
  import MenuDialog from "../../components/MenuDialog/MenuDialog";

  export default {
    name: "ProjectEdit",
    components: {MenuDialog, TableDialog, ProjectTable, ProjectConfig},
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
          jdbcPassword: '',
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
        isTableDialogShow: false,
        isMenuDialogShow: false,
        isRoleDialogShow: false
      }
    },
    methods: {
      onSaveTable() {
        let newTable = {}
        Object.assign(newTable, this.table)
        this.tables.push(newTable)
        this.table = {
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
        }
        this.isTableDialogShow = false
      },
      showCreateTableDialog() {
        this.isTableDialogShow = true
      },
      onCloseTable(data) {
        this.isTableDialogShow = data
      },
      onSaveMenu() {
        let newMenu = {}
        Object.assign(newMenu, this.menu)
        this.menus.push(newMenu)
        this.menu = {
          name: '',
          icon: '',
          href: ''
        }
        this.isMenuDialogShow = false
      },
      showCreateMenuDialog() {
        this.isMenuDialogShow = true
      },
      onCloseMenu(data) {
        this.isMenuDialogShow = data
      },
    }
  }
</script>

<style scoped lang="stylus">
  #project-edit
    .create-table-card, .create-menu-card
      cursor pointer
</style>
