<template>
  <div id="project-edit">
    <el-tabs>
      <el-tab-pane label="基础配置">
        <project-config :config="config"/>
      </el-tab-pane>
      <el-tab-pane label="表结构配置">
        <project-table :tables="tables"/>
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

  export default {
    name: "ProjectEdit",
    components: {ProjectTable, ProjectConfig},
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
        tables: []
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
