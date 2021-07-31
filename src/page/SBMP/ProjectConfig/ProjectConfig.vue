<template>
  <div id="project-config">
    <el-form label-position="left" label-width="180px" :model="config">
      <el-form-item label="artifactId">
        <el-input placeholder="artifactId" v-model="config.artifactId"></el-input>
      </el-form-item>
      <el-form-item label="groupId">
        <el-input placeholder="groupId" v-model="config.groupId"></el-input>
      </el-form-item>
      <el-form-item label="version">
        <el-input placeholder="version" v-model="config.version"></el-input>
      </el-form-item>
      <el-form-item label="java根包名">
        <el-input placeholder="rootPackageName" v-model="config.rootPackageName"></el-input>
      </el-form-item>
      <el-form-item label="实体类包名">
        <el-input placeholder="entityPackageName" v-model="config.entityPackageName"></el-input>
      </el-form-item>
      <el-form-item label="service接口包名">
        <el-input placeholder="servicePackageName" v-model="config.servicePackageName"></el-input>
      </el-form-item>
      <el-form-item label="service实现包名">
        <el-input placeholder="serviceImplPackageName"
                  v-model="config.serviceImplPackageName"></el-input>
      </el-form-item>
      <el-form-item label="mapper包名">
        <el-input placeholder="mapperPackageName" v-model="config.mapperPackageName"></el-input>
      </el-form-item>
      <el-form-item label="controller包名">
        <el-input placeholder="controllerPackageName"
                  v-model="config.controllerPackageName"></el-input>
      </el-form-item>
      <el-form-item label="数据库">
        <el-select v-model="config.database" @change="onChangeDatabase">
          <el-option v-for="item in databases"
                     :key="item"
                     :label="item"
                     :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="jdbc地址">
        <el-input placeholder="jdbcHost" v-model="config.jdbcHost"></el-input>
      </el-form-item>
      <el-form-item label="jdbc端口">
        <el-input placeholder="jdbcPort" v-model="config.jdbcPort"></el-input>
      </el-form-item>
      <el-form-item label="jdbc用户">
        <el-input placeholder="jdbcUser" v-model="config.jdbcUser"></el-input>
      </el-form-item>
      <el-form-item label="jdbc密码">
        <el-input placeholder="jdbcPassword" v-model="config.jdbcPassword"></el-input>
      </el-form-item>
      <el-form-item label="数据库名">
        <el-input placeholder="jdbcDatabase" v-model="config.jdbcDatabase"></el-input>
      </el-form-item>
      <el-form-item label="UI库">
        <el-select v-model="config.type">
          <el-option v-for="item in projectTypes"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onGenerate">生成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {databaseConfigs} from '../../../util/Constant'
  export default {
    name: "ProjectConfig",
    props: {
      config: {
        type: Object
      }
    },
    data() {
      return {
        projectTypes: [{
          name: 'layui',
          value: 1
        }],
        databases: ['mysql', 'sqlserver']
      }
    },
    methods: {
      onGenerate() {
        this.$emit('generate')
      },
      onChangeDatabase(database) {
        const databaseConfig = databaseConfigs[database]
        Object.assign(this.config, databaseConfig)
      }
    }
  }
</script>

<style lang="stylus">
  #project-config
    .el-form
      .el-form-item
        .el-form-item__content
          width: 300px
          .el-input
            width: 300px
</style>
