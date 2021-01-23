<template>
  <div id="project-edit">
    <el-tabs>
      <el-tab-pane label="基础配置">
        <project-config :config="config"/>
      </el-tab-pane>
      <el-tab-pane label="表结构配置">
        <el-row :gutter="20">
          <el-col :span="6">
            <project-table :table="table" @on-save="onSave" :is-dialog-show="isDialogShow"/>
          </el-col>
          <el-col :span="6">
            <el-card>
              <i class="el-icon-plus"/>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="菜单配置">

      </el-tab-pane>
      <el-tab-pane label="角色配置">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ProjectConfig from "../ProjectConfig/ProjectConfig";
  import ProjectTable from "../ProjectTable/ProjectTable";
  import TableDialog from "../../components/TableDialog/TableDialog";

  export default {
    name: "ProjectEdit",
    components: {TableDialog, ProjectTable, ProjectConfig},
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
        isDialogShow: false
      }
    },
    methods: {
      onSave() {
        console.log(this.table)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
