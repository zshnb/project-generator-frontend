<template>
  <div id="project-role">
    <el-card>
      <div slot="header">
        <span>{{role.description}}</span>
        <el-button size="small" type="primary">编辑</el-button>
        <el-button size="small" type="danger" @click="onDelete">删除</el-button>
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
    methods: {
      onDelete() {
        this.$emit('delete-role')
      }
    }
  }
</script>

<style scoped>

</style>
