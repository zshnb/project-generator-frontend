<template>
  <div id="project-manage">
    <el-header>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="onShowAddProjectDialog">添加项目</el-button>
    </el-header>
    <el-main>
      <el-card class="project-card">
        <div slot="header">
          <p>项目1</p>
        </div>
        <div class="content">
          C语言项目
        </div>
      </el-card>
    </el-main>

    <el-dialog :visible.sync="showAddProjectDialog" class="add-project-dialog">
      <el-card class="project-type-card"
               v-for="projectType in projectTypes"
               :key="projectType.type"
               @click="onConfirmProjectType(projectType)"
      >
        <p>{{ projectType.name }}</p>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ProjectManage",
  data() {
    return {
      projectTypes: [
        {
          name: 'C语言',
          type: 'C',
          routerName: 'CProjectEdit'
        },
        {
          name: 'Spring Boot',
          type: 'SSMP'
        }
      ],
      showAddProjectDialog: false
    }
  },
  methods: {
    onShowAddProjectDialog() {
      this.showAddProjectDialog = true
    },
    onConfirmProjectType(projectType) {
      this.$router.push({
        name: projectType.routerName
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  #project-manage
    .project-card
      width: 300px
    .add-project-dialog
      .project-type-card
        width 45%
        display inline-block
        margin-left 20px
</style>
