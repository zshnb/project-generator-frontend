<template>
  <div id="project-role">
    <el-card>
      <div slot="header">
        <span>{{role.description}}</span>
        <el-button size="small" type="primary">编辑</el-button>
        <el-button size="small" type="danger">删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "ProjectRole",
    props: {
      role: {
        type: Object
      },
      isDialogShow: {
        type: Boolean
      }
    },
  }
</script>

<style scoped>

</style>
